#!/usr/bin/env node
// Daily/weekly freshness + link-health check for free-gpu-cloud-credits.
// Usage: node scripts/check-freshness.js <daily|weekly>
//
// daily:  lightweight status ping of every docs_url. Only writes to
//         CHANGELOG.md when something actually broke — no cosmetic
//         "checked today, nothing changed" entries.
// weekly: same link check, PLUS recomputes badge-freshness.json from
//         providers.json, PLUS opens/updates a tracking issue on GitHub
//         if any docs_url is broken.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROVIDERS_PATH = path.join(ROOT, 'providers.json');
const BADGE_PATH = path.join(ROOT, 'badge-freshness.json');
const STATUS_PATH = path.join(ROOT, 'status.json');
const CHANGELOG_PATH = path.join(ROOT, 'CHANGELOG.md');

const mode = process.argv[2] === 'weekly' ? 'weekly' : 'daily';
const now = new Date();
const todayISO = now.toISOString().slice(0, 10);

// Many providers (Cloudflare-fronted sites especially) return 403 to
// requests with no/unusual User-Agent, even though the page is fine for
// real visitors. Use a realistic browser UA so we don't flag a page as
// "broken" when it's actually just bot-protection reacting to the script.
const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

// Status codes that commonly mean "bot-protection reacted to a scripted
// request" rather than "this page is actually gone" — Cloudflare and
// similar services frequently 403/429 non-browser requests even when the
// page works fine for humans (and even for GitHub Actions runners on some
// providers). We do NOT want these to trigger issues/CHANGELOG entries —
// that would be exactly the kind of false-positive noise that erodes
// trust in the freshness badge. Only a real 404/410/5xx/DNS-failure/
// timeout counts as "broken".
const INCONCLUSIVE_STATUSES = new Set([401, 403, 429]);

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    // Always use GET, never HEAD. Some sites (SPA/CDN-fronted docs — e.g.
    // Kaggle's kaggle.com/docs/* pages) route HEAD and GET differently: a
    // HEAD request to a perfectly valid client-side route can come back 404
    // from the edge/CDN layer, while the GET a real visitor's browser sends
    // renders the page fine (confirmed manually for kaggle.com/docs/
    // efficient-gpu-usage, which this checker previously flagged as broken
    // even though it loads correctly for humans). Checking with GET matches
    // what an actual visitor experiences and avoids that false-positive class.
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: FETCH_HEADERS });
    clearTimeout(timeout);
    const ok = res.status >= 200 && res.status < 400;
    const inconclusive = !ok && INCONCLUSIVE_STATUSES.has(res.status);
    return { ok, inconclusive, broken: !ok && !inconclusive, status: res.status };
  } catch (err) {
    clearTimeout(timeout);
    // Network-level failures (DNS, timeout, TLS) are treated as broken —
    // these are strong signals, unlike a bare 403/429.
    return { ok: false, inconclusive: false, broken: true, status: 0, error: String(err && err.message || err) };
  }
}

function daysSince(dateStr) {
  const then = new Date(dateStr + 'T00:00:00Z');
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

function prependChangelog(entry) {
  const header = '# Changelog\n\nAutomated log of real changes detected by the daily/weekly freshness checks. Entries only appear here when something actually changed — not on every run.\n\n';
  let existing = '';
  if (fs.existsSync(CHANGELOG_PATH)) {
    existing = fs.readFileSync(CHANGELOG_PATH, 'utf8');
    existing = existing.replace(header, '');
  }
  fs.writeFileSync(CHANGELOG_PATH, header + entry + '\n' + existing);
}

async function ghRequest(pathSuffix, options = {}) {
  const repo = process.env.GITHUB_REPOSITORY; // "owner/repo"
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) throw new Error('Missing GITHUB_REPOSITORY or GITHUB_TOKEN');
  const res = await fetch(`https://api.github.com/repos/${repo}${pathSuffix}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  return res;
}

async function upsertBrokenLinkIssue(broken) {
  const title = '🔗 Broken link report';
  const body = [
    `The following provider docs links returned an error during the automated check on ${todayISO}:`,
    '',
    ...broken.map(b => `- **${b.name}**: ${b.docs_url} (${b.error ? b.error : `HTTP ${b.status}`})`),
    '',
    'Please verify whether the provider moved their docs or changed their terms, then update the corresponding entry (including its `Last verified` date) or fix/remove the link.',
  ].join('\n');

  const searchRes = await ghRequest(`/issues?state=open&labels=maintenance&per_page=50`);
  if (searchRes.ok) {
    const issues = await searchRes.json();
    const existing = issues.find(i => i.title === title);
    if (existing) {
      await ghRequest(`/issues/${existing.number}/comments`, {
        method: 'POST',
        body: JSON.stringify({ body }),
      });
      console.log(`Updated existing issue #${existing.number} with new broken-link report.`);
      return;
    }
  }
  const createRes = await ghRequest(`/issues`, {
    method: 'POST',
    body: JSON.stringify({ title, body, labels: ['maintenance'] }),
  });
  if (createRes.ok) {
    const issue = await createRes.json();
    console.log(`Opened new issue #${issue.number}.`);
  } else {
    console.error('Failed to open issue:', await createRes.text());
  }
}

async function main() {
  const data = JSON.parse(fs.readFileSync(PROVIDERS_PATH, 'utf8'));
  const providers = data.providers;

  console.log(`Running ${mode} check on ${providers.length} providers...`);
  const results = [];
  for (const p of providers) {
    const r = await checkUrl(p.docs_url);
    results.push({ name: p.name, docs_url: p.docs_url, ...r });
    const label = r.ok ? 'OK   ' : r.inconclusive ? 'INCON' : 'FAIL ';
    console.log(`  ${label} ${p.name} -> ${p.docs_url} (${r.status}${r.error ? ' ' + r.error : ''})`);
  }
  const broken = results.filter(r => r.broken);
  const inconclusive = results.filter(r => r.inconclusive);

  // status.json is written on every run (daily or weekly) — this is a
  // real, honest signal ("we actually checked at this timestamp"), not a
  // cosmetic freshness trick.
  fs.writeFileSync(STATUS_PATH, JSON.stringify({
    last_checked: now.toISOString(),
    mode,
    providers_checked: providers.length,
    broken_count: broken.length,
    inconclusive_count: inconclusive.length,
  }, null, 2) + '\n');

  if (broken.length > 0) {
    prependChangelog(`## ${todayISO} (${mode} check)\n\n${broken.length} broken link(s) detected:\n${broken.map(b => `- ${b.name}: ${b.docs_url} (${b.error || `HTTP ${b.status}`})`).join('\n')}\n`);
  }

  if (mode === 'weekly') {
    const verifiedFresh = providers.filter(p => p.verified === true && p.last_verified && daysSince(p.last_verified) <= 90).length;
    const total = providers.length;
    const color = verifiedFresh === total ? 'brightgreen' : verifiedFresh / total >= 0.7 ? 'green' : 'yellow';
    fs.writeFileSync(BADGE_PATH, JSON.stringify({
      schemaVersion: 1,
      label: 'verified',
      message: `${verifiedFresh}/${total} <90d`,
      color,
    }, null, 2) + '\n');

    prependChangelog(`## ${todayISO} (weekly summary)\n\n${verifiedFresh}/${total} providers verified within the last 90 days. ${broken.length} broken link(s) found.\n`);

    if (broken.length > 0 && process.env.GITHUB_TOKEN) {
      await upsertBrokenLinkIssue(broken);
    }
  }

  console.log(`Done. ${broken.length} broken link(s).`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

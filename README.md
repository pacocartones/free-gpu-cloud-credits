# free-gpu-cloud-credits

![Link check](https://github.com/pacocartones/free-gpu-cloud-credits/actions/workflows/check-freshness.yml/badge.svg)
![Freshness](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/pacocartones/free-gpu-cloud-credits/main/badge-freshness.json)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A curated, independently-verified list of **free GPU cloud credits** and compute for AI/ML — training, fine-tuning, and inference — without paying until you actually need to scale.

**🔎 [Open the interactive explorer](https://pacocartones.github.io/free-gpu-cloud-credits/)** — filter by "no card required," "GPU included" (many "free credit" offers quietly exclude GPU), "no application required," or sort by any column. Prefer to consume it programmatically? Grab [`providers.json`](providers.json), the machine-readable source of truth this page and the README are both generated from.

**What makes this list different:** every entry is checked against the provider's own official documentation — never blogs, affiliate sites, or "best free GPU 2026" content farms, which routinely list offers that no longer exist, inflate credit amounts, or omit the fine print that GPUs are excluded. Every entry carries a `Last verified` date, and a [scheduled GitHub Action](.github/workflows/check-freshness.yml) checks the documentation links referenced below on a daily and weekly basis and opens an issue automatically if something breaks. The **Freshness** badge above is computed the same way, straight from `providers.json` — no one has to take our word for how current this is.

> ⚠️ **Disclaimer:** this is an independent, community-maintained list. It is not affiliated with, endorsed by, or sponsored by any of the providers below. Terms, limits, and pricing can and do change without notice — always confirm against the provider's own docs (linked in each row) before relying on a free tier for anything important.

## The honest headline finding

Most "free GPU credits" round-ups you'll find online mix genuinely free, always-on compute (Colab, Kaggle) with trial credits that **explicitly exclude GPUs** (Google Cloud's $300 trial, Azure's $200 trial — both confirmed in their own docs to block or zero-quota GPU instances) and with programs that aren't free at all, just "apply and maybe get approved" (RunPod, Lambda Labs, Vast.ai, Scaleway). This list separates all three honestly instead of padding the count with offers that won't actually get you a GPU. See [Notably NOT free](#notably-not-free--doesnt-qualify) for the full rundown of what looks free but isn't.

## Contents

- [Ongoing free tier (GPU/TPU)](#ongoing-free-tier-gputpu)
- [One-time trial credits](#one-time-trial-credits)
- [Notably NOT free / doesn't qualify](#notably-not-free--doesnt-qualify)
- [How we keep this updated](#how-we-keep-this-updated)
- [Contributing](#contributing)

---

## Ongoing free tier (GPU/TPU)

Providers with a recurring (daily/monthly) free compute quota that renews — no expiration, but usually rate-limited and sometimes with undisclosed availability limits.

| Provider | Free tier | Limits | Notes | Last verified | Docs |
|---|---|---|---|---|---|
| **Google Colab** | GPU/TPU notebooks, no fixed published quota | Sessions up to 12h depending on availability; Google explicitly states it does not publish GPU hour quotas | No application required; card requirement not confirmed in official docs | 2026-07-12 | [Docs](https://research.google.com/colaboratory/faq.html) |
| **Kaggle Notebooks** | GPU (1x P100 or 2x T4) or TPU v3-8 notebooks | 30 GPU-hours/week (resets weekly), 12h session (9h for TPU), 20GB storage | Idle timeout conflicts between two official Kaggle pages (60min vs 20min) — reported as-is | 2026-07-12 | [Docs](https://www.kaggle.com/docs/efficient-gpu-usage) |
| **Modal** | $30/month recurring compute credit (Starter plan) | $30/mo, 100 containers + 10 GPU concurrency, 1-day log retention | Official billing docs require a payment method on file; not explicitly excepted for the free Starter plan | 2026-07-12 | [Docs](https://modal.com/pricing) |
| **HuggingFace Spaces (ZeroGPU)** | Serverless GPU (RTX Pro 6000 Blackwell) for Gradio Spaces | 2min/day (anonymous) · 5min/day (free account) · 40min/day (PRO, $9/mo) | No card to use existing ZeroGPU Spaces; PRO required to create your own | 2026-07-12 | [Docs](https://huggingface.co/docs/hub/en/spaces-zerogpu) |
| **Paperspace Gradient Notebooks** (by DigitalOcean) | Free GPU (M4000) notebook instance | 6h auto-shutdown, 5GB storage, Notebooks only (not Core VMs) | Confirmed still active after the DigitalOcean acquisition — many "is Paperspace dead" posts are outdated | 2026-07-12 | [Docs](https://docs.digitalocean.com/products/paperspace/notebooks/details/features/) |

## One-time trial credits

Providers that hand you a fixed credit balance on signup. Once it's spent (or the clock runs out), you're on pay-as-you-go.

| Provider | Credit | Notes |
|---|---|---|
| ⚠️ **Google Cloud Free Trial** | $300, 90 days | **Does not include GPU** — official docs confirm "you can't add GPUs to your VM instances" while in Free Trial status. Card required. |
| ⚠️ **Microsoft Azure Free Account** | $200, 30 days | **GPU VM quota is 0 by default and can't be increased** on a free/trial subscription per Microsoft Learn — the credit is effectively unusable for GPU without upgrading to pay-as-you-go first. Card required. |
| **fal.ai** | Welcome credit, exact amount not publicly documented | Serverless inference API (not raw GPU instances) for image/video/3D/audio models. Amount only visible in-dashboard after signup — third-party sites quoting $10/$20 are not verifiable against official docs. |
| **Novita AI** | $1 exact | Confirmed on two official pages. Larger promos ($10/$500) only appear on the marketing blog subdomain, not persistent docs. |
| ⚠️ **Baseten** | Welcome credit confirmed to exist, amount unconfirmed | The only figure found ($30) comes from an April 2023 changelog entry with no recent reconfirmation — flagged as stale rather than presented as current fact. |

## Notably NOT free / doesn't qualify

Worth stating plainly so this list doesn't waste your time. These are commonly recommended as "free GPU" options but don't hold up against their own official docs:

- **RunPod** — no free tier or welcome credit exists in official docs. The "$500 free" figures circulating online come from referral/affiliate sites, not runpod.io. The only real program is a selective, application-based Startup Program aimed at funded startups.
- **Lambda Labs** — no automatic free tier. The "Lambda Research Grant" offers up to $5,000 in credits, but only via application and manual approval for qualifying researchers.
- **Vast.ai** — no automatic free credit. The Startup Program requires reaching out to their team and getting approved; the referral program only grants credit when a referred user *purchases* credits, not on signup.
- **SaladCloud** — official pricing page states outright: "Salad Container Engine does not have a free trial." (A free trial exists only for their unrelated Transcription API.)
- **Scaleway** — no automatic welcome credit for GPU Instances. Startup/Founders programs exist but require formal application as a registered company.
- **Oracle Cloud "Always Free"** — is CPU only (AMD micro + ARM Ampere A1), no GPU shape is included. Also worth knowing: Oracle silently cut the Ampere A1 Always Free allocation in half (4 OCPU/24GB → 2 OCPU/12GB) around June 2026 with no public announcement — exactly the kind of quiet change this repo's freshness checks exist to catch.
- **AWS Free Tier** — CPU only (t3/t4g/c7i-flex/m7i-flex instance families). No GPU instance type (g4dn, g5, p3, p4...) is free-tier eligible.
- **Lightning AI** — the permanent free tier is 1 Studio with 4 CPUs — no GPU included. GPUs are billed separately at standard rates.

## How we keep this updated

Free-tier terms in this space change fast, and most curated lists go stale silently — a GPU quota gets zeroed out, a provider quietly halves a free allocation (see Oracle above), and nobody notices for months.

1. **Every entry carries a `Last verified` date.** No date, no entry.
2. **A daily GitHub Action** pings every documentation link referenced above (lightweight status check, not a full re-verification) and logs a real change to `CHANGELOG.md` only when something actually breaks — not a cosmetic "checked today, nothing changed" entry every day.
3. **A weekly GitHub Action** does the full check and recomputes the **Freshness** badge directly from `providers.json` — a real, auditable number, not a claim.
4. **A recurring manual re-verification rotation** (roughly 3-4 providers every 2 weeks) re-confirms figures directly against each provider's current docs, since automated checks can catch a broken link but not a silently-changed credit amount or a new card requirement.
5. **[Reporting an outdated entry](../../issues/new?template=inaccuracy.yml) takes under a minute** — a structured form asks for the provider, what changed, and a source link.

## Contributing

Found an outdated limit, a broken link, or a provider that should be on this list? The fastest way is the [structured issue form](../../issues/new?template=inaccuracy.yml) — or open a pull request directly. When submitting a new entry or updating an existing one, please:

- Link directly to the provider's own official pricing/docs (not a third-party summary)
- Explicitly confirm whether GPU (not just CPU/credit) is actually included — this is the single most common way "free GPU" lists mislead people
- Include the date you checked it, so we can keep the `Last verified` column honest
- Note any catch — application/approval requirements, card requirements, GPU quota exclusions — the fine print is often the most useful part of an entry
- If you're updating README.md, please mirror the same change in [`providers.json`](providers.json) so the interactive explorer and the freshness badge stay in sync

## License

[MIT](LICENSE) — this list is free to reuse, fork, and adapt.

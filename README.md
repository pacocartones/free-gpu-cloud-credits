# free-gpu-cloud-credits

![Link check](https://github.com/pacocartones/free-gpu-cloud-credits/actions/workflows/check-freshness.yml/badge.svg)
![Freshness](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/pacocartones/free-gpu-cloud-credits/main/badge-freshness.json)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A curated, independently-verified list of **free GPU cloud credits** and compute for AI/ML — training, fine-tuning, and inference — without paying until you actually need to scale.

**🔎 [Open the interactive explorer](https://pacocartones.github.io/free-gpu-cloud-credits/)** — filter by "no card required," "GPU included" (many "free credit" offers quietly exclude GPU), "no application required," or sort by any column. Prefer to consume it programmatically? Grab [`providers.json`](providers.json), the machine-readable source of truth this page and the README are both generated from.

**What makes this list different:** every entry is checked against the provider's own official documentation — never blogs, affiliate sites, or "best free GPU 2026" content farms, which routinely list offers that no longer exist, inflate credit amounts, or omit the fine print that GPUs are excluded. Every entry carries a `Last verified` date, and a [scheduled GitHub Action](.github/workflows/check-freshness.yml) checks the documentation links referenced below on a daily and weekly basis and opens an issue automatically if something breaks. The **Freshness** badge above is computed the same way, straight from `providers.json` — no one has to take our word for how current this is.

> ⚠️ **Disclaimer:** this is an independent, community-maintained list. It is not affiliated with, endorsed by, or sponsored by any of the providers below. Terms, limits, and pricing can and do change without notice — always confirm against the provider's own docs (linked in each row) before relying on a free tier for anything important.

> ⏰ **Time-sensitive:** [AWS SageMaker Studio Lab](#ongoing-free-tier-gputpu) — one of the easiest entries on this list to get into, since it needs no AWS account or card — closes to **new** signups on **July 30, 2026** per AWS's own docs. If you want in, don't wait.

## The honest headline finding

Most "free GPU credits" round-ups you'll find online mix genuinely free, always-on compute (Colab, Kaggle) with trial credits that **explicitly exclude GPUs** (Google Cloud's $300 trial, Azure's $200 trial — both confirmed in their own docs to block or zero-quota GPU instances) and with programs that aren't free at all, just "apply and maybe get approved" (RunPod, Lambda Labs, Vast.ai, Scaleway). This list separates all three honestly instead of padding the count with offers that won't actually get you a GPU. See [Notably NOT free](#notably-not-free--doesnt-qualify) for the full rundown of what looks free but isn't.

## Contents

- [Ongoing free tier (GPU/TPU)](#ongoing-free-tier-gputpu)
- [One-time trial credits](#one-time-trial-credits)
- [Notably NOT free / doesn't qualify](#notably-not-free--doesnt-qualify)
- [FAQ](#faq)
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
| **AWS SageMaker Studio Lab** ⚠️ | Free Jupyter notebook environment — no AWS account or credit card needed to sign up | GPU: max 4h/session, 4h per 24h period. CPU: max 4h/session, 8h per 24h period. 15GB persistent storage, 16GB RAM/project, unlimited sessions | ⚠️ **Closing to new customers July 30, 2026** — AWS docs state textually: "we have made the decision to close new customer access to Amazon Sagemaker Studio Lab, effective 7/30/26. Existing customers can continue to use the service as normal." Requires an access request subject to approval (up to 5 business days) — not instant self-service. Exact GPU model is not disclosed in official docs | 2026-07-12 | [Docs](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-lab-overview.html) |
| **Groq Cloud** | Free tier for API access to hosted open models (Llama, Qwen, GPT-OSS, Whisper, etc.) running on Groq's own LPU (Language Processing Unit) hardware | Per-model rate limits (subject to change), e.g. llama-3.1-8b-instant: 30 RPM · 14.4K req/day · 6K TPM · 500K TPD; llama-3.3-70b-versatile: 30 RPM · 1K/day · 12K TPM · 100K TPD | Inference API only — not a raw GPU instance. Card requirement for the Free tier itself is not explicitly confirmed in official docs (only the paid "Developer" tier's card requirement is documented) | 2026-07-12 | [Docs](https://console.groq.com/docs/rate-limits) |
| **Cerebras Inference** | Free tier with API access to supported open models (gpt-oss-120b, zai-glm-4.7, gemma-4-31b) running on Cerebras Wafer-Scale Engine hardware | 5 requests/min · 30K tokens/min · 1M tokens/hour · 1M tokens/day per model (identical across the three supported models) | Inference API only — not a raw GPU/WSE instance. Official docs inconsistently label this tier "Free" and "Free Trial," so permanence is unconfirmed; card requirement not stated either way | 2026-07-12 | [Docs](https://inference-docs.cerebras.ai/support/rate-limits) |
| **Lightning AI** (Lightning Studios) | 15 free monthly credits + 1 free active Studio (auto-restarts every 4h) | Credits convert to GPU hours by type per the official pricing table: T4 ≈ 75h/mo, L4 ≈ 31h/mo, L40S ≈ 5h/mo, RTX Pro 6000 ≈ 2h/mo (A100/H100/H200 also available, far fewer free hours) | Explicitly confirmed on the official pricing page: **"No credit card. No commitments."** The marketing headline "80 free GPU hours" doesn't match the per-GPU-type table — likely reflects only the best case (T4) | 2026-07-12 | [Docs](https://lightning.ai/pricing) |

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
- **AWS Free Tier** (the general one) — CPU only (t3/t4g/c7i-flex/m7i-flex instance families). No GPU instance type (g4dn, g5, p3, p4...) is free-tier eligible. Note this is separate from **AWS SageMaker Studio Lab**, a distinct product that does include free (if undisclosed-model) GPU access — see the ongoing table above.

## FAQ

**Is there actually free GPU compute for AI/ML, or is it all just trial credits?**
Yes. Colab, Kaggle Notebooks, HuggingFace Spaces (ZeroGPU), AWS SageMaker Studio Lab, and Lightning AI all include real, recurring GPU hardware in their free tier with no expiration date — not just CPU, and not a one-time credit that runs out. Groq Cloud and Cerebras Inference are also ongoing and free, but they're inference-API-only access to models already hosted on the provider's own hardware, not a GPU instance you get shell access to.

**Which free GPU providers don't require a credit card?**
Per each provider's own docs: Kaggle Notebooks, HuggingFace Spaces ZeroGPU (to use existing Spaces), AWS SageMaker Studio Lab, and Lightning AI all explicitly do not require a card for their free tier. Modal, Google Cloud Free Trial, and Microsoft Azure Free Account all require one.

**What's the catch with AWS SageMaker Studio Lab?**
Two things: it closes to *new* signups on July 30, 2026 (existing accounts keep access per AWS's own docs), and getting in requires an access request that can take up to 5 business days to approve — it's not instant self-service like Colab or Kaggle.

**Are Groq Cloud and Cerebras Inference the same thing as "a free GPU"?**
Not quite. Both give free API access to run inference on already-hosted open models (Llama, GPT-OSS, Whisper, etc.) on the provider's own specialized hardware (Groq's LPU, Cerebras's Wafer-Scale Engine) — there's no shell access to a GPU you can run arbitrary training code on. If you need to train or fine-tune with your own code, use one of the notebook-based entries (Colab, Kaggle, SageMaker Studio Lab) instead.

**Do any of the "free trial" credit programs actually work for GPU workloads?**
Not the ones in this list. Google Cloud's $300 trial and Microsoft Azure's $200 trial both explicitly exclude or zero-quota GPU access per their own documentation — the credit is effectively CPU-only unless you upgrade to a paid account. For real GPU access, use one of the [Ongoing free tier](#ongoing-free-tier-gputpu) entries instead.

**Is this list affiliate-driven or sponsored?**
No — see the disclaimer above; nothing here is a referral or affiliate link. Providers get *excluded*, not included, when a marketing claim doesn't hold up against official docs — for example, Together AI (whose own billing docs state it does not currently offer free trials) and Replicate (no quantified free-credit figure exists anywhere in its official docs, only an unquantified "limited free runs" mechanic) were both evaluated and left out for exactly this reason.

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

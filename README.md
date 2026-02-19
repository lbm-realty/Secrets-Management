# Infisical Secret Greeter

A small full stack Next.js app that demonstrates secure secret delivery using
Infisical. No secrets are hardcoded, no secrets live in `.env` files committed
to the repo. Everything flows from one source of truth: **Infisical**.

Live demo: [vercel-url]

---

## What this shows

Most apps manage secrets badly and end up in `.env` files that get committed
by accident.

This project shows a better pattern:

- Secrets live in **Infisical** and nowhere else
- Local dev gets them via the **Infisical CLI**
- GitHub Actions gets them via **Infisical's GitHub Sync** (auto-pushed to repo secrets)
- Vercel gets them via **Infisical's Vercel Sync**
- The app itself just reads `process.env` and has no idea where the values came from

---

## How it works

You (admin)
└── stores HI_NAME, BYE_NAME in Infisical dashboard

Local dev
└── infisical run -- npm run dev
└── CLI fetches secrets and injects as env vars
└── Next.js reads process.env.HI_NAME

GitHub Actions (CI)
└── Infisical GitHub Sync auto-pushes secrets to repo secrets
└── Workflow reads ${{ secrets.HI_NAME }}
└── Tests run, build runs, both pass

Vercel (production)
└── Infisical Vercel Sync pushes secrets to Vercel env vars
└── App reads process.env.HI_NAME at runtime

text

---

## What the app can do

A simple dashboard with two buttons: **Say Hi** and **Say Bye**.

When you click either one, the frontend calls `/api/greet?type=hi` or
`/api/greet?type=bye`. The API route reads the secret values from `process.env`
and returns a greeting message along with which secret key was resolved.

The point isn't the app. The point is that the app works **without a single
secret being hardcoded anywhere in the codebase**.

---

## Tech stack

- **Next.js 14** (App Router, full stack)
- **TypeScript**
- **Infisical** for secret management
- **GitHub Actions** for CI
- **Vercel** for deployment
- **Jest + ts-jest** for testing

---

## Running locally

### Prerequisites

- Node 18+
- An [Infisical account](https://app.infisical.com/signup) with a project set up
- [Infisical CLI](https://infisical.com/docs/cli/overview) installed

```bash
# Install CLI via npm
npm install -g @infisical/cli
Steps
bash
# 1. Clone the repo
git clone https://github.com/your-username/infisical-secret-greeter
cd infisical-secret-greeter

# 2. Install dependencies
npm install

# 3. Log in to Infisical
infisical login

# 4. Link to your Infisical project
infisical init

# 5. Run the app (secrets injected automatically)
infisical run -- npm run dev
The app expects two secrets in your Infisical project: HI_NAME and BYE_NAME.
Add them in your Infisical dashboard under the Development environment.

Running tests
bash
npm test
Tests cover three scenarios:

Happy path - both hi and bye return correct messages when secrets are present

Missing secrets - returns a 500 with a clear error when secrets are not injected

Bad input - returns a 400 for invalid or missing type param

The missing secrets test is intentional. It proves the app fails loudly and
clearly when secret injection breaks, rather than silently crashing or leaking
undefined values.
```

## CI pipeline
  - Every push to main triggers a GitHub Actions workflow that:
  - Installs dependencies
  - Runs the test suite (secrets available via Infisical's GitHub Sync)
  - Verifies secrets are present in the environment
  - Runs npm run build
  - Secrets are not manually added to GitHub. Infisical's GitHub Sync pushes them automatically whenever they change in the Infisical dashboard.

## Deployment
Deployed on Vercel. Secrets are synced from Infisical to Vercel using
Infisical's Vercel Sync integration, so the production app also has zero
hardcoded secrets.

## Current limitations
No auth. The live demo is read-only. You can see the UI and click the
buttons, but the greeting values are fixed to whatever secrets I have stored
in Infisical. You can't change them without access to my Infisical project.

Single environment. Right now only the Development environment is wired
up. A real app would have separate secrets for dev, staging, and prod.

## What I'd build next
Multi-environment support - separate HI_NAME and BYE_NAME values per
environment, with the CI pipeline selecting the right one based on the branch

Secret health panel - a /api/health endpoint and a UI panel that shows
which secrets are present or missing at runtime

Secret rotation demo - show how updating a secret in Infisical propagates
to the app without a redeploy, using Infisical's agent or webhook support

Audit log viewer - surface Infisical's audit log in the UI to show who
accessed which secret and when

## Why I built this
I tried contributing to Infisical's Open Source Repo as it seemed interesting, but I wasn't able to due to hadrware limits. to really to understand how Infisical works from the inside out, not just from the docs, I built this mini version. Building something that actually uses the CLI, the GitHub Sync, and the Vercel Sync end-to-end was the fastest way to do that.

The hardest part was understanding that the app itself doesn't need to know
about Infisical at all. It just reads process.env. Infisical's job is to make
sure those values are there, in every environment, without any developer having
to think about it.

That's a genuinely good product!

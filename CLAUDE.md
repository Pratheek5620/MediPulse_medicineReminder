# MediPulse

MediPulse is a medicine reminder app for patients in India, built for older users and their families. It is Phase 1 of DocAssist, a planned doctor–patient care platform that will be licensed to clinics and hospitals. This repo is a monorepo, so the DocAssist doctor web app can be added later and share code.

Read before making changes:
- `docs/tech-spec.md`: stack, architecture, reminder engine, data model, privacy. This is the source of truth.
- `docs/product-context.md`: who this is for and the product rules.
- `docs/backlog.md`: what to build next, in order.
- `design/README.md`: which Stitch screens to build from, and the design tokens.

## Current phase: 1a (phone only)

- Android only. iOS comes later.
- No login, no server, and no network calls for health data. All data stays in the local encrypted database.
- The developer works about 1 hour a day, so keep each task small, finish it, and leave a clear next step.

## Stack

- TypeScript (strict) everywhere. pnpm workspaces + Turborepo.
- `apps/mobile`: Expo (development builds, never Expo Go), Expo Router, NativeWind, Zustand, TanStack Query (Phase 1b), op-sqlite + SQLCipher + Drizzle ORM, Notifee for reminders, i18next.
- `packages/schedule`: pure TypeScript with no React Native imports. Holds 1-0-1 parsing, dose generation and missed-dose rules. Must have thorough Jest tests.
- `packages/shared`: types and zod schemas.
- `packages/ui-tokens`: the Tailwind preset from `design/tailwind-preset.js`.

## Rules

- Reminders are safety-critical. Every change to `packages/schedule` or the reminder service needs tests. Never silently drop a scheduled dose.
- Store schedule times as wall-clock times plus a timezone, never as UTC instants.
- The app is a reminder and tracking tool. It must never suggest doses, change a prescription or give medical advice.
- Every user-facing string goes through i18next, with keys in `en`, `hi` and `kn`. That includes notification text. Never hard-code UI text.
- Use Plus Jakarta Sans, with Noto Sans Devanagari and Noto Sans Kannada as fallbacks. Check layouts in Kannada at the largest font size.
- Touch targets are at least 48 dp, and every icon button has an `accessibilityLabel`.
- Use only colours, radii and fonts from `packages/ui-tokens`. No raw hex values in components.
- Don't put medicine names in notification text unless the user has turned that setting on.
- Every table row has a UUID `id`, `created_at`, `updated_at` and `deleted_at`, so Phase 1b sync can be added later.
- Database migrations only add things. Never drop or rename columns.

# Backlog: Phase 1a

Each task should fit in one to three 1-hour sessions. Work top to bottom, and tick tasks off as they're done.

## Setup (weeks 1–3)

- [x] Create the monorepo: pnpm workspaces, Turborepo, TypeScript strict, ESLint and Prettier, and the folders `apps/mobile`, `packages/schedule`, `packages/shared` and `packages/ui-tokens`
- [x] `packages/ui-tokens`: colours, fonts, radii and the Tailwind preset
- [x] `apps/mobile`: Expo app with Expo Router, NativeWind using the ui-tokens preset, and Plus Jakarta Sans plus the Noto Devanagari and Kannada fonts
- [x] i18next with `en`, `hi` and `kn` resource files, and a language picker
- [ ] Save the chosen language on the phone (after the local database lands)
- [x] GitHub Actions running lint, typecheck and tests on every push
- [ ] An EAS development build installed on a real Android phone

## Core (weeks 4–11)

- [x] `packages/schedule`: types for Medication, Schedule (slots, food relation, start and end dates, timezone) and DoseEvent
- [x] `packages/schedule`: parse and format 1-0-1 notation, with tests
- [ ] `packages/schedule`: generate dose times for a date range, with tests covering start and end dates, timezones and changes to a schedule
- [ ] Local database: op-sqlite with SQLCipher (key kept in secure store), Drizzle schema for medications, schedules, dose_events and stock, plus migrations
- [ ] Add medicine screen (see `design/stitch/add-medicine-v2.png` and `add-medication-fixed.png`)
- [ ] Today screen with doses grouped by morning, afternoon and night, plus Taken, Snooze and Skip (see `today-v2.png` and `home-default.png`)
- [ ] My medicines list with stock bars (see `my-medicines-v2.png` and `medications-list.png`)
- [ ] Empty states (see `medications-empty.png` and `history-empty.png`)

## Reminder engine (weeks 12–17)

- [ ] Notifee setup: a high-priority channel and the Taken, Snooze and Skip actions handled in the background
- [ ] Schedule a rolling 7-day window from `packages/schedule`, and top it up whenever the app opens and in a daily background task
- [ ] Missed-dose rule: mark a dose as missed if there's no action 30 minutes after its time
- [ ] Onboarding permissions: notifications, exact alarms, and battery optimisation with steps for each phone brand
- [ ] Reboot, time change and app update handling. Add a Kotlin Expo module if Notifee doesn't cover this.
- [ ] Reminder alert screen that opens from the notification (see `reminder-alert-v2.png`)

## Tracking (weeks 18–21)

- [ ] History screen with the 7-day adherence ring and monthly calendar (see `history-v2.png` and `history.png`)
- [ ] Stock count that goes down on Taken, with a refill alert below a threshold (see `home-low-stock.png`)
- [ ] Share a summary as an image or PDF through Android's share sheet
- [ ] Settings: language, reminder privacy (medicine names on or off), snooze length (see `settings-warm.png`)

## Hardening and release (weeks 22–26)

- [ ] Test on a Xiaomi or Redmi, a Vivo or Oppo, and a Samsung phone: locked, battery saver, after a reboot, and with the app swiped away
- [ ] Have the Hindi and Kannada translations checked by native speakers
- [ ] Play Console: privacy policy, data safety form, health app declaration
- [ ] Closed test with 12 or more testers for 14 days

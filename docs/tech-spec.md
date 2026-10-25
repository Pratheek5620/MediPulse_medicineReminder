# MediPulse Mobile App: Technical Spec

Copied from the living doc on 25 Oct 2026: https://claude.ai/artifact/8c3QRTxfJU9BBuMz5JDQPz. If the two differ, the living doc is newer.

## Summary

Build MediPulse as an offline-first React Native app (Expo, TypeScript) for Android first, in a monorepo the DocAssist doctor web app will share later. After the pilot, Supabase in the Mumbai region becomes the backend. Reminders run on the phone, so they still fire with no internet. Phase 1 is the pill reminder app from the Stitch designs, and the data model already leaves room for the doctor side of DocAssist.

**In scope for Phase 1:** medicines and schedules in 1-0-1 notation, reliable reminders with Taken, Snooze and Skip, history and adherence, stock and refill alerts, and sharing a summary from the phone. The first release runs entirely on the phone, with no login or server (see Plan for 1 hour a day).

**Not in Phase 1:** the doctor web app, AI diagnosis or prescribing, payments, video calls, and hospital system integration.

| Layer | Choice | Why |
| --- | --- | --- |
| Language | TypeScript everywhere | One language for the patient app, the doctor web app and the server code |
| Mobile app | React Native with Expo (development builds), Expo Router | One codebase for Android and iOS, with native modules when needed |
| Code layout | pnpm + Turborepo monorepo | Types, validation and the schedule logic are written once and shared |
| Styling | NativeWind (Tailwind) with a shared preset of Stitch tokens | Stitch exports Tailwind, and the doctor web app can use the same preset |
| State | TanStack Query for server data, Zustand for app state | Small and widely used |
| Local database | op-sqlite with SQLCipher, using Drizzle ORM | Fast, encrypted, works offline |
| Reminders | Notifee trigger notifications on exact alarms, plus a small Kotlin Expo module | Reliable alarms with Taken, Snooze and Skip buttons |
| Backend (Phase 1b) | Supabase in Mumbai (Postgres, Auth, Storage, Edge Functions) | Edge Functions run TypeScript, so they share the same code |
| Login (Phase 1b) | Phone number + OTP | What Indian users expect |
| Push and crashes | React Native Firebase: Messaging and Crashlytics | Family alerts and crash reports |
| WhatsApp and SMS (Phase 1b) | A WhatsApp Business API provider, plus a DLT-registered SMS provider | Reaches family members who don't have the app |
| Scanning (Phase 1b) | ML Kit text recognition on the phone, then an LLM to structure the text | Reads prescriptions and pill strips |
| Builds | EAS Build and EAS Submit to the Play Console internal track | No local Android build setup needed |

## Plan for 1 hour a day

At about 7 hours a week, the full Phase 1 would take well over a year. Instead, ship a phone-only version (Phase 1a) for the pilot in about 6 months. That's roughly 190 hours of work, including about 10 hours for three languages. Add the cloud features after the pilot (Phase 1b).

| Phase | What's in it |
| --- | --- |
| 1a: pilot, phone only | Medicines with 1-0-1 schedules, reminders with Taken, Snooze and Skip, the Today screen, History of taken and missed doses for the patient's own reference, stock and refill alerts, and a summary shared through Android's share sheet. English, Hindi and Kannada, with a language picker during onboarding. |
| 1b: after the pilot | Phone number login, Supabase backup and sync, missed-dose alerts to family (push and WhatsApp), prescription scanning, and iOS. Scanning works for English and Hindi prescriptions. ML Kit can't read Kannada script, so Kannada scanning would need a cloud OCR service. |

**Why phone-only first.** No login screens, no server costs, and no health data leaving the phone. That keeps DPDP compliance simple and lets the SMS (DLT) and WhatsApp approvals wait. The code is still a monorepo with `packages/schedule` and `packages/shared`, and every row has a UUID, so Phase 1b adds sync without a rewrite.

**Working in 1-hour sessions.**

- Keep a short task list and end each session by writing the next step down, so the next session starts in under 5 minutes.
- Test on real phones at weekends, and leave them running overnight to catch reminders that didn't fire.
- Use Claude Code to scaffold screens and tests, and spend your hour on the reminder engine and on reviewing the code.

### Build timeline (about 7 hours a week)

| Weeks | Phase |
| --- | --- |
| 1–3 | Setup: Expo, monorepo, Stitch theme |
| 4–11 | Core: medicines, schedules, Today |
| 12–17 | Reminder engine and permissions |
| 18–21 | History, stock, share summary |
| 22–24 | Testing on Xiaomi, Vivo, Samsung |
| 25–26 | Play closed test, 12 testers, 14 days |
| 27 onward | Pilot with your doctors' patients |

## Mobile app

Use React Native with Expo and TypeScript, inside a monorepo the full DocAssist platform can grow into. Treat the Stitch screens as the visual spec.

**Why React Native.** The doctor web app will almost certainly be React (Next.js), and Supabase Edge Functions run TypeScript. With React Native, the patient app, the doctor app and the server all share one language and one set of packages. The trade-off is that background work and alarms need more native code than in Flutter, so allow an extra 1 to 2 weeks for the reminder engine.

**Monorepo layout.**

```text
apps/
  mobile/        Expo app: MediPulse patient app
  doctor-web/    Next.js doctor app (Phase 2, empty for now)
packages/
  shared/        TypeScript types, zod schemas, API client, version constants
  schedule/      pure TS: 1-0-1 parsing, dose generation, missed-dose rules
  ui-tokens/     Tailwind preset with the Stitch colours, fonts, radii
supabase/
  migrations/    SQL migrations, additive only
  functions/     Edge Functions that import packages/schedule
```

`packages/schedule` is the most valuable shared piece. The same code decides when a dose is due on the phone, in the Edge Function that checks for missed doses, and later in the doctor's adherence view. Give it thorough unit tests.

**Staying compatible as DocAssist grows.**

- Every API request and response is defined once as a zod schema in `packages/shared`. The phone, the web app and Edge Functions all validate against it.
- Database migrations only add to the schema. A column is deprecated first and dropped one release later, so older app versions keep working.
- The app sends its version with every request. The server returns a minimum supported version, and the app shows an "Update required" screen when it's older.
- Build the patient app's screens on `packages/shared` types, not raw Supabase rows, so moving to your own backend later only changes the API client.

**Design to code.** Stitch exports Tailwind HTML, so build the screens with NativeWind. Put the Aura Med tokens (`primary` #006A66, `primary-container` #0EA5A0, `surface` #F7FAFB and the rest), Plus Jakarta Sans and the rounded corners into `packages/ui-tokens`. The doctor web app can use the same preset later, so both apps look like one product.

**Language and accessibility.** Ship in English, Hindi and Kannada from the first release, using i18next, which the web app can share. Plus Jakarta Sans has no Hindi or Kannada letters, so bundle Noto Sans Devanagari and Noto Sans Kannada as fallback fonts. Kannada script needs extra line height and often runs longer than English, so test every screen in Kannada at the largest font size. The phone's local notification text must be translated too, not just the screens. Have a native speaker, ideally someone with a medical background, check medical words such as "after food" and the dose instructions. Respect the phone's font size setting, keep touch targets at 48 dp or larger, and set an `accessibilityLabel` on every icon button.

**Key packages:** `expo`, `expo-router`, `nativewind`, `@tanstack/react-query`, `zustand`, `@op-engineering/op-sqlite` + `drizzle-orm`, `@notifee/react-native`, `@react-native-firebase/messaging` and `crashlytics`, `@supabase/supabase-js`, `@react-native-ml-kit/text-recognition`, `i18next`, `zod`, and `react-native-svg` for the adherence ring and charts.

## Reminder engine

Reminders that fire on time are the whole product, which makes this the riskiest part to build. Budget about a quarter of the build time for it, and test it early on phones popular in India.

**Scheduling**

- Schedule reminders on the phone as Notifee trigger notifications using Android's exact alarm manager. Use the alarm-clock type if your Notifee version supports it, because it fires most reliably in Doze mode. If Notifee falls short on a device, fall back to a small Kotlin Expo module that calls `AlarmManager.setAlarmClock` directly.
- Android caps an app at about 500 pending alarms. Schedule a rolling 7-day window and top it up daily with a background task (`expo-background-task`) and whenever the app opens.
- Reschedule everything after a reboot, a time or timezone change, and an app update. Check on your test phones whether Notifee restores triggers after a reboot. If it doesn't, add `BOOT_COMPLETED`, `TIME_SET`, `TIMEZONE_CHANGED` and `MY_PACKAGE_REPLACED` receivers to the Kotlin module.
- Store schedules as wall-clock times (for example 08:30 and 20:30) plus a timezone, not as UTC instants. Dose times come from `packages/schedule`, which the server uses too.

**Permissions to ask for during onboarding**, each with a plain explanation:

1. Notifications (`POST_NOTIFICATIONS`, Android 13 and later).
2. Alarms and reminders (`SCHEDULE_EXACT_ALARM`). On Android 14, most new installs don't get it by default. Check `canScheduleExactAlarms()`. If the user declines, fall back to inexact alarms and show a warning on the Today screen.
3. Battery: open the phone's battery settings so the user can exclude the app from optimisation. Xiaomi, Vivo, Oppo, Realme and OnePlus phones kill background apps aggressively, and these brands are very common in India. Show brand-specific steps (dontkillmyapp.com documents them) and test on each brand.

**The alert itself.** Use a high-priority notification with Taken, Snooze and Skip buttons. These actions write to the local database in the background without opening the app. Showing the full-screen Reminder alert over the lock screen needs `USE_FULL_SCREEN_INTENT`. Google Play limits that permission to calling and alarm apps, so plan for the alert to open when the user taps the notification. Check the current Play policy before relying on the full-screen version.

**Dose lifecycle**

1. Every scheduled time creates a dose event with status `pending`.
2. When the user taps Taken or Skip, the event is saved as `taken` or `skipped` with the time and an optional note (for example "felt nauseous").
3. Snooze sets a new alarm 10 minutes later. After 3 snoozes, the dose gets one final reminder.
4. If nothing happens within 30 minutes (configurable), a follow-up alarm on the phone marks the dose `missed`. The stock count goes down only when a dose is taken.
5. Missed doses appear in History for the patient's own reference. In Phase 1a nobody else is alerted and no doctor reviews them. In Phase 1b the server also learns the schedule, so it can alert family members, including when the phone is switched off.

## Backend and integrations (Phase 1b)

After the pilot (Phase 1b), the backend should be Supabase, with a little server code as Edge Functions. You don't need your own servers until the doctor platform. Supabase runs on Postgres, so moving to a self-run backend later won't need a data rewrite.

Architecture: the phone holds the app screens, a local encrypted database, the alarm service and an on-device scanner, and works fully offline. It syncs with Supabase in Mumbai, which provides Auth, Postgres with row-level security, Edge Functions, pg_cron and Storage. Edge Functions send alerts through outside services: Firebase push, WhatsApp Business, an SMS provider and an LLM that receives scanned text only. Push notifications come back to the phone.

- **Region:** create the project in Supabase's Mumbai region so patient data stays in India.
- **Auth:** phone number and OTP through Supabase Auth, using an SMS hook to an Indian SMS provider such as MSG91. Indian rules require commercial SMS to be registered on a DLT platform, including the sender ID and each message template. Start early, because approval takes time.
- **Database rules:** turn on row-level security for every table. A patient sees only their own rows. A family member sees only the patients who invited them, and a doctor sees only patients who shared with them.
- **Sync:** the phone writes locally first, then pushes changes to Supabase when it's online. The server keeps the latest version, judged by an `updated_at` timestamp and a device id. Dose events are only ever added, never edited, so they can't conflict.
- **Scheduled jobs:** a `pg_cron` job runs every 5 minutes to find doses with no response and refill dates that are close. It then calls an Edge Function that sends the alerts.
- **Push:** use Firebase Cloud Messaging for family alerts and messages. Leave medicine names out of the notification text unless the user turns them on.
- **WhatsApp:** use the WhatsApp Business Platform, either directly through Meta or through an Indian provider such as Gupshup. Message templates need Meta's approval. Use this channel for family members who don't install the app.
- **Scanning:** ML Kit reads the text on the phone, and this works for Hindi script too. An Edge Function then sends only that text, without the patient's name or phone number, to an LLM that returns a structured list of medicines. The user checks and confirms every field before anything is saved.
- **Reports:** an Edge Function builds the 30-day PDF and stores it in Supabase Storage behind a link that expires after 7 days.

## Data model

Nine tables cover Phase 1. The same tables exist on the phone (op-sqlite with Drizzle) and on the server (Postgres). Every row has an `id` (UUID), `created_at`, `updated_at` and `deleted_at`. Table names follow FHIR concepts (MedicationRequest, MedicationAdministration) so the doctor platform can use them later. In Phase 1a only the first five tables are needed.

| Table | Key columns | Notes |
| --- | --- | --- |
| `profiles` | user_id, name, phone, language, date_of_birth | One row per person. A caregiver also has a profile. |
| `medications` | profile_id, name, strength, form, colour, photo_path, prescribed_by | What the patient takes, as a FHIR-style medication request |
| `schedules` | medication_id, slots (morning, afternoon, night with times), food_relation, start_date, end_date, notation such as 1-0-1 | Source of truth for alarms. A dose change creates a new row. |
| `dose_events` | schedule_id, scheduled_at, status (pending, taken, skipped, missed, no_response), acted_at, snooze_count, note | Add-only log that feeds history and adherence |
| `stock` | medication_id, quantity, refill_threshold, last_refill_at | Taking a dose subtracts from the count |
| `care_links` | patient_id, member_id, role (family, doctor), permissions, status | Who can see what, with an invite and an accept step |
| `devices` | profile_id, fcm_token, platform, app_version, last_seen_at | Push targets. `last_seen_at` helps spot dead phones. |
| `consents` | profile_id, purpose, version, granted_at, withdrawn_at | Consent records required under DPDP |
| `audit_log` | actor_id, action, target_table, target_id, at | Add-only record of who viewed or changed health data |

## Security and privacy

Treat every dose and medicine as sensitive health data under India's DPDP Act from the first release. In Phase 1a the data never leaves the phone, which keeps this simple. The server-side rules below apply from Phase 1b.

- **Consent:** ask for consent at sign-up in plain English, Hindi and Kannada, separately for each purpose: reminders, sharing with family, and sharing with a doctor. Let users withdraw it in Settings, and record each version in `consents`.
- **Data in India:** keep the database, file storage and Edge Functions in the Mumbai region. Any LLM call must send only the scanned text, with no name or phone number, under a provider agreement that says the data isn't used for training.
- **Encryption:** use TLS for all traffic, Supabase's encryption at rest on the server, and SQLCipher for the phone database, with the key kept in the Android Keystore.
- **Lock screen privacy:** by default, reminders say "Time for your night medicine" without naming the medicine. Medicine names show only if the user turns that on. Offer a PIN or fingerprint lock for the app.
- **Access:** row-level security on every table, care links that need an invite and an accept step, and an audit log entry each time a family member or doctor views data.
- **User rights:** let users export their data and delete their account from inside the app. Deletion removes server data within 30 days, and the privacy policy says so.
- **Breaches:** keep a written incident plan. DPDP requires notifying the Data Protection Board and affected users, and CERT-In requires cyber incidents to be reported within 6 hours.
- **Positioning:** describe the app as a reminder and tracking tool. It must not suggest doses or diagnose anything, which keeps Phase 1 outside medical-device rules.

## Testing, release and costs

**Testing**

- Unit tests for the schedule logic: 1-0-1 and 1-1-1 patterns, start and end dates, snoozes, missed-dose timing and timezone changes. Bugs here are the most likely to hurt someone.
- Component tests (Jest and React Native Testing Library) and screenshot tests for the main screens, in English, Hindi and Kannada, at the largest text size.
- Alarm tests on real phones: at least one Xiaomi or Redmi, one Vivo or Oppo, and one Samsung. Test with the phone locked, in battery saver, after a reboot, and with the app swiped away.
- Two weeks of daily use by you and your family before any patient sees it.

**Release**

- Build with EAS Build and upload to the Play Console internal track with EAS Submit, triggered from GitHub Actions. Use EAS Update only for small JavaScript fixes, and ship anything that changes features as a full store release.
- New personal Play developer accounts must run a closed test with at least 12 testers for 14 days before going live. Recruit testers from your family and your doctor contacts' patients.
- Fill in the Play Console's health app and data safety declarations accurately. Leave iOS until Android is stable.

**Running costs (approximate, check current prices)**

| Item | Cost |
| --- | --- |
| Google Play developer account | US$25 one-time |
| Supabase (Phase 1b) | Free while building, then the Pro plan from US$25 a month |
| Firebase Cloud Messaging and Crashlytics | Free |
| SMS for OTP (Phase 1b) | A small charge per message from the SMS provider |
| WhatsApp alerts (Phase 1b) | Meta's per-message charge for each template category |
| LLM for scanning (Phase 1b) | A fraction of a rupee per scan |
| Test phones | Two or three used budget phones |
| Apple developer account (later) | US$99 a year |

## Decisions and open questions

- [x] Framework: React Native with TypeScript
- [x] Time available: about 1 hour a day
- [x] Platform for the pilot: Android only
- [x] App name: MediPulse. Run a trademark search on ipindia.gov.in before publishing, because similar names are common.
- [x] Missed doses: for the patient's own reference only. No doctor reviews them in the pilot.
- [x] Languages at launch: English, Hindi and Kannada
- [ ] Which of your doctor contacts will recruit the 12 closed-test users and the pilot patients?
- [ ] Who will translate and check the Hindi and Kannada text?

# MediPulse mobile app

Expo (React Native) app for Android. It needs a development build, not Expo Go, because it uses
native modules for reminders and the encrypted database.

```bash
pnpm install                 # from the repo root
pnpm --filter @medipulse/mobile android   # build and run on a connected phone or emulator
pnpm --filter @medipulse/mobile start     # start the dev server for an installed dev build
```

To build in the cloud instead of locally: `npx eas-cli@latest build --profile development --platform android`.

- Screens live in `src/app` (Expo Router). Everything else goes in `src/components`, `src/i18n` and so on.
- Style with Tailwind classes from `@medipulse/ui-tokens`. Use `Text` from `src/components/text.tsx`, not React Native's, so Hindi and Kannada get the right font.
- Every string goes in `src/i18n/locales/{en,hi,kn}.json`.

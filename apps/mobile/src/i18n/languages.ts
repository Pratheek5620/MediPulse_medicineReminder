import type { Script } from '@medipulse/ui-tokens';

export const LANGUAGES = [
  { code: 'en', nativeName: 'English', script: 'latin' },
  { code: 'hi', nativeName: 'हिन्दी', script: 'devanagari' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', script: 'kannada' },
] as const satisfies readonly { code: string; nativeName: string; script: Script }[];

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function isLanguageCode(code: string | null | undefined): code is LanguageCode {
  return LANGUAGES.some((language) => language.code === code);
}

export function scriptFor(code: string): Script {
  return LANGUAGES.find((language) => language.code === code)?.script ?? 'latin';
}

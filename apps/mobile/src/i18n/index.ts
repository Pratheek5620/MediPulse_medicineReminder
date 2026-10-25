import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import kn from './locales/kn.json';
import { DEFAULT_LANGUAGE, isLanguageCode } from './languages';

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  kn: { translation: kn },
} as const;

// Start in the phone's language when we support it. The language picker overrides this.
// TODO: persist the chosen language once the local database lands (see docs/backlog.md).
const deviceLanguage = getLocales()[0]?.languageCode;

// i18n.use is the documented way to add the React plugin; the rule mistakes it for the named export.
// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
  resources,
  lng: isLanguageCode(deviceLanguage) ? deviceLanguage : DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;

import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { LANGUAGES } from '@/i18n/languages';

import { Text } from './text';

export function LanguagePicker() {
  const { t, i18n } = useTranslation();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={t('language.label')}
      className="flex-row gap-2"
    >
      {LANGUAGES.map((language) => {
        const selected = i18n.language === language.code;
        return (
          <Pressable
            key={language.code}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => void i18n.changeLanguage(language.code)}
            className={`min-h-12 justify-center rounded-pill px-5 ${selected ? 'bg-primary' : 'bg-surface-container-high'}`}
          >
            {/* Each name is shown in its own script, whatever the current language. */}
            <Text
              weight="semibold"
              script={language.script}
              className={selected ? 'text-on-primary' : 'text-on-surface'}
            >
              {language.nativeName}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

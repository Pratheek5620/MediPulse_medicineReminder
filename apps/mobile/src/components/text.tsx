import { colors, fonts, type FontWeightName, type Script } from '@medipulse/ui-tokens';
import { useTranslation } from 'react-i18next';
import { Text as NativeText, type TextProps as NativeTextProps } from 'react-native';

import { scriptFor } from '@/i18n/languages';

export type TextProps = NativeTextProps & {
  weight?: FontWeightName;
  /** Overrides the script of the current language, for text that is always in one script. */
  script?: Script;
};

function hasColorClass(className: string) {
  return className.split(/\s+/).some((c) => c.startsWith('text-') && c.slice(5) in colors);
}

/**
 * Use this instead of React Native's Text. It picks the font for the current language and weight,
 * because Plus Jakarta Sans has no Hindi or Kannada letters.
 */
export function Text({ weight = 'regular', script, className, style, ...props }: TextProps) {
  const { i18n } = useTranslation();
  const activeScript = script ?? scriptFor(i18n.language);
  const classes = className ?? '';
  return (
    <NativeText
      className={`${hasColorClass(classes) ? '' : 'text-on-surface'} ${classes}`}
      style={[{ fontFamily: fonts[activeScript][weight] }, style]}
      {...props}
    />
  );
}

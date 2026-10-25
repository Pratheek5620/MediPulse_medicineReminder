export declare const colors: Record<string, string> & {
  primary: string;
  'primary-container': string;
  surface: string;
  'on-surface': string;
  'on-surface-variant': string;
  success: string;
  warning: string;
  error: string;
};

export type Script = 'latin' | 'devanagari' | 'kannada';
export type FontWeightName = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export declare const fonts: Record<Script, Record<FontWeightName, string>>;
export declare const webFontStacks: { sans: string[] };
export declare const radii: { card: number; hero: number; pill: number };

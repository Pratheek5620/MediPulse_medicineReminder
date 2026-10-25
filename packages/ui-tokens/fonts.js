// Font family names as loaded by expo-font in apps/mobile (one family per weight, because
// Android can't pick a weight from a single custom family). Plus Jakarta Sans has no Hindi or
// Kannada letters, so each script has its own family.
const fonts = {
  latin: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semibold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    extrabold: 'PlusJakartaSans_800ExtraBold',
  },
  devanagari: {
    regular: 'NotoSansDevanagari_400Regular',
    medium: 'NotoSansDevanagari_500Medium',
    semibold: 'NotoSansDevanagari_600SemiBold',
    bold: 'NotoSansDevanagari_700Bold',
    extrabold: 'NotoSansDevanagari_800ExtraBold',
  },
  kannada: {
    regular: 'NotoSansKannada_400Regular',
    medium: 'NotoSansKannada_500Medium',
    semibold: 'NotoSansKannada_600SemiBold',
    bold: 'NotoSansKannada_700Bold',
    extrabold: 'NotoSansKannada_800ExtraBold',
  },
};

// Web font stacks for the doctor web app (Phase 2).
const webFontStacks = {
  sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', '"Noto Sans Kannada"', 'sans-serif'],
};

module.exports = { fonts, webFontStacks };

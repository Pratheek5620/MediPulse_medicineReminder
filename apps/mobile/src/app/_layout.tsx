import '../global.css';
import '@/i18n';

// Import each weight on its own, so only these files are bundled (not every weight and italic).
import { NotoSansDevanagari_400Regular } from '@expo-google-fonts/noto-sans-devanagari/400Regular';
import { NotoSansDevanagari_500Medium } from '@expo-google-fonts/noto-sans-devanagari/500Medium';
import { NotoSansDevanagari_600SemiBold } from '@expo-google-fonts/noto-sans-devanagari/600SemiBold';
import { NotoSansDevanagari_700Bold } from '@expo-google-fonts/noto-sans-devanagari/700Bold';
import { NotoSansDevanagari_800ExtraBold } from '@expo-google-fonts/noto-sans-devanagari/800ExtraBold';
import { NotoSansKannada_400Regular } from '@expo-google-fonts/noto-sans-kannada/400Regular';
import { NotoSansKannada_500Medium } from '@expo-google-fonts/noto-sans-kannada/500Medium';
import { NotoSansKannada_600SemiBold } from '@expo-google-fonts/noto-sans-kannada/600SemiBold';
import { NotoSansKannada_700Bold } from '@expo-google-fonts/noto-sans-kannada/700Bold';
import { NotoSansKannada_800ExtraBold } from '@expo-google-fonts/noto-sans-kannada/800ExtraBold';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans/800ExtraBold';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Keys must match the family names in @medipulse/ui-tokens (fonts.js).
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_500Medium,
    NotoSansDevanagari_600SemiBold,
    NotoSansDevanagari_700Bold,
    NotoSansDevanagari_800ExtraBold,
    NotoSansKannada_400Regular,
    NotoSansKannada_500Medium,
    NotoSansKannada_600SemiBold,
    NotoSansKannada_700Bold,
    NotoSansKannada_800ExtraBold,
  });
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

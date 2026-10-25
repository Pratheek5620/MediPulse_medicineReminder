import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { LanguagePicker } from '@/components/language-picker';
import { Text } from '@/components/text';

function greetingKey(hour: number) {
  if (hour < 12) return 'today.greeting.morning' as const;
  if (hour < 17) return 'today.greeting.afternoon' as const;
  return 'today.greeting.evening' as const;
}

export default function TodayScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView contentContainerClassName="grow gap-6 px-6 py-4">
        <View className="gap-1">
          <Text weight="bold" className="text-lg text-primary">
            {t('appName')}
          </Text>
          <Text weight="extrabold" className="text-3xl">
            {t(greetingKey(new Date().getHours()))}
          </Text>
        </View>

        <LanguagePicker />

        <View className="items-center gap-4 rounded-card bg-surface-container-lowest px-6 py-10">
          <Text weight="bold" className="text-center text-2xl">
            {t('today.emptyTitle')}
          </Text>
          <Text className="text-center text-lg text-on-surface-variant">
            {t('today.emptyBody')}
          </Text>
          {/* Opens the Add medicine screen once it exists (next task in docs/backlog.md). */}
          <Button label={t('today.addMedicine')} className="mt-2 self-stretch" />
        </View>

        <View className="rounded-card bg-surface-container-low p-5">
          <Text className="text-base text-on-surface-variant">{t('safety.emergency')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Pressable, type PressableProps } from 'react-native';

import { Text } from './text';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
};

/** The main pill-shaped action button. At least 56 dp tall, so it's easy to tap. */
export function Button({ label, className, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={`min-h-14 items-center justify-center rounded-pill bg-primary px-8 active:opacity-80 ${className ?? ''}`}
      {...props}
    >
      <Text weight="bold" className="text-lg text-on-primary">
        {label}
      </Text>
    </Pressable>
  );
}

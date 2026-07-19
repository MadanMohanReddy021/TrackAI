import React from "react";

import Animated, {
    FadeInUp,
} from "react-native-reanimated";

type Props = {
  delay?: number;
  children: React.ReactNode;
};

export default function AnimatedCard({
  children,
  delay = 0,
}: Props) {
  return (
    <Animated.View
      entering={FadeInUp
        .delay(delay)
        .duration(500)}
    >
      {children}
    </Animated.View>
  );
}
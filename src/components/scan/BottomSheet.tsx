import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const COLLAPSED = SCREEN_HEIGHT * 0.55;
const EXPANDED = 80;

interface Props {
  children: React.ReactNode;
}

export default function BottomSheet({
  children,
}: Props) {

  const translateY = useSharedValue(COLLAPSED);

  const startY = useSharedValue(COLLAPSED);

  const pan = Gesture.Pan()

    .onBegin(() => {
      startY.value = translateY.value;
    })

    .onUpdate((event) => {

      const next = startY.value + event.translationY;

      translateY.value = Math.min(
        COLLAPSED,
        Math.max(EXPANDED, next)
      );

    })

    .onEnd(() => {

      if (translateY.value < SCREEN_HEIGHT * 0.35) {

        translateY.value = withSpring(EXPANDED);

      } else {

        translateY.value = withSpring(COLLAPSED);

      }

    });

  const animatedStyle = useAnimatedStyle(() => {

    return {

      transform: [

        {

          translateY: translateY.value,

        },

      ],

    };

  });

  return (

    <GestureDetector gesture={pan}>

      <Animated.View

        style={[

          styles.sheet,

          animatedStyle,

        ]}

      >

        <View style={styles.handle} />

        {children}

      </Animated.View>

    </GestureDetector>

  );

}

const styles = StyleSheet.create({

  sheet: {

    position: "absolute",

    left: 0,

    right: 0,

    top: 0,

    bottom: 0,

    backgroundColor: "#FFF",

    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,

    elevation: 15,

    shadowColor: "#000",

    shadowOpacity: 0.15,

    shadowRadius: 10,

  },

  handle: {

    width: 55,

    height: 6,

    borderRadius: 10,

    backgroundColor: "#DDD",

    alignSelf: "center",

    marginVertical: 12,

  },

});
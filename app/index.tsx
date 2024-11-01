import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TEXT_COLOR, styles } from "./styles";
import Icon from '@expo/vector-icons/Entypo';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Extrapolation, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { useState } from "react";
import { Canvas, Line, Path, Rect } from "@shopify/react-native-skia";

const MIN = 0;
const MAX = 80;

const TRANS = 100;

function Card() {

  const [counter, setCounter] = useState(0);

  const xOffset = useSharedValue(0);

  const action = (sum: number) => {
    setCounter(s => s + sum);
  }

  const pan = Gesture.Pan()
    .onBegin(() => {
      xOffset.value = 0;
    })
    .onUpdate((e) => {
      xOffset.value = interpolate(e.translationX, [-MAX, MIN, MAX], [-TRANS, 0, TRANS], Extrapolation.CLAMP);
    })
    .onEnd(() => {
      xOffset.value = withTiming(0, { duration: 200 });

      const diff = Math.abs(TRANS - Math.abs(xOffset.value));

      if (diff < 16) {
        if (xOffset.value < 0) {
          runOnJS(action)(1)
        } else {
          runOnJS(action)(-1)
        }

      }

    });


  const cardAss = useAnimatedStyle(() => ({
    transform: [
      { translateX: xOffset.value }
    ]
  }));

  const backgroundAss = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(xOffset.value, [-TRANS, 0, TRANS], ['#40c057', 'white', '#fa5252'])

  }));

  const line = useDerivedValue(() => {
    return interpolate(xOffset.value, [-TRANS, TRANS * -0.2, 0, TRANS * 0.2, TRANS], [1,0, 0, 0, 1], Extrapolation.CLAMP)
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={backgroundAss}>
        <View style={styles.cardBackground}>
          {/*
          <Icon name="cross" size={28} color="white" />
          */}
          {/*
          <Icon name="check" size={28} color="white" />
          */}
          <Canvas style={{width: 24, height: 24}}>
            <Path
              path="M20 20 4 4m16 0L4 20"
              strokeWidth={4}
              style="stroke"
              start={0}
              end={line}
              color="white"
            />
          </Canvas>
          <Canvas
            style={{ width: 24, height: 24 }}
          >
            <Path
              path="m4 12 6 6L20 6"
              strokeWidth={4}
              style="stroke"
              color="white"
              start={0}
              end={line}
            />
          </Canvas>
        </View>
        <Animated.View style={[styles.card, cardAss]}>
          <Text style={styles.text}>Card {counter}</Text>
          <Icon name="chevron-right" size={26} color={TEXT_COLOR} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const Separator = () => <View style={styles.separator} />

export default function HomePage() {

  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView>
      <View style={[styles.wrapper, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Text style={styles.title}>Super list</Text>
        <Card />
        <Separator />
        <Card />
        <Separator />
        <Card />
      </View>
    </GestureHandlerRootView>
  );
}

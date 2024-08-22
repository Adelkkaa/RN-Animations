import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SquartSize = 120;

export default function MainScreen() {
  // Объявляем переменные, которые участвуют в анимации
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Присваиваем анимированным компонентам стиль
  // Важная пометка, в RN свойства translate должны быть всегда по порядку выше чем scale и rotate
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
        
      ],
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withTiming(rotate.value + 90);
        }}
        style={[styles.square, rStyle]}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        const MaxTranslationAmount = 100;
        const tX = Math.random() * MaxTranslationAmount * 2 - MaxTranslationAmount;
        const tY = Math.random() * MaxTranslationAmount * 2 - MaxTranslationAmount;
        translateX.value = withSpring(tX);
        translateY.value = withSpring(tY);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: SquartSize,
    height: SquartSize,
    backgroundColor: "#00a6ff",
    borderRadius: 30,
    borderCurve: "continuous",
  },
  button: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 40,
    height: 40,
    backgroundColor: "#111",
    borderRadius: 100,
  },
});

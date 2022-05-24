import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
// import {
//   diffClamp,
//   translate,
//   usePanGestureHandler,
//   withDecay,
//   withOffset,
// } from "react-native-redash";
import Animated, {
  Extrapolate,
  add,
  interpolate,
} from "react-native-reanimated";

const SliderView = (items, viewAttribute, imageAttribute, textAttribute) => {
  const [containerWidth, setContainerWidth] = React.useState(WIDTH);

  const WIDTH = Dimensions.get("screen").width * 0.8;
  const ITEM_WIDTH = WIDTH * 0.6;

  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();

  const visibleItem = Math.floor(containerWidth / ITEM_WIDTH);

  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -items.length * ITEM_WIDTH + visibleItem * ITEM_WIDTH,
    0
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View>
        {items.map((item, index) => {
          const positionY = add(y, index * ITEM_WIDTH);
          const isDisappearing = -ITEM_WIDTH;
          const isOnTop = 0;
          const isOnBottom = (visibleItem - 1) * ITEM_WIDTH;
          const isAppearing = visibleItem * ITEM_WIDTH;
          const extraTranslationY = interpolate(positionY, {
            inputRange: [isOnBottom, isAppearing],
            outputRange: [0, -ITEM_WIDTH / 4],
            extrapolate: Extrapolate.CLAMP,
          });
          const translateY = add(
            interpolate(y, {
              inputRange: [-ITEM_WIDTH * index, 0],
              outputRange: [-ITEM_WIDTH * index, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
            extraTranslationY
          );
          const scale = interpolate(positionY, {
            inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionY, {
            inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
          });
          return (
            <Animated.View
              style={[
                ...viewAttribute,
                { opacity, transform: [{ translateY }, { scale }] },
              ]}
              key={index}
            >
              <Image {...imageAttribute} source={item.src} />
              <Text {...textAttribute}>{item.title}</Text>
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SliderView;

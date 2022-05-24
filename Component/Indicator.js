import * as React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../Constant/Color.json";

export const Indicator = ({ step, selected, width,styles,selectedColor }) => {
  let i = 0;
  let indicators = [];

  for (i; i < step; i++) {
    indicators.push(i + 1);
  }

  let indicatorWidth = width !== null ? width : null;

  return (
    <View
      style={[styles === undefined ? {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: width !== null ? 10 : 0,
      }:styles]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "12%",
        }}
      >
        {indicators.map((item, index) => (
          <View
            key={index}
            style={{
              borderRadius: 5,
              height: 8,
              backgroundColor:
                indicatorWidth !== null
                  ? colors.NATURAL_COLOR.black
                  : item === selected
                  ? selectedColor
                  : colors.SECONDARY_COLOR,
              width:
                indicatorWidth === null ? 8 : item === selected ? width : 8,
            }}
          />
        ))}
      </View>
    </View>
  );
};

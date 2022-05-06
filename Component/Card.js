import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
const Card = (props) => {
  return (
    <TouchableOpacity
      style={[styles.card, props.card]}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "#eff3f8",
    padding: 10,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});
export default Card;

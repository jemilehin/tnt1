import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TextInput,
} from "react-native";

export const Input = (props) => {
  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder={props.placeholder}
        outlineColor="transparent"
        style={[
          styles.input,
          styles.layoutStyle,
          props.inputStyle,
        ]}
        secureTextEntry={props.secureTextEntry}
        onChangeText={(text) => props.setText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    layoutStyle: {
      position: "relative",
    },
    input: {
      paddingVertical: 12,
      paddingLeft: 15,
      backgroundColor: "#C2CEF1",
      width: "90%",
      borderRadius: 50
    },
  });

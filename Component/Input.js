import React from "react";

import {
  View,
  TextInput,
} from "react-native";

export const Input = (props) => {
  return (
    <View>
      <TextInput
        {...props}
      />
    </View>
  );
};

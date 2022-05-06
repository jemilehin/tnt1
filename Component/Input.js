import React from "react";

import {
  View,
  TextInput,
} from "react-native";

export const Input = (props) => {
  return (
    <View style={{width:"100%"}}>
      <TextInput
        {...props}
      />
    </View>
  );
};

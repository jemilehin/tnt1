import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,TextInput
} from "react-native";

const ChatRoom = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hi from Chat room</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatRoom;

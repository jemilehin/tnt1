import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";

import colors from "../Constant/Color.json";
import { URL } from "../helpers/api";

export const FullMessage = ({ navigation, route }) => {
  const [message, setMessage] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const { messageId } = route.params;

  useEffect(() => {
    fetch(`${URL}viewMessage/${messageId}`)
      .then((res) => res.text())
      .then((res) => {
        // console.log(res)
        setMessage(JSON.parse(res));
        setLoading(true);
      });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Profile")}
          icon="account"
          size={30}
          color={colors.NATURAL_COLOR.white}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={styles.container}
    >
      {!loading ? (<View style={{ top: "50%", position: "absolute"}}>
          <ActivityIndicator
            color={colors.SECONDARY_COLOR_VARIANT} size="large" />
        </View>
      ) : (
        <View>
          <Text style={[styles.title, styles.font]}>{message.message.title}</Text>
          <Text style={[styles.body, styles.font]}>{message.message.content}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    position: "relative",
    fontSize: 27,
    fontWeight: "700",
    textAlign: "center",
    color: colors.NATURAL_COLOR.black,
    top: "30%"
  },
  body: {
    position: "relative",
    top: "30%",
    fontSize: 15,
    color: colors.SECONDARY_COLOR,
    lineHeight: 25,
  },
});

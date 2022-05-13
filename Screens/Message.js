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
      style={[styles.container,{flex: loading ? null : 1,
        alignItems: loading ? null : "center",}]}
    >
      {!loading ? (<View style={{ top: "50%", position: "absolute"}}>
          <ActivityIndicator
            color={colors.SECONDARY_COLOR_VARIANT} size="large" />
        </View>
      ) : (
        <View style={{
          top: 20}}>
          <View style={[styles.message_container]}>
            <View>
                <View style={styles.heading}>
                  <Text style={[styles.title, styles.font]}>{message.message.title}</Text>
                </View>
                <View style={styles.bodyCont}>
                  <Text style={[styles.body, styles.font]}>{message.message.content}</Text>
                </View>
              </View>
          </View>
        </View>
        
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    position: "relative",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "left",
    color: "#4F4F4F",
  },
  body: {
    position: "relative",
    fontSize: 16,
    color: colors.SECONDARY_COLOR,
    lineHeight: 28
  },
  message_container: {
    position: "relative",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    padding: 10,
    borderBottomLeftRadius: 20,
    width: "95%"
  },
  heading: {
    padding: 5,
    borderBottomWidth: 1
  },
  bodyCont: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10
  }
});

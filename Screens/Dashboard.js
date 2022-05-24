import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { FAB } from "react-native-paper";
import Card from "../Component/Card";
import SnackBar from "react-native-snackbar-component";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../Constant/Color.json";
import { URL } from "../helpers/api";
import { Platform } from "react-native-web";

export const Dashboard = ({ navigation, route }) => {
  const [messages, setMessages] = React.useState([]);
  const [snackMessage, setSnackMessage] = React.useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [response, setResponse] = useState(true);
  const [firstEntry,setFirstEntry] = useState('0')

  const offset = useSharedValue(0.9);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const checkUserTime = async () => {
    try {
      const value = await AsyncStorage.getItem('@firstEntry');
      if(value === null) {
        // do something
        await AsyncStorage.setItem('@firstEntry', '1')
        setFirstEntry('1')
        offset.value = 0
      }
    } catch(e) {
      console.log(e)
    }
  }

  const getMessages = () => {
    fetch(`${URL}allMessage`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.message);
        setResponse(false);
      })
      .catch((e) => setResponse(false));
  };

  React.useEffect(() => {
    checkUserTime()
    const unsubscribe = navigation.addListener("focus", () => {
      getMessages();
    });
    firstEntry === '0' ? setTimeout(() => offset.value = 0.9, 2500) : "Do nothing"
    setTimeout(() => setSnackMessage(false), 1500);
    return unsubscribe;
  }, []);


  const fetchMoreData = () => {
    setRefresh(true);
    fetch(`${URL}allMessage`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.message);
        setRefresh(false);
      })
      .catch((e) => setRefresh(false));
  };

  // setInterval(getMessages, 300000);

  const OnFirstEntry = () => {
    return (
      <Animated.View style={[styles.msgContainer,customSpringStyles ]}>
        <View style={styles.boxMsg}>
          <Text style={{fontSize: 15, color: "white", fontWeight: "700"}}>Click here to send messages to the administrator</Text>
        </View>
        <View style={styles.shapeContainer}>
          <View style={styles.shape}></View>
        </View>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <View style={styles.container}>
        {messages.length > 0 && !response ? (
          <FlatList
            data={messages.reverse()}
            style={{ width: "100%" }}
            renderItem={({ item }) => (
              <Card
                card={[styles.card]}
                onPress={() => {
                  navigation.navigate("Message", { messageId: item.id });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.item, { fontWeight: "700" }]}>
                    {item.title}
                  </Text>
                  <Text style={{ fontWeight: "500" }}>
                    {item ? format(new Date(item.created_at), "MMM, dd") : null}
                  </Text>
                </View>
                <Text style={styles.decription}>
                  {item.content.length > 30
                    ? item.content.slice(0, 32) + "..."
                    : item.content}
                </Text>
              </Card>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            ListEmptyComponent={() => (
              <View>
                <Text>
                  No message from the admin.You will get notified when there is
                  a new message
                </Text>
              </View>
            )}
            onRefresh={() => fetchMoreData()}
            keyExtractor={(item) => item.id}
            refreshing={refresh}
            ListFooterComponent={() => {
              return (
                <ActivityIndicator
                  style={{ top: -35, position: "absolute", left: "45%" }}
                  color={colors.SECONDARY_COLOR_VARIANT}
                  size="large"
                />
              );
            }}
          />
        ) : !response && messages.length === 0 ? (
          <>
            <Image
              source={require("../assets/images/empty_msg.png")}
              style={{ height: "30%" }}
              resizeMode="contain"
            />
          </>
        ) : (
          <View>
            <ActivityIndicator
              // style={{ position: "absolute" }}
              color={colors.SECONDARY_COLOR_VARIANT}
              size="large"
            />
            <Text>Checking for new message</Text>
          </View>
        )}
        <SnackBar visible={snackMessage} textMessage="Login successful" />
        <OnFirstEntry />
        <FAB
          style={styles.fab}
          large
          icon="message"
          onPress={() => 
            navigation.navigate("Chatroom")
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  safeContainer: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.PRIMARY_COLOR,
    zIndex:200
  },
  item: {
    fontSize: 20,
    fontWeight: "500",
    color: "#4F4F4F",
  },

  card: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 13,
    // height: 200,
    // width: Dimensions.get("window").width,
    // backgroundColor: "#f18484",
    // justifyContent: "center", //Centered vertically
    // alignItems: "center", // Centered horizontally
  },
  msgContainer:{
    zIndex:100,
    position: "absolute",
    top: "71%",
    right: "2%",
    width: "60%",
  },
  boxMsg: {
    paddingVertical: 15,
    paddingLeft: 15,
    borderRadius: 100,
    backgroundColor: "#0000ff",
  },
  shape:{
    height: 0,
    width: 0,
    borderTopColor: "#0000ff",
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  shapeContainer: {
    position: "absolute",
    right: "8%",
    top: "90%"
  }
});

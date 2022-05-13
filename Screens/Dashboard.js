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
import { FAB } from "react-native-paper";
import Card from "../Component/Card";
import SnackBar from "react-native-snackbar-component";
import { format } from "date-fns";

import colors from "../Constant/Color.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../helpers/api";

export const Dashboard = ({ navigation, route }) => {
  const [messages, setMessages] = React.useState([]);
  const [snackMessage, setSnackMessage] = React.useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [response, setResponse] = useState(true);

  React.useEffect(() => {
    // let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      fetch(`${URL}allMessage`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.message);
        setResponse(false);
      })
      .catch((e) => setResponse(false));})
    
      setTimeout(() => setSnackMessage(false), 1500);
      return unsubscribe ;
  }, []);

  const fetchMoreData = () => {
    let skipped = skip < limit ? skip + 5 : skip;
    if (skipped < limit) {
      setSkip(skipped);
      // fetch(`https://dummyjson.com/posts?limit=10&skip=${skipped}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setMessages(data.posts);
      //   });
    } else {
      alert("no more message");
    }
  };

  const prevMessages = () => {
    let prevSkipped = skip > 0 ? skip - 5 : skip;
    setRefresh(true);
    if (prevSkipped === 0) {
      alert("no new message");
      setRefresh(false);
    } else {
      setSkip(prevSkipped);
      // fetch(`${URL}allMessage`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setMessages(data.posts);
      //     setRefresh(false)
      //   });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <View style={styles.container}>
        {messages.length > 0 && !response ? (
          <FlatList
            data={messages}
            style={{ width: "100%" }}
            renderItem={({ item }) => (
              <Card
                card={[styles.card]}
                onPress={() => {
                  navigation.navigate("Message", { messageId: item.id });
                }}
              >
                <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[styles.item,{fontWeight: "700"}]}>{item.title}</Text>
                  <Text style={{fontWeight: "500"}}>{format(new Date(item.created_at),"MMM, dd")}</Text>
                </View>
                <Text style={styles.decription}>{item.content.length > 30 ? item.content.slice(0,32)+"..." : item.content}</Text>
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
            onEndReachedThreshold={0.3}
            onEndReached={() => fetchMoreData()}
            onRefresh={() => prevMessages()}
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
        <FAB
          style={styles.fab}
          large
          icon="message"
          onPress={() => navigation.navigate("Chatroom")}
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
  },
  item: {
    fontSize: 20,
    fontWeight: "500",
    color: "#4F4F4F"
  },

  card: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 13
    // height: 200,
    // width: Dimensions.get("window").width,
    // backgroundColor: "#f18484",
    // justifyContent: "center", //Centered vertically
    // alignItems: "center", // Centered horizontally
  },
});

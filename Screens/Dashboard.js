import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,FlatList
} from "react-native";
import { IconButton } from "react-native-paper";
import { FAB } from "react-native-paper";
import Card from '../Component/Card'

import colors from "../Constant/Color.json";

export const Dashboard = ({ navigation, route }) => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) =>  setMessages(data.posts))
      .catch((e) => console.log(e));
  }, []);



  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <View style={styles.container}>
        <FlatList
        data={messages.reverse()}
        renderItem={({item}) => 
        <Card style={[styles.card]} onPress={() => {
          navigation.navigate('Message',{messageId: item.id})
          // console.log("mId:", item.id)
          }}>
          <Text style={styles.item}>{item.title}</Text>
          <Text style={styles.decription}>{item.body}</Text>
        </Card>
          }
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          ListEmptyComponent ={() => <View ><Text>No message from the admin.You will get notified when there is a new message</Text></View>}
      />
        <FAB
          style={styles.fab}
          large
          icon="message"
          onPress={() => navigation.navigate('Chatroom')}
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
    marginTop: 10
  },
  safeContainer: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.SECONDARY_COLOR,
  },
  item:{
    fontSize: 20,
    fontWeight: '500'
  },

  card: {
    height: 200,
    width: '100%',
    backgroundColor: '#f18484',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  }
});

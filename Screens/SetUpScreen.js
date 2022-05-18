import React, { useState, useEffect, useRef } from "react";
import colors from "../Constant/Color.json";

import {
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Indicator } from "../Component/Indicator";
import PagerView from "react-native-pager-view";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export const LandingScreen = ({ navigation }) => {
  const currentPosition = useRef(0);
  const [selected, setSelected] = useState(1);
  // const width = Dimensions.get("window").width
  const features = [
    {
      src: require("../assets/images/regular_information.png"),
      title: "Get informed regularly",
    },
    {
      src: require("../assets/images/freedom_speech.png"),
      title: "Freedom of expression at no cost",
    },
    {
      src: require("../assets/images/active_politics.png"),
      title: "Active Political Perticipation",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>Welcome</Text>
      <View style={[styles.slider_container]}>
        <ScrollView
          ref={currentPosition}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row" }}
          onScroll={(event) => {
            if(event.nativeEvent.contentOffset.x === 0){
              setSelected(1)
            }if(event.nativeEvent.contentOffset.x === 320){
              setSelected(2)
            }if(event.nativeEvent.contentOffset.x === 640){
              setSelected(3)
            }
          }
          //  console.log() 
          }
        >
          {features.map((item, index) => (
            <View style={[styles.info_container]} key={index+1}>
              <Image style={{ width: 100, height: 100 }} source={item.src} />
              <Text style={styles.feature_text}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
        <Indicator selectedColor={colors.NATURAL_COLOR.white} step={3} selected={selected} width={null} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.signin_text}
        >
          Don't have an account yet? Sign Up
        </Text>
        <Text
          style={{
            top: "19%",
            color: colors.NATURAL_COLOR.white,
            fontSize: 18,
            textDecorationLine: "underline",
            padding: 8,
          }}
          onPress={() => console.log("pressed")}
        >
          Learn More
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    // width: "70%",
    top: "13%",
    // left: "-4%",
    color: colors.NATURAL_COLOR.white,
    lineHeight: 30,
    position: "relative",
    textAlign: "center",
  },
  buttonContainer: {
    top: "30%",
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.NATURAL_COLOR.white,
    paddingVertical: 12,
    width: "50%",
    borderRadius: 50,
    left: "-4%",
  },
  shadow: {
    shadowColor: "#470000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 4,
    backgroundColor: "white",
  },
  buttonText: {
    color: colors.SECONDARY_COLOR,
    fontSize: 17,
  },
  signin_text: {
    color: colors.NATURAL_COLOR.white,
    fontSize: 17,
    top: "9%",
    textDecorationLine: "underline",
    padding: 8,
  },
  innerBtnContainer: {
    flexDirection: "row",
    marginHorizontal: "6%",
    marginVertical: "10%",
  },
  info_container: {
    flexDirection: "row",
    width: "26.8%",
    alignItems: "center",
    borderColor: colors.NATURAL_COLOR.white,
    marginRight: 0.2 * 100,
    paddingHorizontal: 10,
  },
  slider_container: {
    padding: 20,
    backgroundColor: "#6E8CDF",
    top: "20%",
    left: "20%",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  feature_text: {
    fontSize: 19,
    color: colors.NATURAL_COLOR.white,
    marginLeft: 23,
    width: "47%",
  },
});

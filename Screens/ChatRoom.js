import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Image,Dimensions
} from "react-native";
import Toast from "react-native-root-toast";
import { IconButton } from "react-native-paper";
import colors from "../Constant/Color.json";

import * as ImagePicker from "expo-image-picker";
import { sendMessage } from "../Redux/Member/actions";

const ChatRoom = ({ navigation }) => {
  const [messages, setMessages] = React.useState([]);
  const [msgInput, setMsgInput] = React.useState("");
  const [userType, setUserType] = React.useState("user");
  const [display, setDisplay] = React.useState(false);
  const [resultPicked, setResultPicked] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const opacity = React.useRef(new Animated.Value(0)).current;
  const displayResultOpacity = React.useRef(new Animated.Value(0)).current;
  let message = React.useRef({});

  const screenLength = Dimensions.get('screen').height

  // useEffect(() => {
  //   return () => {};
  // });

  const launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      animationResultControl();
      animationControl()
    } else {
      setResultPicked(false);
    }
  }

  // JSX that renders the picker i.e documentPicker,imagePicker and Camera
  function SelectPickerType(props) {
    return (
      <Animated.View style={props.styles}>
        <TouchableOpacity
          style={[props.button_style, { backgroundColor: "#FFA500" }]}
          onPress={() => launchImageLibrary()}
        >
          <IconButton
            icon="image"
            color={colors.NATURAL_COLOR.white}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[props.button_style, { backgroundColor: "#EE4B2B" }]}
        >
          <IconButton
            icon="file"
            size={30}
            color={colors.NATURAL_COLOR.white}
            onPress={() => console.log("file pressed")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[props.button_style, { backgroundColor: "#BF40BF" }]}
        >
          <IconButton
            icon="camera"
            size={30}
            color={colors.NATURAL_COLOR.white}
            onPress={() => console.log("camera pressed")}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // animating the picker container to view
  function animationControl() {
    if (!display) {
      setDisplay(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setDisplay(false);
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  // animating picked result container to view image selected from library
  function animationResultControl() {
    // if (!resultPicked) {
      Animated.timing(displayResultOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    // }
  }

  function endAnimationResultControl() {
      Animated.timing(displayResultOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
  }
  
  const [success,setSuccessful] = useState(null)
  // const [messageSent, SetMessageIsSent] = useState(false)

  const callback = (response) => {
    if(response === 200){
      setMsgInput("")
      setSuccessful(true)
      // SetMessageIsSent(true)
      Toast.show("Message sent", {
        duration: Toast.durations.SHORT,
      })
    }else{
      setSuccessful(false)
      Toast.show("Message not sent", {
        duration: Toast.durations.SHORT,
      })
    }
  }

  function DisplayPickedResult(props) {
    return (
      <Animated.View style={props.styles}>
        <Image style={{ resizeMode: "cover" }} source={{ uri: props.data }} />
        <View>
          <TouchableOpacity
          onPress={() => {
            message = { title: "", description: "", file: props.data };
            messages.push(message);
          }}
          activeOpacity={0.5}
        >
          <IconButton icon="send" size={30} color={colors.SECONDARY_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            endAnimationResultControl()
          }}
          activeOpacity={0.5}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 65 : "1%"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map((message) =>
                userType !== "user" ? (
                  <View key={message.id} style={{ alignItems: "flex-end" }}>
                    <View style={styles.receiver}>
                      {/* <Avatar
                        rounded
                        source={{ uri: message.photoURL }}
                        size={30}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                      /> */}
                      <Text style={styles.receiverText}>{message.message}</Text>
                    </View>
                  </View>
                ) : (
                  <View key={message.id} style={{ alignItems: "flex-start" }}>
                    <View style={styles.sender}>
                      <Avatar
                        rounded
                        source={{ uri: message.photoURL }}
                        size={30}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={styles.senderText}>{message.message}</Text>
                      <Text style={styles.senderName}>
                        {message.displayName}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Type Message..."
                  style={styles.textInput}
                  value={msgInput}
                  multiline={true}
                  onChangeText={(text) => setMsgInput(text)}
                />

                <SelectPickerType
                  button_style={styles.pickerButton}
                  styles={[
                    styles.pickerContainer,
                    styles.shadow,
                    {
                      opacity: opacity,
                      transform: [
                        {
                          scaleX: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                        },
                        {
                          translateY: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -100],
                          }),
                        },
                        { translateX: 5 },
                      ],
                    },
                  ]}
                />
                <TouchableOpacity
                  style={styles.icon}
                  activeOpacity={0.5}
                  onPress={() => {
                    animationControl();
                  }}
                >
                  <IconButton
                    icon="file-document"
                    size={20}
                    color={colors.PRIMARY_COLOR}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => sendMessage(image,msgInput,callback)}
                activeOpacity={0.5}
              >
                <IconButton
                  icon="send"
                  size={30}
                  color={colors.PRIMARY_COLOR}
                />
              </TouchableOpacity>
            </View>
            <DisplayPickedResult
              data={image}
              styles={[
                styles.preview_image,
                {
                  opacity: displayResultOpacity,
                  transform: [
                    {
                      translateY: displayResultOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, screenLength],
                      }),
                    },
                    { translateX: 5 },
                  ],
                  bottom: -screenLength,
                },
              ]}
            />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "gray",
    borderRadius: 30,
    width: "100%",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ececec",
    alignItems: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignItems: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    width: "85%",
  },
  icon: {
    position: "absolute",
    right: "7%",
  },
  pickerContainer: {
    position: "absolute",
    top: 0,
    flex: 1,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 5,zIndex: -1
  },
  pickerButton: {
    borderRadius: 50,
  },
  shadow: {
    shadowColor: "#470000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 2,
    backgroundColor: "white",
  },
  preview_image: {
    position: "absolute",
    flex: 1,
    borderTopEndRadius: 50,
    backgroundColor: 'grey'
  },
});

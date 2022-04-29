import React, { useState } from "react";

import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Image
} from "react-native";
import { IconButton, 
  // TextInput 
 } from 'react-native-paper';
import { AuthContext } from "../Component/context";
import colors from "../Constant/Color.json";
import { SignInRequest } from "../Redux/Member/actions";
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../Component/Input";
import { Header } from "../Component/HeaderBack";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = React.useContext(AuthContext);
  const [isLoginInProgress, setProgress] = useState(false)

  const OnSignIn = () => {
    if(email === '' || password === ''){
      alert('email or password is empty')
    }else{
      setProgress(true)
      SignInRequest(email,password,callback,errorCallback)
    }
  }

  const callback = async(response) => {
      setProgress(false)
      signIn()
      await AsyncStorage.setItem('user', JSON.stringify(response.user))
  }

  const errorCallback = (err) => {
    alert('Bad network request')
    setProgress(false)
    console.log(err)
  }

  Header("LEFT",navigation,colors.PRIMARY_COLOR)


  return (
    <View style={styles.container}>
      <View style={[styles.top_container]}>
      <IconButton
    icon="keyboard-backspace"
    color={colors.PRIMARY_COLOR}
    size={25}
    onPress={() => navigation.goBack()}
  />
    <Image style={[styles.top_image,{height: 130, width: 130}]} source={require("../assets/images/top_circle.png")} />
      </View>
      <Text style={{fontSize: 35, fontWeight: '700', left: "7%", color: colors.PRIMARY_COLOR}}>Log In</Text>

      <View style={styles.innerContainer}>
        <Input placeholder="Email" inputStyle={{marginBottom:"8%"}} setText={setEmail}/>
        <Input placeholder="Password" inputStyle={{marginTop:"8%"}} setText={setPassword} secureTextEntry={true}/>
      </View>

      <ActivityIndicator Type='large' animating={isLoginInProgress} color={colors.SECONDARY_COLOR_VARIANT} />

      <View style={styles.buttonSection}>
          <TouchableOpacity style={[styles.button]}
            onPress={()=> OnSignIn()}
          >
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.innerSection}>
              <Text style={[{marginRight: 8}, styles.innersectionText]}>Forgot Password?</Text>
              <Text style={[{color: colors.TEXT_BUTTON_COLOR}, styles.innersectionText]}>reset</Text>
          </View>
          {/* <Text style={{fontSize: 15,fontWeight: "bold", paddingVertical: 20}} onPress={() => navigation.navigate("Register")}>Register</Text> */}
      </View>
      <Image style={[styles.bottom_image,{height: 130, width: 130}]} source={require("../assets/images/bottom_circle.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.NATURAL_COLOR.white,
  },
  innerContainer: {
    top: "10%",
    left: "5%"
  },
  buttonSection: {
    position: "relative",
    top: Dimensions.get("screen").height/7.5,
    alignItems: "center",
    flex: 1
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.PRIMARY_COLOR,
    paddingTop: 12,
    paddingBottom: 12,
    width: '50%',
    borderRadius: 50,
    marginBottom: 12
  },
  buttonText: {
    color: colors.NATURAL_COLOR.white,
    fontSize: 15,
    fontWeight: "700",
  },
  textAttribute: {
    color: colors.NATURAL_COLOR.black,
    fontSize: 20,
    marginBottom: 10,
  },
  fonts: {
    fontWeight: "600",
  },
  innerSection: {
      flexDirection: "row",
      justifyContent: 'space-between',
      top: "7%"
  },
  innersectionText: {
      fontWeight: '600',
      fontSize: 15
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  top_image: {
    top: -30,
    left: "30%"
  },
  bottom_image: {
    bottom: -30,
    right: "15%"
  }
});

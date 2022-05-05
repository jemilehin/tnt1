import React, { useState } from "react";
import Toast from "react-native-root-toast";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  ToastAndroid,
  TextInput,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../Constant/Color.json";
import {
  SignUpRequest,
  StartVerification,
} from "../../Redux/Member/actions";

import { AuthContext } from "../context";
import { Indicator } from "../Indicator";

export default function LoginPassword(props) {
  const [user, setUser] = React.useState({});
  const [OTP, setOTP] = React.useState();
  const [validId, setValidid] = React.useState("");
  const [profileImg, setProfileImage] = React.useState("");
  const [numberVerified, setVerification] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const { signUp } = React.useContext(AuthContext);

  const passUser = async (data) => {
    console.log("dataUser", data);
    await AsyncStorage.setItem("user", data);
  };

  // const errcallback = (response) => {
    // To-do: when response is unsuccessfull setOtpIsSent to "false"
    // console.log("error", response);
  // };

  // const smsCallback = (response) => {
    // props.setLoading(false);
    // setOTPsent to true
    // props.signUpUser only and set
    //  in api call register user and 
  // };

  const ResendOtp = () => {
    alert("Click send code button to resend OTP")
    // if (props.password === "") {
    //   return Toast.show("Password field is empty.", {
    //     duration: Toast.durations.SHORT,
    //   });
    // } else {
    //   StartVerification(`+234${user.phone}`, smsCallback, errcallback);
    // }
  };

  return (
    <View style={{height: "100%", position: "relative"}}>
      <View style={styles.otpSection}>
        <Text
          style={[
            styles.otpTextCenter,
            { fontSize: 35, letterSpacing: 1, fontWeight: "500" },
          ]}
        >
          OTP Verification
        </Text>
        <Text
          style={[
            styles.otpTextCenter,
            { width: "85%", left: "5%", fontSize: 16, fontWeight: "100" },
          ]}
        >
          A 6-code digit has been sent to your mobile number
        </Text>
      </View>

      <View style={{ position: "relative", top: "25%" }}>
        {props.loading ? (
          <ActivityIndicator
            style={{ top: -35, position: "absolute", left: "45%" }}
            color={colors.SECONDARY_COLOR_VARIANT}
            size="large"
          />
        ) : null}
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 20,
          }}
        >
          Enter OTP
        </Text>
        <TextInput
          mode="outlined"
          maxLength={6}
          outlineColor="transparent"
          keyboardType="numeric"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(otp) => {
              props.setOtp(otp);
          }}
        />
        <View
          style={{
            position: "relative",
            top: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 15, top: 3 }}>Didn't get code? </Text>
          <Text
            style={{
              color:
                props.isOtpSent === null
                  ? "grey"
                  : !props.isOtpSent
                  ? colors.TEXT_BUTTON_COLOR
                  : "grey",
              fontSize: 15,
              padding: 3,
            }}
            onPress={() => ResendOtp()}
          >
            Resend
          </Text>
        </View>
      </View>
      <View style={{top: "58%", position: "relative"}}>
      <Indicator
        styles={{
          flexDirection: "row",
          justifyContent: "center",
        }}
        step={3}
        selected={props.selected+1}
        width={14}
      />
      {props.selected === 2 ? (
        <TouchableOpacity style={[styles.button]} onPress={() => {
          props.SignUpUser()
        }
          }>
          <Text
            style={{
              color: colors.NATURAL_COLOR.white,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            {!props.isOtpSent ? "Send Code" : "Submit"}
          </Text>
        </TouchableOpacity>
      ) : null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  innerContainer: {
    top: "22%",
  },
  header: {
    fontSize: 20,
  },
  fonts: {
    fontWeight: "600",
  },
  textAttribute: {
    color: colors.NATURAL_COLOR.black,
    fontSize: 15,
  },
  inputContainer: {
    position: "relative",
    top: "25%",
  },
  input: {
    height: 40,
    padding: 5,
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
  otpSection: {
    position: "relative",
    top: "15%",
  },
  otpTextCenter: {
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    position: "relative",
    // left: "25%",
    // width: "70%",
    // height: 40,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 50,
    zIndex: 1000,
    paddingVertical: 10,
  },
});

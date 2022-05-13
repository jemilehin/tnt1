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
  Image
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPInputView from '@twotalltotems/react-native-otp-input';

import colors from "../../Constant/Color.json";
import {
  SignUpRequest,
  StartVerification,
} from "../../Redux/Member/actions";
import { Indicator } from "../Indicator";

export default function LoginPassword(props) {
  const [OTP, setOTP] = React.useState();
  const [validId, setValidid] = React.useState("");
  const [profileImg, setProfileImage] = React.useState("");
  const [numberVerified, setVerification] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

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
      <View style={{flexDirection: "row" ,justifyContent: "center", top: "25%"}}>
        <Image style={{width: 220, height: 180}}  source={require("../../assets/images/OTP_page.png")} />
      </View>
      <View style={styles.otpSection}>
        <Text
          style={[
            styles.otpTextCenter,
            { fontSize: 28, letterSpacing: 1, fontWeight: "700" },
          ]}
        >
          OTP Verification
        </Text>
        <Text
          style={[
            styles.otpTextCenter,
            {fontSize: 15, fontWeight: "100", textAlign: "center" },
          ]}
        >
          {props.phone !== "" ? `Code will be sent to ${props.phone}` : "Enter your phone number to get OTP Code"}
        </Text>
      </View>

      <View style={{ position: "relative", top: "28%" }}>
        {props.loading ? (
          <ActivityIndicator
            style={{ top: -35, position: "absolute", left: "45%" }}
            color={colors.SECONDARY_COLOR_VARIANT}
            size="large"
          />
        ) : null}
        {/* <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 20,
            color: colors.SECONDARY_COLOR
          }}
        >
          Enter OTP
        </Text> */}
        <OTPInputView
          pinCount={6}
          style={[styles.input, styles.layoutStyle]}
          codeInputFieldStyle={styles.underlineStyleBase}
          onCodeFilled={(otp) => {
              props.setOtp(otp);
          }}
        />
        <View
          style={{
            position: "relative",
            top: 25,
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
      <View style={{top: "27%", position: "relative"}}>
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
    height: "20%",
  },
  otpSection: {
    position: "relative",
    top: "23%",
  },
  otpTextCenter: {
    textAlign: "center",
    color: colors.PRIMARY_COLOR
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
  underlineStyleBase: {
    width: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: colors.PRIMARY_COLOR,
    borderBottomColor: colors.PRIMARY_COLOR,
  }
});

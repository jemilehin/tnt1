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
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../Constant/Color.json";
import {
  CheckVerification,
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

  let OTPLenght = String(OTP).length;

  //  async () => {
  //   try {
  //     const state = await AsyncStorage.getItem("state");
  //     const lga = await AsyncStorage.getItem("lga");
  //     const ward = await AsyncStorage.getItem("ward");
  //     const polling_unit = await AsyncStorage.getItem("polling_unit");
  //     const address = await AsyncStorage.getItem("address");
  //     const profile = await AsyncStorage.getItem("profile_img");
  //     const id_card = await AsyncStorage.getItem("id_card");
  //     const fullname = await AsyncStorage.getItem("fullname");
  //     const mobile_num = await AsyncStorage.getItem("mobile_num");
  //     const email = await AsyncStorage.getItem("email");
  //     const gender = await AsyncStorage.getItem("gender");
  //     const password = await AsyncStorage.getItem("password");
  //     console.log(mobile_num)

  //     setProfileImage(profile);
  //     setValidid(id_card);
  //     setUser({
  //       ...user,
  //       fullname: fullname,
  //       phone: mobile_num,
  //       email: email,
  //       gender: gender,
  //       state: state,
  //       lg: lga,
  //       ward: ward,
  //       polling_unit: polling_unit,
  //       address: address,
  //       img: profile,
  //       validId: id_card,
  //       password: password,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // console.log(selected)

  // selected === 2 ? callLocalStorage() : null

  // const formData = new FormData();
  // formData.append("fullname", user.fullname);
  // formData.append("state", user.state);
  // formData.append("phone", user.phone);
  // formData.append("email", user.email);
  // formData.append("gender", user.gender);
  // formData.append("lg", user.lg);
  // formData.append("ward", user.ward);
  // formData.append("pollingUnit", user.polling_unit);
  // formData.append("address", user.address);
  // formData.append("img", user.img);
  // formData.append("validId", user.validId);
  // formData.append("password", user.password);

  // const SignUpUser = () => {
  //   if (user.fullname === null) {
  //     return ToastAndroid.show("Your fullname is required", ToastAndroid.SHORT);
  //   }
  //   if (user.phone === null) {
  //     return ToastAndroid.show(
  //       "Your mobile number is required",
  //       ToastAndroid.SHORT
  //     );
  //   }
  //   if (user.email === null) {
  //     return ToastAndroid.show("Your email is required", ToastAndroid.SHORT);
  //   }
  //   if (user.gender === null) {
  //     return ToastAndroid.show("Your gender is required", ToastAndroid.SHORT);
  //   }
  //   // if (user.state === null) {
  //   //   return ToastAndroid.show("State is required", ToastAndroid.SHORT);
  //   // }
  //   // if (user.lg === null) {
  //   //   return ToastAndroid.show("LGA is required", ToastAndroid.SHORT);
  //   // }
  //   // if (user.ward === null) {
  //   //   return ToastAndroid.show("Your ward is required", ToastAndroid.SHORT);
  //   // }
  //   // if (user.polling_unit === null) {
  //   //   return ToastAndroid.show("Polling unit is required", ToastAndroid.SHORT);
  //   // }
  //   if (user.address === null) {
  //     return ToastAndroid.show("Your address is required", ToastAndroid.SHORT);
  //   }
  //   if (user.password === null) {
  //     return ToastAndroid.show("Set a password", ToastAndroid.SHORT);
  //   } else {
  //     if (!isOtpSent) {
  //       StartVerification(`+234${user.phone}`, smsCallback, errcallback)
  //       // return Toast.show("Verify mobile number.", {
  //       //   duration: Toast.durations.SHORT,
  //       // });
  //     } else {
  //       if (OTPLenght === 6) {
  //         CheckVerification(`+234${user.phone}`, OTP, VerifyCallback);
  //         setLoading(true);
  //       } else {
  //         return Toast.show(
  //           "Type the 6 digit OTP code sent to your phone number",
  //           {
  //             duration: Toast.durations.SHORT,
  //           }
  //         );
  //       }
  //     }
  //   }
  // };

  const deleteAsyncData = async () => {
    let keys;
    try {
      keys = await AsyncStorage.multiGet([
        "state",
        "lga",
        "ward",
        "polling_unit",
        "address",
        "profile_img",
        "id_card",
        "fullname",
        "mobile_num",
        "email",
        "gender",
        "password",
      ]);
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      // read key error
      console.log(e);
    }
  };

  const callback = (response) => {
    if (response.message === "User successfully registered") {
      deleteAsyncData();
      signUp();
      setLoading(false);
      passUser(JSON.stringify(response.user));
    }
    setLoading(false);
  };

  const passUser = async (data) => {
    console.log("dataUser", data);
    await AsyncStorage.setItem("user", data);
  };

  const errorCallback = (response) => {
    console.log("response error:", response);
    setLoading(false);
  };

  const VerifyCallback = (response) => {
    console.log("success", response.success);
    if (response.success) {
      SignUpRequest(formData, callback, errorCallback);
      setVerification(true);
    } else {
      setVerification(false);
      setLoading(false);
      setOTP("");
    }
  };

  const smsCallback = (response) => {
    // console.log(response.success);
    // To-do: when response is successfull setOtpIsSent to "true"
    if (response.success) {
      setOtpIsSent(true);
    } else {
      Toast.show("Please provide a valid mobile number.", {
        duration: Toast.durations.SHORT,
      });
    }
  };

  const errcallback = (response) => {
    // To-do: when response is unsuccessfull setOtpIsSent to "false"
    console.log("error", response);
    Toast.show("Bad network.", {
      duration: Toast.durations.SHORT,
    });
  };

  // setTimeout(()=> {
  //   StartVerification(`+234${user.phone}`, smsCallback, errcallback);
  // },2000)

  // selected === 2 ? StartVerification(`+234${user.phone}`, smsCallback, errcallback) : null

  const ResendOtp = () => {
    if (user.password === null || String(user.password).length < 6) {
      return Toast.show("Password field is empty.", {
        duration: Toast.durations.SHORT,
      });
    } else {
      StartVerification(`+234${user.phone}`, smsCallback, errcallback);
    }
  };

  return (
    <View>
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

      <View style={{ position: "relative", top: "70%" }}>
        {loading ? (
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
          value={String(user.password).length < 6 ? "" : OTP}
          outlineColor="transparent"
          keyboardType="numeric"
          // editable={OTPLenght === 6 ? false : true}
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
                isOtpSent === null
                  ? "grey"
                  : !isOtpSent
                  ? colors.TEXT_BUTTON_COLOR
                  : "grey",
              fontSize: 15,
              padding: 3,
            }}
            onPress={() => {
              isOtpSent === null
                ? console.log("pressed")
                : isOtpSent
                ? alert("OTP has already being sent")
                : ResendOtp();
            }}
          >
            Resend
          </Text>
        </View>
      </View>
      <Indicator
        styles={{
          flexDirection: "row",
          justifyContent: "center",
          top: Dimensions.get("screen").height * 0.51,
        }}
        step={3}
        selected={props.selected+1}
        width={14}
      />
      {props.selected === 2 ? (
        <TouchableOpacity style={[styles.button]} onPress={props.SignUpUser}>
          <Text
            style={{
              color: colors.NATURAL_COLOR.white,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            {!props.isOtpSent ? "Verify" : "Continue"}
          </Text>
        </TouchableOpacity>
      ) : null}
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
    top: "40%",
  },
  otpTextCenter: {
    textAlign: "center",
  },
  button: {
    position: "relative",
    top:
      Dimensions.get("screen").height < 650
        ? 270
        : Dimensions.get("screen").height / 1.86,
    // left: "25%",
    // width: "70%",
    // height: 40,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 50,
    zIndex: 1000,
    paddingVertical: 10,
  },
});

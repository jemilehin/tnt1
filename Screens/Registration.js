import * as React from "react";
import Toast from "react-native-root-toast";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,KeyboardAvoidingView,Keyboard
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PagerView from "react-native-pager-view";
import { Indicator } from "../Component/Indicator";
import { BasicInfo } from "../Component/Formstep/BasicInfo";
import LoginPassword from "../Component/Formstep/LastStep";
import ResidentAddress from "../Component/Formstep/ResidentAdress";

import colors from "../Constant/Color.json";

import { AuthContext } from "../Component/context";
import { Header } from "../Component/HeaderBack";
import { SignUpRequest } from "../Redux/Member/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormPages = (props) => {
  return (
    <PagerView
      ref={props.pager}
      style={{ flex: 1 }}
      initialPage={0}
      pageMargin={10}
      onPageScroll={(e) => props.setSelected(e.nativeEvent.position + 1)}
    >
      <View key="1">
        <BasicInfo
          setFullname={props.setFullname}
          setNumber={props.setNumber}
          setEmail={props.setEmail}
          setGender={props.setGender}
          setPassword={props.setPassword}
        />
      </View>
      <View key="2">
        <ResidentAddress
          setStateValue={props.setStateValue}
          setLgaValue={props.setLgaValue}
          setWardValue={props.setWardValue}
          setPollingUnitValue={props.setPollingUnitValue}
          setAddressValue={props.setAddressValue}
          setImageSrc={props.setImageSrc}
          setIDSrc={props.setIDSrc}
          selected={props.selected - 1}
        />
      </View>
      {/* <View key="3">
        <LoginPassword isOtpSent={props.isOtpSent} setOtpIsSent={props.setOtpIsSent} SignUpUser={props.SignUpUser} setOtp={props.setOtp} selected={props.selected - 1} />
      </View> */}
    </PagerView>
  );
};

const buttonPostion =
  Dimensions.get("screen").height < 650
    ? Math.round((2 / 100) * Dimensions.get("window").height)
    : Math.round((40 / 100) * Dimensions.get("window").height);
const buttonPositionInPercentValue = Math.round(
  (-5 / 100) * Dimensions.get("screen").height
);

export default function Registration({ navigation }) {

  const { signUp } = React.useContext(AuthContext);

  const [selected, setSelected] = React.useState(1);
  const [fullname, setFullname] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [stateValue, setStateValue] = React.useState("");
  const [lgaValue, setLgaValue] = React.useState("");
  const [polling_unit, setPollingUnitValue] = React.useState("");
  const [wardValue, setWardValue] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState("");
  const [idSrc, setIDSrc] = React.useState("");
  const [OTP, setOtp] = React.useState("");
  const [isOtpSent, setOtpIsSent] = React.useState(false);
  const pagerView = React.useRef(0);

  // console.log(OTP)
  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("state", stateValue);
  formData.append("phone", number);
  formData.append("email", email);
  formData.append("gender", gender);
  formData.append("lg", lgaValue);
  formData.append("ward", wardValue);
  formData.append("pollingUnit", polling_unit);
  formData.append("address", addressValue);
  formData.append("img", imageSrc);
  formData.append("validId",idSrc);
  formData.append("password", password);
  formData.append("password_confirmation", password)

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
    console.log(response)
    if (response.message === "User successfully registered") {
      deleteAsyncData();
      signUp();
      // setLoading(false);
      passUser(JSON.stringify(response.user));
    }
    // setLoading(false);
  };

  const passUser = async (data) => {
    console.log("dataUser", data);
    await AsyncStorage.setItem("user", data);
  };

  const errorCallback = (response) => {
    console.log("response error:", response);
    // setLoading(false);
  };
  // console.log(formData)

  const SignUpUser = () => {
    // console.log("here")
    if (fullname === null) {
      return ToastAndroid.show("Your fullname is required", ToastAndroid.SHORT);
    }
    if (number === null) {
      return ToastAndroid.show(
        "Your mobile number is required",
        ToastAndroid.SHORT
      );
    }
    if (email === null) {
      return ToastAndroid.show("Your email is required", ToastAndroid.SHORT);
    }
    if (gender === null) {
      return ToastAndroid.show("Your gender is required", ToastAndroid.SHORT);
    }
    // if (state === null) {
    //   return ToastAndroid.show("State is required", ToastAndroid.SHORT);
    // }
    // if (lg === null) {
    //   return ToastAndroid.show("LGA is required", ToastAndroid.SHORT);
    // }
    // if (ward === null) {
    //   return ToastAndroid.show("Your ward is required", ToastAndroid.SHORT);
    // }
    // if (polling_unit === null) {
    //   return ToastAndroid.show("Polling unit is required", ToastAndroid.SHORT);
    // }
    if (addressValue === null) {
      return ToastAndroid.show("Your address is required", ToastAndroid.SHORT);
    }
    if (password === null) {
      return ToastAndroid.show("Set a password", ToastAndroid.SHORT);
    } else {
      // console.log("here")
      SignUpRequest(formData, callback, errorCallback);
      // ToDo: start verification if isOtpSent is "false"
      // then is smsCallback setOTPSent to "true" to overide
      // condition.
      // if (!isOtpSent) {
      //   StartVerification(`+234${user.phone}`, smsCallback, errcallback)
      //   // return Toast.show("Verify mobile number.", {
      //   //   duration: Toast.durations.SHORT,
      //   // });
      // } else {
      //   if (OTPLenght === 6) {
      //     CheckVerification(`+234${number}`, OTP, VerifyCallback);
      //     setLoading(true);
      //   } else {
      //     return Toast.show(
      //       "Type the 6 digit OTP code sent to your phone number",
      //       {
      //         duration: Toast.durations.SHORT,
      //       }
      //     );
      //   }
      // }
    }
  };

  const next = (index) => {
    pagerView.current.setPage(index);
  };

  Header("LEFT", navigation, colors.PRIMARY_COLOR);
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  },[])
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  return (
    <View style={styles.container}>
      <FormPages
        setFullname={setFullname}
        setNumber={setNumber}
        setEmail={setEmail}
        setGender={setGender}
        setPassword={setPassword}
        setStateValue={setStateValue}
        setLgaValue={setLgaValue}
        setWardValue={setWardValue}
        setPollingUnitValue={setPollingUnitValue}
        setAddressValue={setAddressValue}
        setImageSrc={setImageSrc}
        setIDSrc={setIDSrc}
        setOtp={setOtp}
        pager={pagerView}
        next={next}
        setSelected={setSelected}
        selected={selected}
        setOtpIsSent={setOtpIsSent}
        isOtpSent={isOtpSent}
        SignUpUser={() => SignUpUser()}
      />
      <View
        style={[
          styles.buttonWrapper,
          {
            top: selected !== 3 ? buttonPositionInPercentValue : buttonPostion,
          },
        ]}
      >
        {keyboardStatus ? null : <><Indicator step={2} selected={selected} width={14} />
        <View>
          {selected !== 2 ? (
            <TouchableOpacity
              style={[styles.button, { flex: selected !== 1 ? 2 : null }]}
              onPress={() => {
                next(selected);
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            SignUpUser()
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>}
        </View></>}
      </View>
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
  buttonWrapper: {
    position: "relative",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.PRIMARY_COLOR,
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: colors.NATURAL_COLOR.white,
    fontSize: 20,
    fontWeight: "500",
  },
});

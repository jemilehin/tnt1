import * as React from "react";
import Toast from "react-native-root-toast";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
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
import {
  CheckVerification,
  StartVerification,
  SignUpRequest,
} from "../Redux/Member/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormPages = (props) => {
  return (
    <PagerView
      ref={props.pager}
      style={{ height: "100%" }}
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
          loading={props.loading}
        />
      </View>
      <View key="3">
        <LoginPassword
          isOtpSent={props.isOtpSent}
          setOtpIsSent={props.setOtpIsSent}
          SignUpUser={props.SignUpUser}
          setOtp={props.setOtp}
          selected={props.selected - 1}
          phone={props.phone}
        />
      </View>
    </PagerView>
  );
};

const buttonPostion =
  Dimensions.get("screen").height < 650
    ? Math.round((2 / 100) * Dimensions.get("window").height)
    : Math.round((40 / 100) * Dimensions.get("window").height);
const buttonPositionInPercentValue = Math.round(
  (-12 / 100) * Dimensions.get("screen").height
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
  const [loading, setLoading] = React.useState(false);
  const [isCodeVerified, setCodeIsVerified] = React.useState(false);

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
  formData.append("validId", idSrc);
  formData.append("password", password);
  formData.append("password_confirmation", password);

  const passUser = async (data) => {
    console.log("dataUser", data);
    // await AsyncStorage.setItem("user", data);
  };

  const SignUpUser = () => {
    if (fullname === "") {
      return Toast.show("Your fullname is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (number === "") {
      return Toast.show("Your mobile number is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (email === "") {
      return Toast.show("Your email is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (gender === "") {
      return Toast.show("Your gender is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (stateValue === "") {
      return Toast.show("State is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (lgaValue === "") {
      return Toast.show("LGA is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (wardValue === "") {
      return Toast.show("Your ward is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (polling_unit === "") {
      return Toast.show("Polling unit is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (addressValue === null) {
      return Toast.show("Your address is required", {
        duration: Toast.durations.SHORT,
      });
    }
    if (password === null) {
      return Toast.show("Set a password", {
        duration: Toast.durations.SHORT,
      });
    } else {
      // SignUpRequest(formData, callback, errorCallback);
      // ToDo: start verification if isOtpSent is "false"
      // then is smsCallback setOTPSent to "true" to overide
      // condition
      setLoading(true);
      if (!isOtpSent) {
        // setLoading(true)
        StartVerification(`+234${number}`, smsCallback, errCallback);
        Toast.show("Wait while a code is being sent", {
          duration: Toast.durations.LONG,
        });
      } else {
        if (!isCodeVerified) {
          CheckVerification(`+234${number}`, OTP, VerifyCallback);
          // setLoading(true);
          Toast.show("Verifying Code!", {
            duration: Toast.durations.SHORT,
          });
        } else {
          // setLoading(true);
          SignUpRequest(formData, callback, errorCallback);
        }
      }
    }
  };

  // callback response if otp was successfull sent
  const smsCallback = (response) => {
    setOtpIsSent(response);
    setLoading(false);
  };

  // callback response when there is error sending otp code
  const errCallback = (response) => {
    Toast.show(String(response), {
      duration: Toast.durations.LONG,
    });
    setOtpIsSent(false);
    setLoading(false);
  };

  const next = (index) => {
    pagerView.current.setPage(index);
  };

  const callback = (response) => {
    setLoading(false);
    signUp();
  };

  const errorCallback = (response) => {
    setLoading(false);
    if (response.message === "500") {
      Toast.show("Email has been used", {
        duration: Toast.durations.LONG,
        position: Dimensions.get("screen").height * 0.7,
      });
    } else {
      Toast.show("Error connecting to server", {
        duration: Toast.durations.LONG,
        position: Dimensions.get("screen").height * 0.7,
      });
    }
  };

  // callback that verify input code
  const VerifyCallback = (response) => {
    if (response.success) {
      SignUpRequest(formData, callback, errorCallback);
      setCodeIsVerified(true);
    } else {
      setLoading(false);
      if (OTP.length !== 6) {
        Toast.show(String(response.message), {
          duration: Toast.durations.LONG,
        });
      } else {
        setOtpIsSent(false);
        Toast.show("Try resend OTP code", {
          duration: Toast.durations.LONG,
        });
      }
    }
  };

  Header("LEFT", navigation, colors.PRIMARY_COLOR);
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);
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
        loading={loading}
        phone={number}
      />

      {loading ? (
        <ActivityIndicator
          style={{
            top: Dimensions.get("screen").height * 0.4,
            position: "absolute",
            left: Dimensions.get("screen").width * 0.44,
          }}
          color={colors.SECONDARY_COLOR_VARIANT}
          size="large"
        />
      ) : null}
      <View
        style={[
          styles.buttonWrapper,
          {
            top: selected !== 3 ? buttonPositionInPercentValue : buttonPostion,
          },
        ]}
      >
        {keyboardStatus ? null : (
          <>
            <Indicator step={3} selected={selected} width={14} />
            <View>
              {selected !== 3 ? (
                <TouchableOpacity
                  style={[styles.button, { flex: selected !== 3 ? null : 1 }]}
                  onPress={() => {
                    next(selected);
                  }}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        )}
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

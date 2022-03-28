import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getApp } from "firebase/app";

import colors from "../../Constant/Color.json";
import { SignUpRequest } from "../../Redux/Member/actions";

import { AuthContext } from "../context";

export default function LoginPassword({navigation}) {
  const recaptchaVerifier = React.useRef(null);
  const [pass, setPass] = React.useState("");
  const [user, setUser] = React.useState({});
  const [OTP, setOTP] = React.useState();
  const [verificationId, setVerificationId] = React.useState();

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  const {signUp} = React.useContext(AuthContext);

  const stringOTP = String(OTP).length;

  const app = getApp()
  const auth = getAuth()

  const sendVerificationCode = async () => {
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        '+234'+user.phone,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      console.log('hello')
      showMessage({
        text: 'Verification code has been sent to your phone.',
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
  }

  const VerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        OTP
      );
      await signInWithCredential(auth, credential);
      showMessage({ text: 'Phone authentication successful 👍' });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
  }

  console.log('number','+234'+user.phone)

  React.useEffect(async () => {
      if(user.phone !== null){
      sendVerificationCode()
      }
    try {
      const state = await AsyncStorage.getItem("state");
      const lga = await AsyncStorage.getItem("lga");
      const ward = await AsyncStorage.getItem("ward");
      const polling_unit = await AsyncStorage.getItem("polling_unit");
      const address = await AsyncStorage.getItem("address");
      const profile = await AsyncStorage.getItem("profile_img");
      const id_card = await AsyncStorage.getItem("id_card");
      const fullname = await AsyncStorage.getItem("fullname");
      const mobile_num = await AsyncStorage.getItem("mobile_num");
      const email = await AsyncStorage.getItem("email");
      const gender = await AsyncStorage.getItem("gender");
      setUser({
        ...user,
        'fullname': fullname,
        'phone': mobile_num,
        'email': email,
        'gender': gender,
        'state': state,
        'lg': lga,
        'ward': ward,
        "polling_unit": polling_unit,
        'address': address,
        'img': profile,
        'validId': id_card,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (stringOTP === 6) {
    VerifyCode()
  }

  const formData = new FormData();
  formData.append("fullname", user.fullname);
  formData.append("phone", user.phone);
  formData.append("email", user.email);
  formData.append("gender", user.gender);
  formData.append("lg", user.lg);
  formData.append("ward", user.ward);
  formData.append("polling-unit", user.polling_unit);
  formData.append("address", user.address);
  formData.append("img", {uri: user.img,type: 'image/*'});
  formData.append("validId", {uri: user.validId, type: 'image/*'});
  formData.append("password", pass);
  formData.append("password_confirmation", pass);
  // console.log(user.img)

  const signUpUser = () => {
    SignUpRequest(formData,callback,errorCallback)
    // fetch()
  };

  const deleteAsyncData = async() => {
      let keys = []
      try {
        keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.multiRemove(keys)
      } catch(e) {
        // read key error
      }
  }

  const callback = (response) => {
    if(response){
      console.log("successfully registered")
      signUp()
      deleteAsyncData()
      console.log(response.body)
    }else{
      console.log(response)
    }
  }

  const errorCallback = (response) => {
    console.log('response error',response)
  }

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification
      /> 
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header, styles.fonts]}>Enter login password</Text>
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Password</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          defaultValue={pass}
          style={[styles.input, styles.layoutStyle]}
          // secureTextEntry={true}
          onChangeText={async (itemValue) => {
            setPass(itemValue);
            setUser({ ...user, password: itemValue });
          }}
        />
      </View>

      <View>
        <View style={styles.otpSection}>
          <Text
            style={[
              styles.otpTextCenter,
              { fontSize: 35, letterSpacing: 2, fontWeight: "500" },
            ]}
          >
            OTP Verification
          </Text>
          <Text
            style={[
              styles.otpTextCenter,
              { width: "85%", left: "5%", fontSize: 20, fontWeight: "100" },
            ]}
          >
            A code has been sent to your mobile number
          </Text>
        </View>

        <View style={{ position: "relative", top: 200 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}
          >
            Enter OTP
          </Text>
          <TextInput
            mode="outlined"
            outlineColor="transparent"
            keyboardType="numeric"
            editable={stringOTP === 6 ? false : true}
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(otp) => setOTP(otp)}
          />
          <View
            style={{
              position: "relative",
              top: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>Didn't get code? </Text>
            <Text style={{ color: colors.TEXT_BUTTON_COLOR, fontSize: 15 }}>
              resend
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.button]} onPress={() => signUpUser()}>
          <Text
            style={{
              color: colors.NATURAL_COLOR.white,
              paddingHorizontal: "24.7%",
              textAlign: "center",
              top: 6,
              fontSize: 20,
              fontWeight: "500"
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  innerContainer: {
    flexDirection: "column",
    top: 59,
  },
  header: {
    fontSize: 20,
    marginBottom: -2,
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
    top: 60,
    marginBottom: 28,
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
    top: 150,
  },
  otpTextCenter: {
    textAlign: "center",
  },
  button: {
    position: "relative",
    top: 345,
    left: "39%",
    width: "60%",
    height: 40,
    backgroundColor: colors.SECONDARY_COLOR,
    borderRadius: 5,
    zIndex: 1000
  },
});

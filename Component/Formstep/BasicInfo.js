import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from "../../Constant/Color.json";

export const BasicInfo = (props) => {
  const [gender, setGender] = React.useState("");
  const [fullname, setfullnameValue] = React.useState("")
  const [mobile_num, setMobileNum] = React.useState("")
  const [email, setEmailValue] = React.useState("")
  const [password, setPasswordValue] = React.useState("")

  // React.useEffect(async () => {
  //   try {
  //     const fullname = await AsyncStorage.getItem("fullname");
  //     const mobile_num = await AsyncStorage.getItem("mobile_num");
  //     const email = await AsyncStorage.getItem("email");
  //     const gender = await AsyncStorage.getItem("gender");
  //     const password = await AsyncStorage.getItem("password")
  //     console.log(password)
  //     setUser({
  //       ...user,
  //       fullname: fullname,
  //       mobile_num: mobile_num,
  //       email: email,
  //       gender: gender,
  //       password: password
  //     });
  //     setGender(gender);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1}}
    >
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header]}>Personal Details</Text>
        <Text
          style={[styles.descriptonText, { flexWrap: "wrap", width: "80%" }]}
        >
          Please provided valid details.
        </Text>
      </View>
      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Full Name</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          defaultValue={fullname}
          placeholder="Enter your surname first"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setFullname(value)
            setfullnameValue(value)
            // try {
            //   await AsyncStorage.setItem("fullname", value);
            // } catch (e) {
            //   console.log(e);
            // }
          }}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Mobile Number</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          textContentType="telephoneNumber"
          defaultValue={mobile_num}
          keyboardType="phone-pad"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setNumber(value)
            setMobileNum(value)
            // try {
            //   await AsyncStorage.setItem("mobile_num", value);
            // } catch (e) {
            //   console.log(e);
            // }
          }}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Email</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          textContentType="emailAddress"
          defaultValue={email}
          keyboardType="email-address"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setEmail(value)
            setEmailValue(value)
            // try {
            //   await AsyncStorage.setItem("email", value);
            // } catch (e) {
            //   console.log(e);
            // }
          }}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Password</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          defaultValue={password}
          // secureTextEntry={user.password !== null ? true : false}
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setPassword(value)
            setPasswordValue(value)
            // try {
            //   await AsyncStorage.setItem("password", value);
            // } catch (e) {
            //   console.log(e);
            // }
          }}
          placeholder="Not less than 6 character"
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Gender</Text>
        <Picker
          style={[styles.input, styles.layoutStyle]}
          selectedValue={gender}
          onValueChange={async (itemValue, itemIndex) => {
            // try {
            setGender(itemValue);
            props.setGender(itemValue)
            //   await AsyncStorage.setItem("gender", itemValue);
            // } catch (e) {
            //   console.log(e);
            // }
          }}
        >
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
        </Picker>
      </View>
      {/* </ScrollView>
      </SafeAreaView> */}
    </KeyboardAwareScrollView >
  );
};

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  innerContainer: {
    flexDirection: "column",
    top: "7%",
  },
  header: {
    fontSize: 25,
    fontWeight: "500"
  },
  fonts: {
    fontWeight: "600",
  },
  textAttribute: {
    color: colors.NATURAL_COLOR.black,
    fontSize: 15,
  },
  descriptonText: {
    color: colors.NATURAL_COLOR.black,
    fontSize: 15,
    fontWeight: "100"
  },
  inputContainer: {
    position: "relative",
    top: "9.5%",
    marginBottom: Dimensions.get("screen").height < 650 ? "8%" : "5%",
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
    elevation: 2,
    backgroundColor: "white",
  },
});

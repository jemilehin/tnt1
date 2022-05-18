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
  KeyboardAvoidingView,
  Platform
} from "react-native";import {
  IconButton,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from "../../Constant/Color.json";

export const BasicInfo = (props) => {
  const [gender, setGender] = React.useState("");
  const [fullname, setfullnameValue] = React.useState("")
  const [mobile_num, setMobileNum] = React.useState("")
  const [email, setEmailValue] = React.useState("")
  const [password, setPasswordValue] = React.useState("")
  const [hidePassword,setHidePassword] = React.useState(false)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header]}>Personal details</Text>
        <Text
          style={[styles.descriptonText, { flexWrap: "wrap", width: "80%",top:-5 }]}
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
          placeholder="Surname first"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setFullname(value)
            setfullnameValue(value)
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
          placeholder="Enter your Mobile Number"
          maxLength={11}
          keyboardType="phone-pad"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setNumber(value)
            setMobileNum(value)
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
          placeholder="Enter your Email Address"
          keyboardType="email-address"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setEmail(value)
            setEmailValue(value)
          }}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Password</Text>
        <View>
        <TextInput
          mode="outlined"
          secureTextEntry={hidePassword}
          outlineColor="transparent"
          defaultValue={password}
          placeholder="Choose a secure Password"
          maxLength={11}
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setPassword(value)
            setPasswordValue(value)
          }}
        /><IconButton
        style={{position: "absolute", right: "0%" }}
        icon={ password.length > 0 && hidePassword ? "eye" : "eye-off"}
        color={colors.PRIMARY_COLOR}
        size={20}
        onPress={() => hidePassword ? setHidePassword(false) : setHidePassword(true)}
      /></View>
      {password.length > 0 ? <Text style={{fontSize: 12}}>Min. of 6 Character</Text> : null}
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Gender</Text>
        <Picker
          style={[styles.input, styles.layoutStyle]}
          selectedValue={gender}
          onValueChange={async (itemValue, itemIndex) => {
            setGender(itemValue);
            props.setGender(itemValue)
          }}
        >
          <Picker.Item style={{color: colors.PRIMARY_COLOR}} label="Select Gender" value="" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
        </Picker>
      </View>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  innerContainer: {
    flexDirection: "column",
    top: "8%",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.PRIMARY_COLOR
  },
  fonts: {
    fontWeight: "700",
  },
  textAttribute: {
    color: colors.PRIMARY_COLOR,
    fontSize: 13,
    marginBottom: 10
  },
  descriptonText: {
    color: colors.PRIMARY_COLOR,
    fontSize: 15,
    fontWeight: "100"
  },
  inputContainer: {
    position: "relative",
    top: "9.5%",
    marginBottom: Dimensions.get("screen").height < 650 ? "8%" : "5%",
  },
  input: {
    padding: 8,
    // shadowColor: "#470000",
    backgroundColor: "#eff3f8",
  },
});

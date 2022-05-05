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
          maxLength={11}
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
          }}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={[styles.textAttribute, styles.fonts]}>Password</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          defaultValue={password}
          maxLength={11}
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => {
            props.setPassword(value)
            setPasswordValue(value)
          }}
          placeholder="Min. of 6 characters"
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
          <Picker.Item label="Select Gender" value="" />
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

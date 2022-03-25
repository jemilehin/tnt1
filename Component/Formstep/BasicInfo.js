import React from "react";
import { StoreData } from "../../helpers/AsynStorage";
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../Constant/Color.json";

export const BasicInfo = ({ step }) => {
  const [user, setUser] = React.useState({
    fullname: "",
    mobile_num: "",
    email: "",
    gender: "",
    state: "",
    lga: "",
    ward: "",
    polling_unit: "",
    address: "",
    profile_img: "",
    id_card: "",
  });
  const [gender, setGender] = React.useState("");


  React.useEffect(async () => {
    try {
    const fullname = await AsyncStorage.getItem('fullname')
    const mobile_num = await AsyncStorage.getItem('mobile_num')
    const email = await AsyncStorage.getItem('email')
    const gender = await AsyncStorage.getItem('gender')
    setUser({...user,
      'fullname': fullname,
      'mobile_num': mobile_num,
      'email': email,
      'gender': gender
    })
    setGender(gender)
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header]}>Registration</Text>
        <Text
          style={[styles.descriptonText, { flexWrap: "wrap", width: "80%" }]}
        >
          Please make sure all details provided are valid details of yourself.
        </Text>
      </View>
      <SafeAreaView style={{ height: 400, top: 55 }}>
        <ScrollView
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 100 }}
          contentOffset={{ x: 0, y: 50 }}
        >
          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Full name</Text>
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              defaultValue={user.fullname}
              placeholder="Enter your surname first"
              style={[styles.input, styles.layoutStyle]}
              onChangeText={async (value) => {
                try {
                  await AsyncStorage.setItem("fullname", value);
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </View>

          {/* <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>
              Middle name
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              style={[styles.input, styles.layoutStyle]}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
          </View> */}

          {/* <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Last name</Text>
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              style={[styles.input, styles.layoutStyle]}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
          </View> */}

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>
              Mobile number
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              textContentType="telephoneNumber"
              defaultValue={user.mobile_num}
              keyboardType="phone-pad"
              style={[styles.input, styles.layoutStyle]}
              onChangeText={async (value) => {
                try {
                  await AsyncStorage.setItem("mobile_num", value);
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </View>

          {/* <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>
              WhatsApp number
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              style={[styles.input, styles.layoutStyle]}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
          </View> */}

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Email</Text>
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              textContentType="emailAddress"
              defaultValue={user.email}
              keyboardType="email-address"
              style={[styles.input, styles.layoutStyle]}
              onChangeText={async (value) => {
                try {
                  await AsyncStorage.setItem("email", value);
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Gender</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={gender}
              onValueChange={async (itemValue, itemIndex) => {
                try {
                  setGender(itemValue);
                  await AsyncStorage.setItem("gender", itemValue);
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Male" value="male" />
            </Picker>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  innerContainer: {
    flexDirection: "column",
    top: 59,
  },
  header: {
    fontSize: 30,
    marginBottom: -2,
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
    fontWeight: "400",
    fontSize: 16,
  },
  inputContainer: {
    position: "relative",
    top: 60,
    marginBottom: 8,
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

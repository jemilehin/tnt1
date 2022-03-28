import React, { useEffect } from "react";
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
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../Constant/Color.json";

import states from "../../helpers/JSON/states.json";

export default function ResidentAddress() {
  const [user, setUser] = React.useState({});
  const [selectState, setSelectedState] = React.useState(null);
  const [selectedStatevalue, setSelectedStatevalue] = React.useState();
  const [lgas, setLgas] = React.useState(null);
  const [selectedLgas, setSelectedLgas] = React.useState();
  const [ward, setWard] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState();
  const [pollingUnit, setPolingUnit] = React.useState();
  const [isImageUploaded, setImageUploadedResult] = React.useState("pending");
  const [isIdCardUploaded, setIdCardUploadedResult] = React.useState("pending");

  const getUserData = async () => {
    try {
      const state = await AsyncStorage.getItem("state");
      const lga = await AsyncStorage.getItem("lga");
      const ward = await AsyncStorage.getItem("ward");
      const polling_unit = await AsyncStorage.getItem("polling_unit");
      const address = await AsyncStorage.getItem("address");
      const profile = await AsyncStorage.getItem("profile_img");
      const id_card = await AsyncStorage.getItem("id_card");
      // console.log('profile')
      setUser({
        ...user,
        "state": state,
        "lga": lga,
        "ward": ward,
        "polling_unit": polling_unit,
        "address": address,
        "profile_img": profile,
        "id_card": id_card,
      });
      // setSelectedStatevalue(state)
      // setSelectedLgas(lga)
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);
    if (!pickerResult.cancelled) {
      setImageUploadedResult("uploaded");
      await AsyncStorage.setItem('profile_img', pickerResult.uri)
    } else {
      setImageUploadedResult("cancelled");
      await AsyncStorage.removeItem('profile_img', pickerResult.uri)
    }
  };

  const pickIdCard = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);
    if (!pickerResult.cancelled) {
      setIdCardUploadedResult("uploaded");
      await AsyncStorage.setItem('id_card', pickerResult.uri)
    } else {
      setIdCardUploadedResult("cancelled");
      await AsyncStorage.removeItem('id_card', pickerResult.uri)
    }
  };

  return (
    <>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header, styles.fonts]}>Resident address</Text>
      </View>

      <SafeAreaView style={{ height: 450, top: 60 }}>
        <ScrollView
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          contentOffset={{ x: 0, y: 50 }}
        >
          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>State</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedStatevalue}
              onValueChange={async (itemValue, itemIndex) => {
                try {
                  setSelectedState(states[itemValue].lgas);
                  setSelectedStatevalue(itemValue);
                  await AsyncStorage.setItem("state", states[itemValue].name);
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Picker.Item
                label={user.state !== null ? user.state : "Select State"}
                value={"Select State"}
              />
              {states.map((state, index) => (
                <Picker.Item label={state.name} value={index} key={index} />
              ))}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>LGA</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedLgas}
              onValueChange={async (itemValue, itemIndex) => {
                try {
                  setLgas(selectState[itemValue].ward);
                  setSelectedLgas(itemValue);
                  await AsyncStorage.setItem(
                    "lga",
                    selectState[itemValue].name
                  );
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Picker.Item
                label={user.lga !== null ? user.lga : "Select LGA"}
                value="Select LGA"
              />
              {selectState !== null
                ? selectState.map((lgas, index) => (
                    <Picker.Item label={lgas.name} value={index} key={index} />
                  ))
                : null}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Ward</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedWard}
              onValueChange={async (itemValue, itemIndex) => {
                try {
                  setWard(lgas[itemValue].polling_unit);
                  setSelectedWard(itemValue);
                  await AsyncStorage.setItem("ward", lgas[itemValue].name);
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Picker.Item label={user.ward === "" ? "Select ward"  : user.ward} value="" />
              {lgas !== null
                ? lgas.map((ward, index) => (
                    <Picker.Item label={ward.name} value={index} key={index} />
                  ))
                : null}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>
              Polling Unit
            </Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={pollingUnit}
              onValueChange={async (itemValue, itemIndex) => {
                try {
                  setPolingUnit(itemValue);
                  // setSelectedWard(itemValue)
                  await AsyncStorage.setItem("polling_unit", ward[itemValue]);
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Picker.Item
                label={
                  user.polling_unit ? user.polling_unit : "Select polling unit"
                }
                value=""
              />
              {ward !== null
                ? ward.map((polling_unit, index) => (
                    <Picker.Item label={polling_unit} value={index} key={index} />
                  ))
                : null}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Address</Text>
            <TextInput
              style={[styles.input, styles.layoutStyle]}
              defaultValue={user.address}
              onChangeText={async (itemValue, itemIndex) => {
                try {
                  await AsyncStorage.setItem("address", itemValue);
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </View>

          <View style={{ top: 40 }}>
            <Text
              style={[styles.textAttribute, styles.fonts, { marginBottom: 4 }]}
            >
              Upload image
            </Text>
            <TouchableOpacity
              style={[styles.buttonPicker, { marginBottom: 10 }]}
              onPress={pickImage}
            >
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
            {isImageUploaded === "pending" ? null : isImageUploaded ===
              "uploaded" ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                style={{ marginLeft: 3 }}
                size={20}
                color={colors.SECONDARY_COLOR_VARIANT}
              />
            ) : (
              <Text style={{ fontSize: 10, top: -10, position: "relative" }}>
                Profile image not uploaded
              </Text>
            )}

            <Text
              style={[styles.textAttribute, styles.fonts, { marginBottom: 4 }]}
            >
              Upload PVC or Valid ID Card
            </Text>
            <TouchableOpacity style={styles.buttonPicker} onPress={pickIdCard}>
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
            {isIdCardUploaded === "pending" ? null : isIdCardUploaded ===
              "uploaded" ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                style={{ marginLeft: 3 }}
                size={20}
                color={colors.SECONDARY_COLOR_VARIANT}
              />
            ) : (
              <Text style={{ fontSize: 10, top: 1, position: "relative" }}>
                Id card not uploaded
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 2,
    backgroundColor: "white",
  },
  buttonPicker: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 1,
    textAlign: "center",
    padding: 12,
  },
});

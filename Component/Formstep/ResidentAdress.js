import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../Constant/Color.json";
import { URL } from "../../helpers/api";
import { Value } from "react-native-reanimated";

// import states from "../../helpers/JSON/states.json";

export default function ResidentAddress(props) {
  const [user, setUser] = React.useState({});
  const [selectState, setSelectedState] = React.useState(null);
  const [selectedStatevalue, setSelectedStatevalue] = React.useState();
  const [lgas, setLgas] = React.useState({});
  const [selectedLgas, setSelectedLgas] = React.useState(null);
  const [wards, setWard] = React.useState({});
  const [selectedWard, setSelectedWard] = React.useState(null);
  const [pollingUnit, setPolingUnit] = React.useState({});
  const [selectedPollingUnit, setSelectedPollingUnit] = React.useState();
  const [isImageUploaded, setImageUploadedResult] = React.useState("pending");
  const [isIdCardUploaded, setIdCardUploadedResult] = React.useState("pending");
  const [stateId, setStateId] = useState(null);
  const [states, setState] = useState({});
  // const []
  // const getUserData = async () => {
  //   try {
  //     const state = await AsyncStorage.getItem("state");
  //     const lga = await AsyncStorage.getItem("lga");
  //     const ward = await AsyncStorage.getItem("ward");
  //     const polling_unit = await AsyncStorage.getItem("polling_unit");
  //     const address = await AsyncStorage.getItem("address");
  //     const profile = await AsyncStorage.getItem("profile_img");
  //     const id_card = await AsyncStorage.getItem("id_card");
  //     // console.log('profile')
  //     setUser({
  //       ...user,
  //       state: state,
  //       lga: lga,
  //       ward: ward,
  //       polling_unit: polling_unit,
  //       address: address,
  //       profile_img: profile,
  //       id_card: id_card,
  //     });
  //     // setSelectedStatevalue(state)
  //     // setSelectedLgas(lga)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const getState = () => {
    fetch(`${URL}State`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setState(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    // getUserData();
    getState();
  }, []);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    let result = pickerResult.uri;
    if (!pickerResult.cancelled) {
      setImageUploadedResult("uploaded");
      props.setImageSrc(result)
      // await AsyncStorage.setItem("profile_img", result);
    } else {
      setImageUploadedResult("cancelled");
      props.setImageSrc("")
      // await AsyncStorage.removeItem("profile_img");
    }
  };

  const pickIdCard = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    let result = pickerResult.uri;
    const imageUri = result.replace("file:///data", "file:/data");
    if (!pickerResult.cancelled) {
      setIdCardUploadedResult("uploaded");
      props.setIDSrc(imageUri)
      // await AsyncStorage.setItem("id_card", imageUri);
    } else {
      setIdCardUploadedResult("cancelled");
      props.setIDSrc("")
      // await AsyncStorage.removeItem("id_card", imageUri);
    }
  };
  const stateArr = [];
  const lgaArray = [];
  const wardArray = [];
  const pollingUnitArr = []

  const refineState = () => {
    for (const state in states.State) {
      stateArr.push({ id: state, name: states.State[state] });
    }
  };
  props.selected === 1 ? refineState() : null;

  const getDataType = (value, type) => {
    // console.log(value)
    if (type === "STATE_TO_LGA") {
      console.log("state", type)
      stateArr.find((element) => {
        if (element.name === value) {
          fetch(`${URL}getLocalgovernments/${element.id}`, requestOptions)
            .then((res) => res.text())
            .then((lga) => setLgas(JSON.parse(lga)))
        }
      });
    }
    if (type === "LGA_TO_WARD") {
      console.log("lga", type)
      lgaArray.find((element) => {
        if (element.name === value) {
          fetch(`${URL}getWard/${element.id}`, requestOptions)
            .then((res) => res.text())
            .then((wards) => setWard(JSON.parse(wards)))
        }
      });
    }
    if (type === "WARD_TO_POLLINGUNIT") {
      console.log("ward", type)
      wardArray.find((element) => {
        if (element.name === value) {
          fetch(`${URL}getPollingunits/${element.id}`, requestOptions)
            .then((res) => res.text())
            .then((pu) => setPolingUnit(JSON.parse(pu)))
        }
      });
    }
  }

  // console.log("lg",lgaArray)

  const refineData = (data,type) => {
    // console.log(selectState.local_government)
    for (const item in data) {
      if(type === "LGA"){
        console.log(type,data[item])
       lgaArray.push({ id: item, name: data[item] });
      }
      if(type === "WARDS"){
        console.log(type,data[item])
        wardArray.push({ id: item, name: data[item] });
      }
      if(type === "PU"){
        console.log(type,data[item])
        pollingUnitArr.push({ id: item, name: data[item] });
      }
    }
  }
  // const refineWard = () => {
  //   for (const ward in wards.ward) {
  //     // console.log("lg",name)
  //     wardArray.push({ id: ward, name: wards.ward[lg] });
  //   }
  // }
  // const refinePollingUnit = () => {
  //   for (const pu in pollingUnit.PollingUnits) {
  //     // console.log("lg",name)
  //     pollingUnitArr.push({ id: pu, name: pollingUnit.PollingUnit[pu] });
  //   }
  // }
  selectedStatevalue !== null ? refineData(lgas.LocalGovernment, "LGA") : null
  selectedLgas !== null ? refineData(wards.ward,"WARDS") : null
  selectedWard !== null ? refineData(pollingUnit.PollingUnits, "PU") : null




  return (
    <>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header, styles.fonts]}>Resident address</Text>
      </View>

      <SafeAreaView style={{ height: "65%", top: 60 }}>
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
                // try {
                // console.log(itemValue);
                // setSelectedState(itemValue);
                
                // selectedStatevalue !== itemValue && lgaArray.length > 0 ? lgaArray = [] : console.log("none")
                props.setStateValue(itemValue)
                getDataType(itemValue, "STATE_TO_LGA");
                setSelectedStatevalue(itemValue);
                // user.state = itemValue;
                // Object.values(states.State)
                //   await AsyncStorage.setItem("state", itemValue);
                // } catch (e) {
                //   console.log(e);
                // }
              }}
            >
              <Picker.Item
                label={"Select State"}
                value={"Select State"}
              />
              {stateArr === null
                ? null
                : stateArr.map((state, index) => {
                  return (
                    <Picker.Item
                      label={state.name}
                      value={state.name}
                      key={index}
                    />
                  );
                })}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>LGA</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedLgas}
              onValueChange={(itemValue, itemIndex) => {
                // try {
                // setLgas(selectState[itemValue].ward);
                setSelectedLgas(itemValue);
                getDataType(itemValue, "LGA_TO_WARD");
                props.setLgaValue(itemValue)
                //   await AsyncStorage.setItem(
                //     "lga",
                // selectState[itemValue].name
                //   );
                // } catch (e) {
                //   console.log(e);
                // }
              }}
            >
              <Picker.Item
                label={"Select LGA"}
                value="Select LGA"
                enabled={false}
              />
              {lgaArray.length > 0
                ? lgaArray.map((lgas, index) => (
                  <Picker.Item label={lgas.name} value={lgas.name} key={index} />
                ))
                : <Picker.Item enabled={false} label={selectedStatevalue !== undefined ? `Loading ${selectedStatevalue} LGA...` : "You have to select a state"} value="" key="" />}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Ward</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedWard}
              onValueChange={async (itemValue, itemIndex) => {
                // try {
                // setWard(lgas[itemValue].polling_unit);
                getDataType(itemValue, "WARD_TO_POLLINGUNIT");
                setSelectedWard(itemValue);
                props.setWardValue(itemValue)
                //   await AsyncStorage.setItem("ward", lgas[itemValue].name);
                // } catch (e) {
                //   console.log(e);
                // }
              }}
            >
              <Picker.Item
                label="Select ward"
                value=""
                enabled={false}
              />
              {wardArray.length > 0
                ? wardArray.map((ward, index) => (
                  <Picker.Item label={ward.name} value={ward.name} key={index} />
                ))
                : <Picker.Item enabled={false} label={selectedLgas !== undefined ? `Loading ${selectedLgas} Wards...` : "You have to select a LGA"} value="" key="" />}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>
              Polling Unit
            </Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedPollingUnit}
              onValueChange={async (itemValue, itemIndex) => {
                // try {
                props.setPollingUnitValue(itemValue)
                setSelectedPollingUnit(itemValue);
                // setSelectedWard(itemValue)
                // await AsyncStorage.setItem("polling_unit", ward[itemValue]);
                // } catch (e) {
                //   console.log(e);
                // }
              }}
            >
              <Picker.Item
                label={
                  "Select polling unit"
                }
                value=""
              />
              {pollingUnitArr.length > 0 
                ? pollingUnitArr.map((polling_unit, index) => (
                  <Picker.Item
                    label={polling_unit}
                    value={index}
                    key={index}
                  />
                ))
                : <Picker.Item enabled={false} label={selectedWard !== undefined ? `Loading ${selectedWard} Polling unit...` : "You have not select Ward"} value="" key="" />}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Address</Text>
            <TextInput
              style={[styles.input, styles.layoutStyle]}
              defaultValue={user.address}
              onChangeText={async (itemValue, itemIndex) => {
                props.setAddressValue(itemValue)
                // try {
                //   await AsyncStorage.setItem("address", itemValue);
                // } catch (e) {
                //   console.log(e);
                // }
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
    top: "7%",
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

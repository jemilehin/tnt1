import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../Constant/Color.json";
import { URL } from "../../helpers/api";

// import states from "../../helpers/JSON/states.json";

export default function ResidentAddress(props) {
  const [user, setUser] = React.useState({});
  const [selectState, setSelectedState] = React.useState(null);
  const [selectedStatevalue, setSelectedStatevalue] = React.useState(null);
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

  //  response from api
  const [lgaResponse, setLgaResponse] = React.useState(null);

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
      props.setImageSrc(result);
      // await AsyncStorage.setItem("profile_img", result);
    } else {
      setImageUploadedResult("cancelled");
      props.setImageSrc("");
      // await AsyncStorage.removeItem("profile_img");
    }
  };

  const pickIdCard = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let result = pickerResult.uri;
    const imageUri = result.replace("file:///data", "file:/data");
    if (!pickerResult.cancelled) {
      setIdCardUploadedResult("uploaded");
      props.setIDSrc(imageUri);
    } else {
      setIdCardUploadedResult("cancelled");
      props.setIDSrc("");
    }
  };
  let stateArr = [];
  let lgaArray = [];
  let wardArray = [];
  let pollingUnitArr = [];

  const refineState = () => {
    for (const state in states.State) {
      stateArr.push({ id: state, name: states.State[state] });
    }
  };
  props.selected === 1 ? refineState() : null;


  const refineData = (data, type) => {
    for (const item in data) {
      if (type === "LGA") {
        lgaArray.push({ id: item, name: data[item] });
      }
      if (type === "WARDS") {
        wardArray.push({ id: item, name: data[item] });
      }
      if (type === "PU") {
        pollingUnitArr.push({ id: item, name: data[item]});
      }
    }
  };
  selectedStatevalue !== null ? refineData(lgas.LocalGovernment, "LGA") : "Do nothing";
  selectedLgas !== null ? refineData(wards.ward, "WARDS") : "Do nothing";
  selectedWard !== null ? refineData(pollingUnit.PollingUnits, "PU") : "Do nothing";
  const getDataType = (value, type) => {
    if (type === "STATE_TO_LGA") {
      lgaArray = [];
      wardArray = []
      pollingUnitArr = [];
      stateArr.find((element) => {
        if (element.name === value) {
          fetch(`${URL}getLocalgovernments/${element.id}`, requestOptions)
            .then((res) => res.text())
            .then((lga) => setLgas(JSON.parse(lga)));
        }
      });
      console.log(wardArray)
    }
    if (type === "LGA_TO_WARD") {
      wardArray = [];
      pollingUnitArr = [];
      lgaArray.find((element) => {
        if (element.name === value) {
          fetch(`${URL}getWard/${element.id}`, requestOptions)
            .then((res) => res.text())
            .then((wards) => setWard(JSON.parse(wards)));
        }
      });
    }
    if (type === "WARD_TO_POLLINGUNIT") {
      pollingUnitArr = [];
      wardArray.find((element) => {
        if (element.name === value) {
          fetch(`${URL}getPollingunits/${element.id}`, requestOptions)
            .then((res) => res.text())
            .then((pu) => setPolingUnit(JSON.parse(pu)));
        }
      });
    }
  };
  return (
    <>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header]}>Resident address</Text>
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
              onValueChange={(itemValue, itemIndex) => {
                props.setStateValue(itemValue);
                getDataType(itemValue, "STATE_TO_LGA");
                setSelectedStatevalue(itemValue);
              }}
            >
              <Picker.Item style={styles.pickerItem} label="Select State" value="Select State" />
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
                setSelectedLgas(itemValue);
                getDataType(itemValue, "LGA_TO_WARD");
                props.setLgaValue(itemValue);
              }}
            >
              <Picker.Item
                style={styles.pickerItem}
                label={"Select LGA"}
                value="Select LGA"
                enabled={false}
              />
              {lgaArray.length > 0 ? (
                lgaArray.map((lgas, index) => (
                  <Picker.Item
                    label={lgas.name}
                    value={lgas.name}
                    key={index}
                  />
                ))
              ) : (
                <Picker.Item
                  enabled={false}
                  label={
                    selectedStatevalue === undefined
                      ? "You have to select a state"
                      : lgaResponse === null
                      ? `Loading ${selectedStatevalue} LGA...`
                      : !lgaResponse
                      ? "No ward in selected LGA"
                      : ""
                  }
                  value=""
                  key=""
                />
              )}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Ward</Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedWard}
              onValueChange={(itemValue, itemIndex) => {
                getDataType(itemValue, "WARD_TO_POLLINGUNIT");
                setSelectedWard(itemValue);
                props.setWardValue(itemValue);
              }}
            >
              <Picker.Item style={styles.pickerItem} label="Select ward" value="" enabled={false} />
              {wardArray.length > 0 ? (
                wardArray.map((ward, index) => (
                  <Picker.Item
                    label={ward.name}
                    value={ward.name}
                    key={index}
                  />
                ))
              ) : (
                <Picker.Item
                  enabled={false}
                  label={
                    selectedLgas !== undefined
                      ? `Loading ${selectedLgas} Wards...`
                      : "You have to select a LGA"
                  }
                  value=""
                  key=""
                />
              )}
            </Picker>
          </View>

          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>
              Polling Unit
            </Text>
            <Picker
              style={[styles.input, styles.layoutStyle]}
              selectedValue={selectedPollingUnit}
              onValueChange={(itemValue, itemIndex) => {
                props.setPollingUnitValue(itemValue);
                setSelectedPollingUnit(itemValue);
              }}
            >
              <Picker.Item style={styles.pickerItem} label={"Select polling unit"} value="" />
              {pollingUnitArr.length > 0 ? (
                pollingUnitArr.map((polling_unit, index) => (
                  <Picker.Item  label={polling_unit.name} value={polling_unit.name} key={index} />
                ))
              ) : (
                <Picker.Item
                  enabled={false}
                  label={
                    selectedWard !== undefined
                      ? `Loading ${selectedWard} Polling unit...`
                      : "You have not select Ward"
                  }
                  value=""
                  key=""
                />
              )}
            </Picker>
          </View>
          <View style={[styles.inputContainer]}>
            <Text style={[styles.textAttribute, styles.fonts]}>Address</Text>
            <TextInput
              style={[styles.input, styles.layoutStyle]}
              placeholder="Enter your Address"
              onChangeText={async (itemValue, itemIndex) => {
                props.setAddressValue(itemValue);
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
              <Text style={styles.pickerItem}>Upload</Text>
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
              <Text style={styles.pickerItem}>Upload</Text>
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
  inputContainer: {
    position: "relative",
    top: 60,
    marginBottom: 28,
  },
  input: {
    height: 40,
    padding: 5,
    backgroundColor: "#eff3f8",
  },
  buttonPicker: {
    backgroundColor: "#eff3f8",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 1,
    textAlign: "center",
    padding: 12,
  },
  pickerItem:{
    color: colors.PRIMARY_COLOR
  }
});

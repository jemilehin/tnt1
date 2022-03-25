import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "react-native-image-picker";

import colors from "../Constant/Color.json";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export const MemberProfile = ({ navigation, route }) => {
  const [member, setMember] = React.useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => console.log("hi")}
          icon="shield-edit"
          size={30}
          color={colors.NATURAL_COLOR.white}
        />
      ),
    });
  }, [navigation]);

  const pickImage = async () => {
    await ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      setResult({ ...result, image: response });
    });
    console.log("image:", response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header, styles.fonts]}>
          You can update some of your personal details
        </Text>
      </View>

      <ScrollView
        style={{ width: "100%", position: 'relative', top: 50 }}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 150 }}
        contentOffset={{ x: 0, y: 50 }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image source={require("../assets/images/profile-avatar.png")} />
          <Text style={{fontSize: 25}}>ACT/64737/0001</Text>
          <Button title="View ID card" color={colors.SECONDARY_COLOR} />
        </View>
        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Full name</Text>
          <TextInput
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            defaultValue="Ajepe Ola"
            editable={false}
            // onChangeText={(value) => setUser({ ...user, name: value })}
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
            defaultValue="80801311356"
            editable={false}
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(value) => setUser({ ...user, name: value })}
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
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(value) => setUser({ ...user, name: value })}
            defaultValue="ajepeola@gmail.com"
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Gender</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            selectedValue="male"
            enabled={false}
            onValueChange={(itemValue, itemIndex) =>
              // setSelectedLanguage(itemValue)
              console.log("Gender is:", itemValue)
            }
          >
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>State</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            selectedValue="lagos"
            enabled={false}
          >
            <Picker.Item label="Select state" value="female" />
            <Picker.Item label="Lagos" value="lagos" />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>LGA</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            selectedValue="ikeja"
            enabled={false}
          >
            <Picker.Item label="Select LGA" />
            <Picker.Item label="Ikeja" value="ikeja" />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Ward</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            selectedValue="alausa"
            enabled={false}
          >
            <Picker.Item label="Select ward" />
            <Picker.Item label="Alausa" value="alausa" />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Polling Unit</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            selectedValue="secreteriat"
            enabled={false}
          >
            <Picker.Item label="Select polling unit" />
            <Picker.Item label="Secreteriat" value="secreteriat" />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Address</Text>
          <TextInput
            defaultValue="1 Obalende close off Ajepe Street"
            editable={false}
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(value) => setUser({ ...user, name: value })}
          />
        </View>

        <View style={styles.separator}></View>

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
            <Text style={styles.touchText}>Upload</Text>
          </TouchableOpacity>

          <Text
            style={[styles.textAttribute, styles.fonts, { marginBottom: 4 }]}
          >
            Upload PVC or Valid ID Card
          </Text>
          <TouchableOpacity style={styles.buttonPicker} onPress={pickImage}>
            <Text style={styles.touchText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => console.log("not getting text input yet")}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: -2,
    textAlign: "left",
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
    width: "100%",
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
  button: {
    alignItems: "center",
    backgroundColor: colors.SECONDARY_COLOR,
    padding: 10,
    borderRadius: 5,
    position: "relative",
    top: 80,
  },
  buttonText: {
    color: colors.NATURAL_COLOR.white,
    fontSize: 20,
    fontWeight: "500",
  },
  innerContainer: {
    flexDirection: "column",
    top: 30,
    zIndex: 100
  }
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,ActivityIndicator,Modal,Dimensions
} from "react-native";
import { IconButton } from "react-native-paper";
import { Snackbar } from 'react-native-paper';

import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import colors from "../Constant/Color.json";
import { memberProfileUpdate } from "../Redux/Member/actions";
import { Header } from "../Component/HeaderBack";

export const MemberProfile = ({ navigation, route }) => {
  const [member, setMember] = React.useState({});
  const [profileImg, setProfileImg] = React.useState(null);
  const [snackMessage, setSnackMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [isErr, setErr] = React.useState('Update Successful')

  React.useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => (
    //     <IconButton
    //       onPress={() => console.log("hi")}
    //       icon="shield-edit"
    //       size={30}
    //       color={colors.NATURAL_COLOR.white}
    //     />
    //   ),
    // });

    setMemberData()

  }, [navigation]);

  const setMemberData = ()=>{
    setMember(route.params.user)
    setProfileImg(route.params.user.img)
  }

  Header("LEFT",navigation,colors.NATURAL_COLOR.white)

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    let result = pickerResult.uri;
    if (!pickerResult.cancelled) {
        setProfileImg(result)
        setMember({...member, img: result})
    } else {
      console.log('response error')
    }
  };

  const updateProfile = () => {
    memberProfileUpdate(member,member.id,callback,errCalback)
    setLoading(true)
  }

  const writeData = async(data) => {
    setMember(JSON.parse(data))
    await AsyncStorage.setItem('user', data)
    setTimeout(() => setSnackMessage(false), 1500);
  }

  const callback = (response) => {
    if(response.status){
      setLoading(false)
      setSnackMessage(true)
      writeData(response.config.data)
    }
  }

  const errCalback = (err) => {
    console.log('err',err)
    setLoading(false)
    setSnackMessage(true)
    setErr('Update not successful')
    error()
  }

  const error = () => {
    setTimeout(() => setSnackMessage(false), 1500);
  }



  return (
    <SafeAreaView>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <Text style={[styles.header, styles.fonts]}>
          Profile
        </Text>
        <View style={{top: Dimensions.get("screen").height * 0.01}}>
            <View style={{
                position: "relative",
                top: 36,
                left: "28%",
                zIndex: 1000,
                backgroundColor: "#C2CEF1",
                width: '1%',
                borderRadius: 50,
                marginVertical: 0,
                marginHorizontal: 0
              }}>
            <IconButton
              onPress={() => pickImage()}
              icon="camera"
              size={18}
              color={colors.NATURAL_COLOR.white}
            />
            </View>
            <Image style={{ width: 132,
    height: 132,
    resizeMode: 'cover', borderRadius: 100}} source={profileImg === null ? require("../assets/images/profile-avatar.png") : {uri: profileImg}} />
          </View>
          <Text style={{ fontSize: 25 }}>ACT/64737/0001</Text>
      </View>

      <ScrollView
        style={[styles.container,{position: "relative", top: 5 }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 350 }}
        contentOffset={{ x: 0, y: 50 }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          {/* <Button title="View ID card" color={colors.SECONDARY_COLOR} /> */}
        </View>
        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Full name</Text>
          <TextInput
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            defaultValue={member ? member.fullname : ''}
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
            defaultValue={member ? member.phone: ''}
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(value) => setMember({ ...member, phone: value })}
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
            defaultValue={member ? member.email : ''}
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Gender</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            enabled={false}
            onValueChange={(itemValue, itemIndex) =>
              // setSelectedLanguage(itemValue)
              console.log("Gender is:", itemValue)
            }
          >
            <Picker.Item label={member ? member.gender : ''}/>
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>State</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            enabled={false}
          >
            <Picker.Item label={member ? member.state : ''} />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>LGA</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            enabled={false}
          >
            <Picker.Item label={member ? member.lg: ''} />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Ward</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            enabled={false}
          >
            <Picker.Item label={member ? member.ward : ''} />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Polling Unit</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            onValueChange={(itemValue, itemIndex) =>
              console.log("Gender is:", itemValue)
            }
            enabled={false}
          >
            <Picker.Item label={member ? member.pollingUnit: ''}    />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Address</Text>
          <TextInput
            defaultValue={member.address}
            // editable={false}
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(value) => setMember({ ...member, address: value })}
          />
        </View>

        <View style={styles.separator}></View>

        {/* <View style={{ top: 40 }}>
          <Text
            style={[styles.textAttribute, styles.fonts, { marginBottom: 4 }]}
          >
            Upload PVC or Valid ID Card
          </Text>
          <TouchableOpacity style={styles.buttonPicker} onPress={pickImage}>
            <Text style={styles.touchText}>Upload</Text>
          </TouchableOpacity>
        </View> */}

        <View>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => updateProfile()}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading ? <ActivityIndicator style={{top: Dimensions.get('screen').height/1.5, position: 'absolute', left: "45%"}} color={colors.SECONDARY_COLOR_VARIANT} size="large" /> : <Snackbar
          visible={snackMessage}
          onDismiss={() => setSnackMessage(false)}
          style={{backgroundColor: colors.TEXT_BUTTON_COLOR}}
        >
          <View><Text>{isErr}</Text></View>
        </Snackbar>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  container: {
    // flex: 1,
    // alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: -2,
    textAlign: "left",
    color: colors.NATURAL_COLOR.white,
    fontWeight: "bold"
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
    // top: "3%",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.PRIMARY_COLOR,
    width: "100%",
    paddingTop: "10%"
  },
});

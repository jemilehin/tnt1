import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { IconButton } from "react-native-paper";
import SnackBar from "react-native-snackbar-component";

import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

import colors from "../Constant/Color.json";
import { memberProfileUpdate } from "../Redux/Member/actions";
import { Header } from "../Component/HeaderBack";
import { Input } from "../Component/Input";

const MemberProfile = ({ navigation, route, user }) => {
  const [member, setMember] = React.useState(user);
  const [profileImg, setProfileImg] = React.useState(null);
  const [snackMessage, setSnackMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isErr, setErr] = React.useState("Update Successful");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          icon="back"
          size={30}
        />
      )
    });
  }, [navigation]);

  Header("LEFT", navigation, colors.NATURAL_COLOR.white);

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    let result = pickerResult.uri;
    if (!pickerResult.cancelled) {
      setProfileImg(result);
      setMember({ ...member, img: result });
    } else {
      console.log("response error");
    }
  };

  const updateProfile = () => {
    memberProfileUpdate(member, member.id, callback, errCalback);
    setLoading(true);
  };

  const callback = (response) => {
    if (response.status) {
      setLoading(false);
      setSnackMessage(true);
    }
  };

  const errCalback = (err) => {
    setLoading(false);
    setSnackMessage(true);
    setErr("Update not successful");
    error(err);
  };

  const error = () => {
    setTimeout(() => {
      setSnackMessage(false)}, 1500);
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.NATURAL_COLOR.white}}>
      <View style={[styles.innerContainer, styles.layoutStyle]}>
        <View style={{ position: "relative",}}>
          <View
            style={{
              position: "relative",
              top: 10,
              left: "28%",
              zIndex: 1000,
              backgroundColor: "#C2CEF1",
              width: "1%",
              borderRadius: 50,
              marginVertical: 0,
              marginHorizontal: 0,
            }}
          >
            <IconButton
              onPress={() => pickImage()}
              icon="camera"
              size={18}
              color={colors.NATURAL_COLOR.white}
            />
          </View>
          <Image
            style={{
              width: 132,
              height: 132,
              resizeMode: "cover",
              borderRadius: 100,
              backgroundColor: colors.NATURAL_COLOR.white,
              top: -25
            }}
            source={
              profileImg === null
                ? require("../assets/images/profile-avatar.png")
                : { uri: profileImg }
            }
          />
        </View>
        {/* <Text style={{ fontSize: 25 }}>ACT/64737/0001</Text> */}
      </View>

      <ScrollView
        style={[styles.container, { position: "relative", top: 5 }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 350 }}
        contentOffset={{ x: 0, y: 50 }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          {/* <Button title="View ID card" color={colors.SECONDARY_COLOR} /> */}
        </View>
        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Full name</Text>
          <Input 
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            defaultValue={member ? member.fullname : ""}
            editable={false} 
            />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>
            Mobile number
          </Text>
          <Input
          defaultValue={member ? member.phone : ""}
          mode="outlined"
          outlineColor="transparent"
          style={[styles.input, styles.layoutStyle]}
          onChangeText={(value) => setMember({ ...member, phone: value })}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Email</Text>
          <Input
          mode="outlined"
          defaultValue={member ? member.email : ""}
          outlineColor="transparent"
          style={[styles.input, styles.layoutStyle]}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Gender</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            enabled={false}
          >
            <Picker.Item label={member ? member.gender : ""} />
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
            <Picker.Item label={member ? member.state : ""} />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>LGA</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            enabled={false}
          >
            <Picker.Item label={member ? member.lg : ""} />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Ward</Text>
          <Picker
            style={[styles.input, styles.layoutStyle]}
            enabled={false}
          >
            <Picker.Item label={member ? member.ward : ""} />
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
            <Picker.Item label={member ? member.pollingUnit : ""} />
          </Picker>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={[styles.textAttribute, styles.fonts]}>Address</Text>
          <Input
            defaultValue={member.address}
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(value) => setMember({ ...member, address: value })}
          />
        </View>

        <View style={styles.separator}></View>

        <View>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => updateProfile()}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{
            top: Dimensions.get("screen").height / 1.5,
            position: "absolute",
            left: "45%",
          }}
          color={colors.SECONDARY_COLOR_VARIANT}
          size="large"
        />
      ) : 
      null
      }
      <SnackBar
        visible={snackMessage}
        textMessage={isErr}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {user: state.reducers.user}
}

export default connect(mapStateToProps, null)(MemberProfile)

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 16,
    textAlign: "left",
    color: colors.NATURAL_COLOR.white,
    fontWeight: "bold",
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
    marginBottom: "5%",
    width: "100%",
  },
  input: {
    padding: 8,
    backgroundColor: "#eff3f8",
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
    backgroundColor: colors.PRIMARY_COLOR,
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
    // zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.PRIMARY_COLOR,
    width: "100%",
    paddingTop: "5%",
  },
});

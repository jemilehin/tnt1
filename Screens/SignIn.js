import React, { useState } from "react";

import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import colors from "../Constant/Color.json";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  console.log({email,password})

  const SignIn = () => {

  }


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{paddingBottom: 15}}>
          <Text style={[styles.textAttribute, styles.fonts]}>Email</Text>
          <TextInput
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View  style={{paddingTop: 15}}>
          <Text style={[styles.textAttribute, styles.fonts]}>Password</Text>
          <TextInput
            mode="outlined"
            outlineColor="transparent"
            style={[styles.input, styles.layoutStyle]}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>

      <View style={styles.buttonSection}>
          <TouchableOpacity style={[styles.button]}
            onPress={()=> SignIn()}
          >
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.innerSection}>
              <Text style={[{marginRight: 8}, styles.innersectionText]}>Forgot Password?</Text>
              <Text style={[{color: colors.TEXT_BUTTON_COLOR}, styles.innersectionText]}>reset</Text>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutStyle: {
    position: "relative",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.NATURAL_COLOR.white,
  },
  innerContainer: {
    top: 100,
  },
  buttonSection: {
    position: "relative",
    top: 250,
    alignItems: "center",
    flex: 1
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.SECONDARY_COLOR,
    paddingTop: 12,
    paddingBottom: 12,
    width: '100%',
    borderRadius: 5,
    marginBottom: 12
  },
  buttonText: {
    color: colors.NATURAL_COLOR.white,
    fontSize: 35,
    fontWeight: "700",
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
  textAttribute: {
    color: colors.NATURAL_COLOR.black,
    fontSize: 20,
    marginBottom: 10,
  },
  fonts: {
    fontWeight: "600",
  },
  innerSection: {
      flexDirection: "row",
      justifyContent: 'space-between',
  },
  innersectionText: {
      fontWeight: '600',
      fontSize: 15
  }
});

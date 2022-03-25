import * as React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BasicInfo } from "../Component/Formstep/BasicInfo";
import LoginPassword from "../Component/Formstep/LastStep";
import ResidentAddress from "../Component/Formstep/ResidentAdress";

import colors from "../Constant/Color.json";
// import { user } from "../ReduxStore/Reducers/user";

import { AuthContext } from "../Component/context";

// function to show progress of form steps
const Indicator = ({ step, selected }) => {
  let i = 0;
  let indicators = [];
  for (i; i < step; i++) {
    indicators.push(i + 1);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "12%",
        }}
      >
        {indicators.map((item, index) => (
          <View
            key={index}
            style={{
              borderRadius: 5,
              height: 8,
              backgroundColor: colors.NATURAL_COLOR.black,
              width: item === selected ? 13 : 8,
            }}
          />
        ))}
      </View>
    </View>
  );
};

const buttonPostion = Math.round(
  (42.9 / 100) * Dimensions.get("window").height
);

const buttonPositionInPercentValue = Math.round(
  (17 / 100) * Dimensions.get("window").height
);

export default function Registration({ navigation }) {
  const [selected, setSelected] = React.useState(1);
  const { signUp } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(null);
  const [password, setPassword] = React.useState('')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="keyboard-backspace"
            style={{ marginLeft: 3 }}
            size={30}
            color={colors.NATURAL_COLOR.black}
            onPress={() => navigation.navigate("Login")}
          />
        );
      },
    });
  }, []);

  // function to iterate over form steps and display each layout on screen
  const SwitchForm = () => {
    switch (selected) {
      case 1:
        return (
          <BasicInfo
          />
        );
      case 2:
        return (
          <ResidentAddress
            // user={user}
            // setUser={setUser}
            step={selected}
          />
        );
      case 3:
        return (
          <LoginPassword
          />
        );
      default:
        break;
    }
  };

  const next = (selected) => {
    setSelected(selected + 1);
  };

  const AuthUser = () => {
    getUserData()
  };

  return (
    <View style={styles.container}>
      <SwitchForm />

      <View
        style={[
          styles.buttonWrapper,
          {
            top: selected !== 3 ? buttonPositionInPercentValue : buttonPostion,
          },
        ]}
      >
        <Indicator step={3} selected={selected} />
        <View style={{ flexDirection: selected !== 1 ? "row" : null }}>
          {selected > 1 ? (
            <MaterialCommunityIcons
              name="keyboard-backspace"
              style={{ marginLeft: 3, flex: 1 }}
              size={30}
              color={colors.NATURAL_COLOR.black}
              onPress={() => {
                setSelected(selected - 1);
              }}
            />
          ) : null}
          {selected !== 3 ? (
            <TouchableOpacity
              style={[styles.button, { flex: selected !== 1 ? 2 : null }]}
              onPress={() => {
                next(selected);
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          ) : selected === 3 ? null : (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                AuthUser();
              }}
            >
              <Text style={[styles.buttonText, { paddingHorizontal: "24.7%" }]}>
                Create
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.NATURAL_COLOR.white,
  },
  buttonWrapper: {
    position: "relative",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.SECONDARY_COLOR,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.NATURAL_COLOR.white,
    fontSize: 20,
    fontWeight: "500",
  },
});

// const mapDispatchToProps = dispatch => bindActionCreators({signUp}, dispatch)

// export default connect(null, mapDispatchToProps)(Registration);

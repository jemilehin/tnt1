import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../Constant/Color.json";
import { Dashboard } from "../Screens/Dashboard";

import { AuthContext } from "./context";

const Tab = createMaterialBottomTabNavigator();

export const BottomNavigation = ({ navigation }) => {

  const {signOut} = React.useContext(AuthContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Profile")}
          icon="account"
          size={30}
          color={colors.NATURAL_COLOR.white}
        />
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: colors.SECONDARY_COLOR}}
      
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="ios-exit-outline"
              size={20}
              color={colors.NATURAL_COLOR.white}
            />
          ),
          tabBarLabel: "Signout",
        }}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
            signOut()
          },
        })}
      />
      {/* <Tab.Screen name="Home" component={Dashboard}/> */}
    </Tab.Navigator>
  );
};

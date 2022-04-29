import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../Constant/Color.json";
import { Dashboard } from "../Screens/Dashboard";

import { AuthContext } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();

export const BottomNavigation = ({ navigation,route }) => {

  const {signOut} = React.useContext(AuthContext);
  const [user,setUser] = React.useState({})

  const DeleteUserLocalData = async () => {
    await AsyncStorage.removeItem('user')
  }
  const getUser = async() => {
    let user = await AsyncStorage.getItem('user')
    setUser(JSON.parse(user))
  }

  React.useEffect(async() => {
    getUser()
    await navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Profile",{user: user})}
          icon="account"
          size={30}
          color={colors.NATURAL_COLOR.white}
        />
      ),
      title: user !== {} ? "Welcome "+ user.fullname: null,
    });
  }, [user])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: colors.PRIMARY_COLOR}}
      
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
            signOut();
            DeleteUserLocalData()
          },
        })}
      />
      {/* <Tab.Screen name="Home" component={Dashboard}/> */}
    </Tab.Navigator>
  );
};

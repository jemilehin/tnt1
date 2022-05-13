import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { connect, useDispatch } from "react-redux";
import { signOutRequest } from "../Redux/Member/actions";

import colors from "../Constant/Color.json";
import { Dashboard } from "../Screens/Dashboard";

// import { AuthContext } from "./context";

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = ({ navigation,route,user }) => {

  // const {signOut} = React.useContext(AuthContext);

  const dispatch = useDispatch()

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Profile",{user:user})}
          icon="account"
          size={30}
          color={colors.NATURAL_COLOR.white}
        />
      ),
      title: `Welcome ${user.fullname}`
    });
  }, [user])

  // console.log("user",user)

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
            dispatch(signOutRequest())
          },
        })}
      />
      {/* <Tab.Screen name="Home" component={Dashboard}/> */}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => {
  return {user: state.reducers.user}
}

export default connect(mapStateToProps, null)(BottomNavigation)

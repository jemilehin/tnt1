import 'react-native-gesture-handler';
import * as React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "./Screens/Dashboard";
import Registration from "./Screens/Registration";
import { BottomNavigation } from "./Component/BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";

import { AuthContext } from "./Component/context";

import colors from "./Constant/Color.json";

import signIn from "./Screens/SignIn";
import { FullMessage } from "./Screens/Message";
import { MemberProfile } from "./Screens/Profile";
import ChatRoom from "./Screens/ChatRoom";
import { LandingScreen } from "./Screens/SetUpScreen";

// Firebase references
const app = getApp();

// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

const Stack = createNativeStackNavigator();
// const Fonts = {
//   robotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
//   robotoLight: require('./assets/fonts/Roboto-Light.ttf'),
//   robotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
//   robotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
//   robotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
// }

export default function App({ navigation, route }) {
  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [firstLaunching, setLaunching] = React.useState(false);
  const authContext = React.useMemo(() => ({
    signIn: () => {
      setIsLoggedIn(true);
    },
    signUp: () => {
      setIsLoggedIn(true);
    },
    signOut: () => {
      setIsLoggedIn(false);
    },
  }));

  const firstLaunch = () => {
    let value = AsyncStorage.getItem("isFirstLaunch")
    
    value.then(response => {
      if (response === '1') {
      setLaunching(true)
      console.log('not null',response)
     } else {
      AsyncStorage.setItem("isFirstLaunch", '1');
      setLaunching(false)
      console.log('null',response)
    }
    })
    
  };

  React.useEffect(() => {
    firstLaunch();
  });

  return (
    <RootSiblingParent>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {!isloggedIn ? (
            <Stack.Navigator
              initialRouteName={firstLaunching ? "Login" : "Landing"}
            >
              <Stack.Screen
                name="Landing"
                component={LandingScreen}
                options={{
                  headerShown: false,
                  headerBackVisible: true,
                }}
              />
              <Stack.Screen name="Login" component={signIn} options={{
                  headerShown: false,
                  headerBackVisible: true,
                }} />
              <Stack.Screen
                name="Register"
                component={Registration}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: "",
                  headerShadowVisible: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen
                name="Landing"
                component={BottomNavigation}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: colors.PRIMARY_COLOR },
                  headerTintColor: colors.NATURAL_COLOR.white,
                }}
              />
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ route }) => ({
                  title: "Welcome " + route.params.name + "!",
                  headerBackVisible: false,
                  headerTitleStyle: {
                    fontWeight: "normal",
                    fontSize: 16,
                  },
                })}
              />
              <Stack.Screen
                name="Profile"
                component={MemberProfile}
                options={{
                  headerShown: false,
                  headerBackVisible: true,
                }}
              />

              <Stack.Screen
                name="Message"
                component={FullMessage}
                options={{
                  headerShown: true,
                  title: "Go back",
                  headerStyle: { backgroundColor: colors.PRIMARY_COLOR},
                  headerTintColor: colors.NATURAL_COLOR.white,
                }}
              />

              <Stack.Screen
                name="Chatroom"
                component={ChatRoom}
                options={{
                  headerShown: true,
                  title: "Message Admin",
                  headerStyle: { backgroundColor: colors.PRIMARY_COLOR },
                  headerTintColor: colors.NATURAL_COLOR.white,
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </RootSiblingParent>
  );
}

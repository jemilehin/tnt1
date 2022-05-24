import 'react-native-gesture-handler'
import * as React from "react";
import { useKeepAwake } from 'expo-keep-awake';
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "./Screens/Dashboard";
import Registration from "./Screens/Registration";
import  BottomNavigation from "./Component/BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";

import { Provider, useSelector } from 'react-redux';
import store from './Redux/Store';

import colors from "./Constant/Color.json";

import signIn from "./Screens/SignIn";
import { FullMessage } from "./Screens/Message";
import MemberProfile from "./Screens/Profile";
import ChatRoom from "./Screens/ChatRoom";
import { LandingScreen } from "./Screens/SetUpScreen";

const Stack = createNativeStackNavigator();
// const Fonts = {
//   robotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
//   robotoLight: require('./assets/fonts/Roboto-Light.ttf'),
//   robotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
//   robotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
//   robotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
// }

const App = ({ navigation, route }) => {
  const token = useSelector((state) => state.reducers.token)

  return (
      // <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {token === null ? (
            <Stack.Navigator
              initialRouteName="Landing"
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
                  title: "Profile",
                  headerStyle: {
                    backgroundColor: colors.PRIMARY_COLOR,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  
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
      // </AuthContext.Provider>
  );
}

export default function MainApp() {
  useKeepAwake();
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <App />
      </Provider>
     </RootSiblingParent> 
  );
}

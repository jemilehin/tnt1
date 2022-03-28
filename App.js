import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "./Screens/Dashboard";
import Registration from "./Screens/Registration";
import { BottomNavigation } from "./Component/BottomTab";

import { AuthContext } from "./Component/context";

import colors from "./Constant/Color.json";

import signIn from "./Screens/SignIn";
import { FullMessage } from "./Screens/Message";
import { MemberProfile } from "./Screens/Profile";
import ChatRoom from "./Screens/ChatRoom";

// import { Provider } from "react-redux";
// import { store } from "./Redux/Store";

import { firebaseConfig } from "./helpers/Config";
import { initializeApp, getApp  } from 'firebase/app';
initializeApp(firebaseConfig);

// Firebase references
const app = getApp();

// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

const Stack = createNativeStackNavigator();

export default function App({ navigation, route }) {
  const [isloggedIn, setIsLoggedIn] = React.useState(false);

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
  React.useEffect(() => {
    // setTimeout(() => {
    //   set
    // })
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!isloggedIn ? (
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen
              name="Register"
              component={Registration}
              options={{
                headerShown: true,
                headerBackVisible: true,
                headerTransparent: true,
                title: "",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen name="Login" component={signIn} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={BottomNavigation}
              options={{
                headerShown: true,
                title: "Welcome, Ajepe!",
                headerStyle: { backgroundColor: colors.SECONDARY_COLOR },
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
                headerShown: true,
                title: "Profile Details",
                headerStyle: { backgroundColor: colors.SECONDARY_COLOR },
                headerTintColor: colors.NATURAL_COLOR.white,
              }}
            />

            <Stack.Screen
              name="Message"
              component={FullMessage}
              options={{
                headerShown: true,
                title: "Go back",
                headerStyle: { backgroundColor: colors.SECONDARY_COLOR },
                headerTintColor: colors.NATURAL_COLOR.white,
              }}
            />

            <Stack.Screen
              name="Chatroom"
              component={ChatRoom}
              options={{
                headerShown: true,
                title: "Message Admin",
                headerStyle: { backgroundColor: colors.SECONDARY_COLOR },
                headerTintColor: colors.NATURAL_COLOR.white,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

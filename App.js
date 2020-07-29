import React from "react";
import Loading from "./src/screens/Loading";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Stats from "./src/screens/Stats";
import Profile from "./src/screens/Profile";
import GameIntro from "./src/screens/GameIntro";
import ScoreResult from "./src/screens/ScoreResult";
import RememberTheFace from "./src/screens/RememberTheFace";
import Home from "./src/screens/Home";
import firebaseConfigDEV from "./config/FirebaseConfigDEV";
import firebaseConfigPROD from "./config/FirebaseConfigPROD";
import * as firebase from "firebase";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { decode, encode } from "base-64";
import { YellowBox } from "react-native";
import _ from "lodash";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

if (!firebase.apps.length) {
  if (__DEV__) {
    firebase.initializeApp(firebaseConfigDEV);
  } else {
    firebase.initializeApp(firebaseConfigPROD);
  }
}

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profile",
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="face-profile" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#1b6ca8",
          inactiveTintColor: "black",
        },
      },
    },

    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="face-recognition" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#1b6ca8",
          inactiveTintColor: "black",
        },
      },
    },
    Stats: {
      screen: Stats,
      headerTitle: "Stats",
      navigationOptions: {
        tabBarLabel: "Stats",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-stats" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#1b6ca8",
          inactiveTintColor: "black",
        },
      },
    },
  },
  {
    initialRouteName: "Home",
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
  },
  {}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: DashboardTabNavigator,
      Auth: AuthStack,
      GameIntro: GameIntro,
      RememberTheFace: RememberTheFace,
      ScoreResult: ScoreResult
    },
    {
      initialRouteName: "Loading",
    }
  )
);
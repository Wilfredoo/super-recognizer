import Loading from "./src/screens/Auth/Loading";
import Login from "./src/screens/Auth/Login";
import Register from "./src/screens/Auth/Register";
import GameIntro from "./src/screens/Games/GameIntro";
import ScoreResult from "./src/screens/Games/ScoreResult";
import Feedback from "./src/screens/Games/Feedback";
import RememberTheFace from "./src/screens/Games/RememberTheFace/RememberTheFace";
import SpotTheImposter from "./src/screens/Games/SpotTheImposter/SpotTheImposter";
import firebaseConfigDEV from "./config/FirebaseConfigDEV";
import * as firebase from "firebase";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { decode, encode } from "base-64";
import { YellowBox } from "react-native";
import _ from "lodash";
import DashboardTabNavigator from './src/Navigation/Navigation.js'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfigDEV);
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

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: DashboardTabNavigator,
      Auth: AuthStack,
      GameIntro: GameIntro,
      RememberTheFace: RememberTheFace,
      SpotTheImposter: SpotTheImposter,
      ScoreResult: ScoreResult,
      Feedback: Feedback,

    },
    {
      initialRouteName: "App",
    }
  )
);
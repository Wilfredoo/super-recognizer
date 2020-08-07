
import { createBottomTabNavigator } from "react-navigation-tabs";
import Feedback from "../screens/Stats/Feedback";
import Profile from "../screens/Profile/Profile";
import AllGames from "../screens/Games/AllGames";
import React from "react";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

  const DashboardTabNavigator = createBottomTabNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Profile",
          tabBarLabel: "About",
          tabBarIcon: ({ tintColor }) => (
            // <MaterialCommunityIcons name="face-profile" size={24} color={tintColor} />
            <AntDesign name="questioncircle" size={24} color={tintColor} />
          ),
          tabBarOptions: {
            activeTintColor: "#1b6ca8",
            inactiveTintColor: "black",
          },
        },
      },
  
      AllGames: {
        screen: AllGames,
        navigationOptions: {
          tabBarLabel: "Games",
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
        screen: Feedback,
        headerTitle: "Feedback",
        navigationOptions: {
          tabBarLabel: "Feedback",
          tabBarIcon: ({ tintColor }) => (
            // <Ionicons name="ios-stats" size={24} color={tintColor} />
            <MaterialIcons name="feedback" size={24} color={tintColor} />
          ),
          tabBarOptions: {
            activeTintColor: "#1b6ca8",
            inactiveTintColor: "black",
          },
        },
      },
    },
    {
      initialRouteName: "AllGames",
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          headerTitle: routeName,
        };
      },
    },
    {}
  );

  export default DashboardTabNavigator
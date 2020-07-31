
import { createBottomTabNavigator } from "react-navigation-tabs";
import Stats from "../screens/Stats";
import Profile from "../screens/Profile";
import AllGames from "../screens/AllGames";
import React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

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
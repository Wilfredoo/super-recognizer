import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Header";
import Back from "./Back";
import registerToken from "../helpers/registerNotification.js";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import * as firebase from "firebase";
import "firebase/firestore";

export default function GameIntro({ navigation }) {
  const store = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    registerToken(currentUser);
  }, []);

  return (
    <>
      <Back navigation={navigation} where="Home" />
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.text}>Spot the Stranger</Text>
        <Text style={styles.text}>
          In this game, you have to recognize your friends and spot the new
          faces that come along.
        </Text>

        {levels.map((data) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SpotTheStranger", { level: data })
                }
              >
                <Text style={styles.level}>Level {data}</Text>
              </TouchableOpacity>
            </>
          );
        })}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
  level: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

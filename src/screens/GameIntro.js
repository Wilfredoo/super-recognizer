import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Header from "./Header";
import Back from "./Back";
import registerToken from "../helpers/registerNotification.js";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import * as firebase from "firebase";
import "firebase/firestore";

export default function GameIntro({ navigation }) {
  const store = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  useEffect(() => {
    registerToken(currentUser);
  }, []);

  return (
    <> 
    <Back navigation={navigation} where="Home" />
      <Header navigation={navigation} />
    <View style={styles.container}>
      
        <Text style={styles.title}>
          This is a game called Spot the Stranger, where you have to recognise new faces
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SpotTheStranger")}>
        <Text >
          Level I
        </Text>
        </TouchableOpacity>
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
  title: {
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
});

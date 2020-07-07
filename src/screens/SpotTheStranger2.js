import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import Header from "./Header";
import registerToken from "../helpers/registerNotification.js";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import * as firebase from "firebase";
import "firebase/firestore";

export default function SpotTheStranger({ navigation }) {
  const store = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  useEffect(() => {
    registerToken(currentUser);
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.contentContainer}
      >
      <Text>level I of Spot The Stranger!</Text>
      <Text>this is your friend, remember him</Text>
      <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/icon.png")}
          />
      <Text>this is a stranger</Text>
          
          <Image
          style={{ width: 40, height: 40 }}
          source={require("../../assets/icon.png")}
        />
      </KeyboardAvoidingScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flexGrow: 1,
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

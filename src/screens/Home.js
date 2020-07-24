import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "./Header";
import registerToken from "../helpers/registerNotification.js";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import * as firebase from "firebase";
import "firebase/firestore";

export default function Home({ navigation }) {
  const store = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>
        Games
        </Text>
      <TouchableOpacity onPress={() => navigation.navigate("GameIntro", {
        game: "RememberTheFace"
      })}>
        <Text style={styles.title}>
        Remember The Face
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GameIntro", {
        game:"SpotTheImposter"
      })}>
        <Text style={styles.title}>
        Imposter Syndrome
        </Text>
      </TouchableOpacity>
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
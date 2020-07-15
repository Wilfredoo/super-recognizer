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
  const highestScoreRef = store.collection("lastHighestScores");
  const currentUser = firebase.auth().currentUser.uid;
  const [highestScore, setHighestScore] = useState(100);

  useEffect(() => {
    registerToken(currentUser);
    getHighestScores().then((result) => {
      result.forEach((docSnapshot) => {
        setHighestScore(docSnapshot.data());
      });
    });
  }, []);

  async function getHighestScores() {
    const highestScoresSnapshot = await highestScoreRef
      .where("user", "==", currentUser)
      .where("game", "==", "SpotTheStranger")
      .get();
    return highestScoresSnapshot.docs;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>
        Games
        </Text>
          <TouchableOpacity onPress={() => navigation.navigate("GameIntro", { highestScore})}>
        <Text style={styles.title}>
        Spot the Stranger
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
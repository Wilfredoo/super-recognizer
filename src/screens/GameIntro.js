import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Header";
import Back from "./Back";
import * as firebase from "firebase";
import "firebase/firestore";

export default function GameIntro({ navigation }) {
  const store = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const highestScoreRef = store.collection("lastHighestScores");
  const [highestScore, setHighestScore] = useState(0);
  const [picArrayState, setPicArrayState] = useState(null);
  const imagesRef = store.collection("rodents");

  async function getAllImages() {
    const imagesSnapshot = await imagesRef.get();
    const imagesArray = imagesSnapshot.docs;
    let animalPics = [];
    let index10 = 0;
    imagesArray.forEach((docSnapshot, index) => {
     for (let i = 0; i < docSnapshot.data().photos.length; i++) {
      animalPics.push({
        url: docSnapshot.data().photos[i],
        seen: false,
        rightAnswer: false,
      });
      if (index10 === 10) break
      index10 = index10 + 1
     }
     
    });
    setPicArrayState(animalPics);
  }

  useEffect(() => {
    getAllImages();
    let mounted = true;
    getHighestScores().then((result) => {
      if (mounted) {
        result.forEach((docSnapshot) => {
          setHighestScore(docSnapshot.data());
        });
      }
    });
    return () => (mounted = false);
  }, []);

  async function getHighestScores() {
    const highestScoresSnapshot = await highestScoreRef
      .where("user", "==", currentUser)
      .where("game", "==", "SpotTheStranger")
      .get();
    return highestScoresSnapshot.docs;
  }

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
        {levels.map((data, i) => {
          return (
            <>
              <TouchableOpacity
                key={i}
                disabled={
                  i > (highestScore.highestScore - 7) / 10 ? true : false
                }
                onPress={() =>
                  navigation.navigate("SpotTheStranger", { level: data, picArrayState:picArrayState })
                }
              >
                <Text
                  style={
                    i > (highestScore.highestScore - 7) / 10
                      ? styles.disabled
                      : styles.enabled
                  }
                >
                  Level{data}
                </Text>
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
  enabled: {
    fontWeight: "bold",
    fontSize: 20,
  },
  disabled: {
    color: "gray",
    fontSize: 20,
  },
});

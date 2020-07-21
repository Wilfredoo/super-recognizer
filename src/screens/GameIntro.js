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
  const [highestScore, setHighestScore] = useState({ highestScore: 10 });
  const [picArrayState, setPicArrayState] = useState(null);
  const imagesRef = store.collection("rodents");

  async function getAllImages() {
    const imagesSnapshot = await imagesRef.get();
    const imagesArray = imagesSnapshot.docs;
    processImages(imagesArray);
  }

  const processImages = (imagesArray) => {
    const rightAnswerArrayIndex = Math.floor(
      Math.random() * imagesArray.length
    );
    let picsArray = [];
    imagesArray.forEach((docSnapshot, index) => {
      for (let i = 0; i < docSnapshot.data().photos.length; i++) {
        if (index === rightAnswerArrayIndex) {
          picsArray.push({
            url: docSnapshot.data().photos[i],
            seen: false,
            rightAnswer: true,
          });
        } else {
          picsArray.push({
            url: docSnapshot.data().photos[i],
            seen: false,
            rightAnswer: false,
          });
        }
      }
    });

    // putting truthies in a separate array
    const truePics = [];
    for (let i = 0; i < picsArray.length; i++) {
      if (picsArray[i].rightAnswer === true) truePics.push(picsArray[i]);
    }

    // filtering big array of truthies and leaving falseys behind
    const falseArray = picsArray.filter((data) => {
      if (data.rightAnswer === false) return true;
      return false;
    });

    // shuffling big falseys array
    const shuffledFalseArray = shuffle(falseArray);

    // slicing falseys shuffled array
    const slicedShuffledFalseArray = shuffledFalseArray.slice(0, 8);

    // getting one from the true pics
    const oneRandomTruePic = truePics.pop(
      Math.floor(Math.random() * truePics.length)
    );

      // mixing 8 falseys and 2 truthies
    const mixedArray = [...slicedShuffledFalseArray, ...truePics]

      //2nd shuffle: shuffling mixed array
   const shuffledMixedArray = shuffle(mixedArray)

    // add 
    shuffledMixedArray.unshift(oneRandomTruePic);
console.log("shiffled mixed arr, ", shuffledMixedArray)
    setPicArrayState(shuffledMixedArray);
  };

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
                  navigation.navigate("SpotTheStranger", {
                    level: data,
                    picArrayState: picArrayState,
                  })
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

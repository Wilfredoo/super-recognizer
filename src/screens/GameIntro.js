import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Header";
import Back from "./Back";
import * as firebase from "firebase";
import "firebase/firestore";

export default function GameIntro({ navigation }) {
  const { game } = navigation.state.params;
  const store = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const [picArrayState, setPicArrayState] = useState(null);
  const londonFacesRef = store.collection("london_faces");

  async function getAllImages() {
    const imagesSnapshot = await londonFacesRef.get();
    const imagesArray = imagesSnapshot.docs;
    processImages(imagesArray);
  }

  const processImages = (imagesArray) => {
    const rightAnswerArrayIndex = Math.floor(
      Math.random() * imagesArray.length
    );
    let picsArray = [];
    imagesArray.forEach((docSnapshot, index) => {
      console.log("doc snap", docSnapshot.data())
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
    const mixedArray = [...slicedShuffledFalseArray, ...truePics];

    //2nd shuffle: shuffling mixed array
    const shuffledMixedArray = shuffle(mixedArray);

    // add
    shuffledMixedArray.unshift(oneRandomTruePic);
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
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Back navigation={navigation} where="Home" />
      <Header navigation={navigation} />
      <View style={styles.container}>
        {game === "RememberTheFace" && (
          <>
            <Text style={styles.text}>Remember The Face</Text>
            <Text style={styles.text}>
              In this game, you have to remember a specific person and tap them
              whenever you see them again.
            </Text>
          </>
        )}
        {game === "SpotTheImposter" && (
          <>
            <Text style={styles.text}>Spot The Impostor</Text>
            <Text style={styles.text}>
              We'll show you different pictures of a celebrity and their
              doppelgangers. Can you spot the doppelgangers?
            </Text>
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate(game)}>
          <Text
            style={{
              backgroundColor: "#1b6ca8",
              paddingVertical: 10,
              paddingHorizontal: 18,
              color: "white",
            }}
          >
            START
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

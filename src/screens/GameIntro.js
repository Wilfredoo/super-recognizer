import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Header";
import Back from "./Back";
import * as firebase from "firebase";
import "firebase/firestore";

export default function GameIntro({ navigation }) {
  const { game } = navigation.state.params;
  const store = firebase.firestore();
  const [picArrayState, setPicArrayState] = useState(null);
  const londonFacesRef = store.collection("london_faces");
  const typeArray = ["brunette", "blond", "light-brown"];
  const genderArray = ["male", "female"];
  const ageArray = ["young", "middle"];

  async function getAllImages() {
    const imagesSnapshot = await londonFacesRef
      .where(
        "type",
        "==",
        typeArray[Math.floor(Math.random() * typeArray.length)]
      )
      .where(
        "gender",
        "==",
        genderArray[Math.floor(Math.random() * genderArray.length)]
      )
      .where("age", "==", ageArray[Math.floor(Math.random() * ageArray.length)])
      .get();
    // bald-white
    // light-brown
    // black
    // white-skin-brown-hair

    const imagesArray = await imagesSnapshot.docs;
    processImages(imagesArray);
  }

  const processImages = async (imagesArray) => {
    const rightAnswerArrayIndex = await Math.floor(
      Math.random() * imagesArray.length
    );
    let picsArray = [];
    await imagesArray.forEach((docSnapshot, index) => {
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
      if (picsArray[i].rightAnswer === true) await truePics.push(picsArray[i]);
    }

    const shuffledTruthies = shuffle(truePics);
    const slicedShuffledTruthies = shuffledTruthies.slice(0, 4);

    // filtering big array of truthies and leaving falseys behind
    const falseArray = await picsArray.filter((data) => {
      if (data.rightAnswer === false) return true;
      return false;
    });

    // shuffling big falseys array
    const shuffledFalseArray = shuffle(falseArray);

    // slicing falseys shuffled array
    const slicedShuffledFalseArray = shuffledFalseArray.slice(0, 10);

    // getting one from the true pics
    const oneRandomTruePic = truePics.pop(
      Math.floor(Math.random() * truePics.length)
    );

    // mixing 10 falseys and 5 truthies
    const mixedArray = [...slicedShuffledFalseArray, ...slicedShuffledTruthies];

    //2nd shuffle: shuffling mixed array
    const shuffledMixedArray = shuffle(mixedArray);

      // let cut it again
    const slicedShuffledMixedArray = shuffledMixedArray.slice(0, 9);


    // add
    slicedShuffledMixedArray.unshift(oneRandomTruePic);
    console.log("suffled final", slicedShuffledMixedArray);
    console.log("suffled final", slicedShuffledMixedArray.length);

    setPicArrayState(slicedShuffledMixedArray);
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
        <TouchableOpacity
          onPress={() => navigation.navigate("RememberTheFace", {
            picArrayState: picArrayState
          })}
        >
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

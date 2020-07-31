import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Repetitive/Header";
import Back from "./Repetitive/Back";
import * as firebase from "firebase";
import "firebase/firestore";
import processImages from "../Helpers/processImages.js";


export default function GameIntro({ navigation }) {
  console.log("navigation", navigation.state.params)
  const { game } = navigation.state.params;
  const store = firebase.firestore();
  const [picArrayState, setPicArrayState] = useState(null);
  const londonFacesRef = store.collection("london_faces");
  const celebritiesRef = store.collection("celebrities");

  const typeArray = [
    "brunette_shorthair",
    "brunette_longhair",
    "blond",
    "light_brown",
    "black",
    "asian",
  ];
  const genderArray = ["male", "female"];
  const randomTypeIndex = Math.floor(Math.random() * typeArray.length);
  const randomGenderIndex = Math.floor(Math.random() * genderArray.length);

  async function getAllImages() {
    console.log("type is gonna be: ", typeArray[randomTypeIndex]);
    console.log("gender is gonna be: ", genderArray[randomGenderIndex]);
    const imagesSnapshot = await londonFacesRef
      .where("type", "==", typeArray[randomTypeIndex])
      .where("gender", "==", genderArray[randomGenderIndex])
      .get();

    const imagesArray = await imagesSnapshot.docs;
    const  slicedShuffledMixedArray=await processImages(imagesArray);
    setPicArrayState(slicedShuffledMixedArray)
  }

  useEffect(() => {
    getAllImages();
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
          onPress={() =>
            navigation.navigate("RememberTheFace", {
              game: game,
              picArrayState: picArrayState,
            })
          }
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

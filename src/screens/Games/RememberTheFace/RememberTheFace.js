import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../Repetitive/Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";
import processImages from "../../../Helpers/processImages.js";

export default function RememberTheFace({ navigation }) {
  const { game } = navigation.state.params;
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const store = firebase.firestore();
  const [picArrayState, setPicArrayState] = useState(null);
  const londonFacesRef = store.collection("london_faces");
  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
    const slicedShuffledMixedArray = await processImages(imagesArray);
    setPicArrayState(slicedShuffledMixedArray);
  }

  useEffect(() => {
    getAllImages();
  }, []);

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const increaseScore = async () => {
    setScore(score + 1);
  };

  const answer = async (answer, correctPicture) => {
    if (answer === "YES" && correctPicture) await increaseScore();
    if (answer === "NO" && !correctPicture) await increaseScore();
    nextPage();
  };

  const arrayOfPages = pageArray.map((data, i) => {
    if (picArrayState) {
      return (
        <Page
          key={i}
          navigation={navigation}
          game={game}
          answer={answer}
          nextPage={nextPage}
          currentPage={currentPage}
          photoToShow={picArrayState[currentPage]}
          score={score}
        />
      );
    }
  });
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Remember the face</Text>
        {picArrayState ? (
          arrayOfPages[currentPage]
        ) : (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    position: "absolute",
    top: 40,
    textAlign: "center",
  },
});

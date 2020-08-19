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
  const [picArrayState, setPicArrayState] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const store = firebase.firestore();
  const londonFacesRef = store.collection("london_faces");
  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const typeArray = [
    "longbrownhair_white_female_young",
    "shorthair_white_female_young",
    "dark_fat_female",
    "longhair_blond_female",
    "shorthair_blond_female",
    "white_fat_female",
    "black_female",
    "shorthair_tanned_female_adult",
    "longhair_tanned_female_adult",
    "longhair_tanned_female_young",
    "dark_female",
    "asian_female",
    "shorthair_white_male_young",
    "longhair_white_male_young",
    "shortbrownhair_white_male_young",
    "shorthair_tanned_male_young",
    "shorthair_tanned_male_adult",
    "shorthair_tanned_male_adult",
    "shorthair_dark_male",
    "blond_shorthair_male",
    "bald_tanned_male",
    "bald_white_male",
    "asian_male",
    "black_male",
  ];

  const genderArray = ["male", "female"];
  const randomTypeIndex = Math.floor(Math.random() * typeArray.length);
  const randomGenderIndex = Math.floor(Math.random() * genderArray.length);

  async function getAllImages() {
    console.log("type is gonna be: ", typeArray[randomTypeIndex]);
    const imagesSnapshot = await londonFacesRef
      .where("type", "==", typeArray[randomTypeIndex])
      .get();

    const imagesArray = await imagesSnapshot.docs;
    const slicedShuffledMixedArray = await processImages(imagesArray);
    setPicArrayState(slicedShuffledMixedArray);
  }

  useEffect(() => {
    getAllImages();
  }, []);

  const shuffle = () => {
    getAllImages();
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const increaseScore = async () => {
    setScore(score + 1);
  };

  const answer = async (answer, correctPicture) => {
    setLoading(true);
    if (
      (answer === "YES" && correctPicture) ||
      (answer === "NO" && !correctPicture)
    ) {
      await increaseScore();
      setCorrectAnswer(true);
    } else setCorrectAnswer(false);
    setTimeout(function () {
      nextPage();
      setCorrectAnswer(null);
      setLoading(false);
    }, 500);
  };

  const arrayOfPages = pageArray.map((data, i) => {
    if (picArrayState) {
      return (
        <Page
          key={i}
          navigation={navigation}
          loading={loading}
          correctAnswer={correctAnswer}
          game={game}
          answer={answer}
          nextPage={nextPage}
          shuffle={shuffle}
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
    textAlign: "center",
    marginBottom: 60,
  },
});

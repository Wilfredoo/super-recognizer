import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../Repetitive/Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";
import processImages from "../../../Helpers/processImages.js";
import processImagesII from "../../../Helpers/processImagesII.js";

export default function RememberTheFace({ navigation }) {
  const { game, level } = navigation.state.params;
  const [score, setScore] = useState(0);
  const [picArrayState, setPicArrayState] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const store = firebase.firestore();
  const londonFacesRef = store.collection("london_faces");
  const asianGirlsRef = store.collection("asian_girls");
  const pageArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  const photosArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];

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

  const randomTypeIndex = Math.floor(Math.random() * typeArray.length);

  async function getAllImages() {
    let imagesSnapshot = [];
    let imagesArray = [];
    let slicedShuffledMixedArray = [];

    if (level === "I") {
      imagesSnapshot = await londonFacesRef
        .where("type", "==", typeArray[randomTypeIndex])
        .get();
      imagesArray = await imagesSnapshot.docs;
      slicedShuffledMixedArray = await processImages(imagesArray);
    } else if (level === "II") {
      imagesSnapshot = await asianGirlsRef.get();
      imagesArray = await imagesSnapshot.docs;
      slicedShuffledMixedArray = await processImagesII(imagesArray);
    }
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
    console.log("current page", currentPage)
    if (level === "II" && currentPage !== 1) setCurrentPhoto((currentPhoto) => currentPhoto + 1);

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
          level={level}
          answer={answer}
          nextPage={nextPage}
          shuffle={shuffle}
          currentPage={currentPage}
          currentPhoto={currentPhoto}
          photoToShow={picArrayState[currentPhoto]}
          photoToShow2={picArrayState[currentPhoto + 1]}
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

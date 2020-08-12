import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../Repetitive/Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";
import processImages3 from "../../../Helpers/processImages3.js";

export default function WorldOfAverages({ navigation }) {
  const { game } = navigation.state.params;
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const store = firebase.firestore();
  const [picArrayState, setPicArrayState] = useState(null);
  const worldOfAveragesRef = store.collection("world_of_averages");
  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const typeArray = [
    "afghan",
    "african_american",
    "argentinian",
    "austrian",
    "dutch",
    "belgian",
    "brazilian",
    "burmese",
    "cambodian",
    "english",
    "ethiopian",
    "filipino",
    "finish",
    "german",
    "french",
    "hungarian",
    "indian",
    "iranian",
    "irish",
    "israeli",
    "italian",
    "japanese",
    "korean",
    "lebanese",
    "iraqi",
    "egyptian",
    "chad-cameroon",
    "chinese",
    "mexican",
    "mongolian",
    "peruvian",
    "russian",
    "samoan",
    "puerto rican",
    "polish",
    "saudi",
    "serbian",
    "south african",
    "south indian",
    "spanish",
    "swedish",
    "swiss",
    "taiwanese",
    "thai",
    "tibetan",
    "turkish",
    "ukranian",
    "uzbek",
    "vietnamese",
    "welsh",
    "west african",
    "white american",
  ];

  async function getAllImages() {
    const imagesSnapshot = await worldOfAveragesRef.get();
    const slicedShuffledMixedArray = await processImages3(
      imagesSnapshot,
      typeArray
    );
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
    console.log("score", score);
  };

  const answer = async (answer) => {
    if (answer) await increaseScore();
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
          personToShow={picArrayState[currentPage]}
          score={score}
        />
      );
    }
  });
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>World of Averages</Text>
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

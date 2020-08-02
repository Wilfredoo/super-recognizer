import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../Repetitive/Header";
import Page from "../SpotTheImposter/Page";
import * as firebase from "firebase";
import "firebase/firestore";
import processImages2 from "../../../Helpers/processImages2.js";

export default function SpotTheImposter({ navigation }) {
  const { game } = navigation.state.params;
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [celebrityName, setCelebrityName] = useState(null);
  const store = firebase.firestore();
  const [picArrayState, setPicArrayState] = useState(null);
  const celebritiesRef = store.collection("celebrities");
  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const typeArray = ["Trump", "Shakira"];

  const randomTypeIndex = Math.floor(Math.random() * typeArray.length);

  async function getAllImages() {
    const realImagesSnapshot = await celebritiesRef
      .where("name", "==", typeArray[randomTypeIndex])
      .where("real", "==", true)
      .get();

    const fakeImagesSnapshot = await celebritiesRef
      .where("name", "==", typeArray[randomTypeIndex])
      .where("real", "==", false)
      .get();

    const realImagesDocs = await realImagesSnapshot.docs;
    const fakeImagesDocs = await fakeImagesSnapshot.docs;
    await realImagesDocs.forEach((docSnapshot) => {
      setCelebrityName(docSnapshot.data().name)
      
    });

    const slicedShuffledMixedArray = await processImages2(
      realImagesDocs,
      fakeImagesDocs
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
          celebrity={celebrityName}
        />
      );
    }
  });
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Spot The Imposter</Text>
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

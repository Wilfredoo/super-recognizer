import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";

export default function RememberTheFace({ navigation }) {
  console.log("start remember the face")
  const { picArrayState } = navigation.state.params;
  const store = firebase.firestore();
  const [score, setScore] = useState(0);
  const [lastHighestScore, setLastHighestScore] = useState(10);
  const userScores = store.collection("userScores");
  const lastHighestScoresRef = store.collection("lastHighestScores");
  const currentUser = firebase.auth().currentUser.uid;
  const [currentPage, setCurrentPage] = useState(0);

  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    getLastHighestScore();
  }, []);

  async function getLastHighestScore() {
    const highestScoreSnapshot = await lastHighestScoresRef.doc(currentUser).get();
    setLastHighestScore(highestScoreSnapshot.data());
  }

  const increaseScore = async () => {
    setScore(score + 1);
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const answer = async (answer, correctPicture) => {
    if (answer === "YES" && !correctPicture) await increaseScore();
    if (answer === "NO" && correctPicture) await increaseScore();
    if ((await currentPage) === 10) {
      finish();
    }
    nextPage();
  };

  const arrayOfPages = pageArray.map((data, i) => {
    if (picArrayState) {
      return (
        <Page
          key={i}
          navigation={navigation}
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
        <Text style={styles.title}>
          Remember the face
        </Text>
        {arrayOfPages[currentPage]}
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

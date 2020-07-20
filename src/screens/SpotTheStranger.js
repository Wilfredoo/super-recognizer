import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";

export default function SpotTheStranger({ navigation }) {
  const { level, picArrayState } = navigation.state.params;
  const store = firebase.firestore();
  const [score, setScore] = useState(0);
  const [lastHighestScore, setLastHighestScore] = useState(0);
  const userScores = store.collection("userScores");
  const lastHighestScoresRef = store.collection("lastHighestScores");
  const currentUser = firebase.auth().currentUser.uid;
  const [currentPage, setCurrentPage] = useState(0);

  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  useEffect(() => {
    getLastHighestScore();
  }, []);

  async function getLastHighestScore() {
    const highestScoreSnapshot = await lastHighestScoresRef.get();
    const highestScoreArray = highestScoreSnapshot.docs;
    highestScoreArray.forEach((docSnapshot) => {
      setLastHighestScore(docSnapshot.data());
    });
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

  const finish = () => {
    saveScore();
    unlockNextLevel();
  };

  const saveScore = () => {
    return userScores.doc(currentUser).collection("SpotTheStranger").add({
      user: currentUser,
      game: "SpotTheStanger",
      score: score,
      time: Date.now(),
    });
  };

  const unlockNextLevel = () => {
    if (score >= 6) {
      increaseHighestScore();
    }
  };

  const increaseHighestScore = () => {
    if (level > lastHighestScore.highestScore / 10) {
      const scoreToUpdate = level * 10 + score;
      lastHighestScoresRef
        .doc(currentUser)
        .update({ highestScore: scoreToUpdate });
    }
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
          Spot The Stranger! {"\n"}
          {"\n"}Level {level}
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

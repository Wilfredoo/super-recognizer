import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import Header from "./Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";

export default function SpotTheStranger({ navigation }) {
  const { level } = navigation.state.params;
  const store = firebase.firestore();
  const [score, setScore] = useState(0);
  const userScores = store.collection("userScores");
  const lastHighestScores = store.collection("lastHighestScores");
  const currentUser = firebase.auth().currentUser.uid;
  const imagesRef = store.collection("tinderImages");
  const [currentPage, setCurrentPage] = useState(0);


  const otterPic1 =
  "https://dkt6rvnu67rqj.cloudfront.net/cdn/ff/5MLOa-xy8Q1evoAxxYRZ1EwmA-P1NhAdaRANh4z_30c/1579533887/public/styles/max_1000/public/media/ca_-_en_files/1023627.jpg?itok=4kCP_NEo";
const otterPic2 =
  "https://i0.wp.com/metro.co.uk/wp-content/uploads/2013/01/ay_102510013.jpg?quality=90&strip=all&zoom=1&resize=1000%2C667&ssl=1";
const otterPic3 =
  "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LEGGB4M5XY3I3CLXPJVSWOJ3LE.jpg";
const beaverPic =
  "https://i.pinimg.com/originals/22/c8/35/22c83527d8d28f357cfcecb045476fbe.jpg";
const racoonPic =
  "https://live.staticflickr.com/189/491727233_0091898f59_b.jpg";
const platypusPic =
  "https://static01.nyt.com/images/2010/01/19/science/19obvenom/articleLarge.jpg?quality=75&auto=webp&disable=upscale";
const picsArray = [
  { url: otterPic1, seen: false, rightAnswer: true },
  { url: otterPic2, seen: false, rightAnswer: true },
  { url: otterPic3, seen: false, rightAnswer: true },
  { url: beaverPic, seen: false, rightAnswer: false },
  { url: racoonPic, seen: false, rightAnswer: false },
  { url: otterPic2, seen: false, rightAnswer: true },
  { url: otterPic3, seen: false, rightAnswer: true },
  { url: platypusPic, seen: false, rightAnswer: false },
  { url: racoonPic, seen: false, rightAnswer: false },
  { url: platypusPic, seen: false, rightAnswer: false },
];

  const pageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1];
  useEffect(() => {
    getAllImages().then((result) => {
      let imagesResult = [];
      result.forEach((docSnapshot) => {
        imagesResult.push(docSnapshot.data());
      });
    });
  }, []);

  async function getAllImages() {
    const imagesSnapshot = await imagesRef.get();
    const imagesArray = imagesSnapshot.docs;
    return imagesArray;
  }

  const submitAnswer = (correctAnswer) => {
    correctAnswer && setScore((score) => score + 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  const select = (pageNumber, correctAnswer) => {
    nextPage(pageNumber);
    if (pageNumber !== 1) submitAnswer(correctAnswer);
  };

  const finish = () => {
    navigateToScore();
    saveScore();
    saveLastScore();
  };

  const navigateToScore = () => {
    navigation.navigate("ScoreResult", {
      rightAnswers: score,
    });
  };

  const saveScore = () => {
    return userScores.doc(currentUser).collection("SpotTheStranger").add({
      user: currentUser,
      game: "Spot The Stanger",
      score: score,
      time: Date.now(),
    });
  };

  const saveLastScore = () => {
    return lastHighestScores.doc(currentUser).set({
      user: currentUser,
      game: "Spot The Stanger",
      score: score,
      lastUpdate: Date.now(),
    });
  };

  const arrayOfPages = pageArray.map((data) => {
    return <Page nextPage={nextPage} currentPage={currentPage} />;
  });

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>
          Spot The Stranger! {"\n"}
          {"\n"}Level {level}
        </Text>
        {console.log("current page is...", currentPage)}
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

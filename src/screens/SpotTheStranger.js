import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import Header from "./Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";

export default function SpotTheStranger({ navigation }) {
  const store = firebase.firestore();
  const [page, setPage] = useState(0);
  const [score, setScore] = useState(0);
  const userScores = store.collection("userScores");
  const lastHighestScores = store.collection("lastHighestScores");
  const currentUser = firebase.auth().currentUser.uid;
  const [mainImage, setMainImage] = useState(null);
  const [mainImagesArray, setMainImagesArray] = useState(null);
  const [otherImages, setOtherImages] = useState(null);

  const imagesRef = store.collection("tinderImages");

  useEffect(() => {
    getAllImages().then((result) => {
      let imagesResult = [];
      result.forEach((docSnapshot) => {
        imagesResult.push(docSnapshot.data());
      });
      setMainImage(imagesResult[0].url);
      setMainImagesArray(imagesResult[0].morePhotos);
      setOtherImages(imagesResult[1].morePhotos);
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

  const nextPage = (pageNumber) => {
    setPage(pageNumber);
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

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Level I of Spot The Stranger!</Text>
        {/* {mainImagesArray &&
          mainImagesArray.map((data) => {
            console.log("data in array", data);
          })} */}

        {page === 0 && mainImage && (
          <Page nextPage={1} select={select} photo1={mainImage} />
        )}
        {page === 1 && (
          <Page
            nextPage={2}
            select={select}
            photo1={mainImagesArray[0]}
            photo2={otherImages[0]}
            correctPhoto={1}
          />
        )}
        {page === 2 && (
          <Page
            nextPage={-1}
            select={select}
            photo1={otherImages[1]}
            photo2={mainImagesArray[1]}
            correctPhoto={2}

          />
        )}
        {page === -1 && (
          <>
            <Text style={{ marginBottom: 30 }}>You finished the test!</Text>
            <Button onPress={finish} title="Show Score" color="#841584" />
          </>
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
  },
});

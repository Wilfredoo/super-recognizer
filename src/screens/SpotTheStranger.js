import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from "./Header";
import Page from "./Page";
import * as firebase from "firebase";
import "firebase/firestore";

export default function SpotTheStranger({ navigation }) {
  const store = firebase.firestore();
  const [page, setPage] = useState(0);
  const [score, setScore] = useState(0);

  const submitAnswer = (correctAnswer) => {
    console.log("correct answer", correctAnswer);
    correctAnswer && setScore((score) => score + 1);
    console.log("whats the score", score);
  };

  const nextPage = (pageNumber) => {
    if (pageNumber === "last") navigation.navigate("ScoreResult");
    setPage(pageNumber);
  };

  select = (pageNumber, correctAnswer) => {
    nextPage(pageNumber);
    submitAnswer(correctAnswer);
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Level I of Spot The Stranger!</Text>
        {/* {page === 0 && (
          <>
            
            <TouchableOpacity onPress={() => nextPage(1)}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri:
                    "https://images-ssl.gotinder.com/59441efca2ee5120408c664c/640x800_75_a44c580a-eb18-4591-b17b-4ea8aef53276.webp",
                }}
              />
            </TouchableOpacity>
          </>
        )} */}
{page === 0 && (
          <Page
            nextPage={2}
            photo1={
              "https://images-ssl.gotinder.com/5ec04d287e2f3101001e69a7/640x800_75_a4df925a-f064-44c0-a698-9d47ea5f1aef.webp"
            }
            photo2={
              "https://images-ssl.gotinder.com/59441efca2ee5120408c664c/640x800_75_13795fb6-35bd-4f05-bda3-c605b95869a8.webp"
            }
          />
        )}
        {page === 1 && (
          <Page
            nextPage={2}
            photo1={
              "https://images-ssl.gotinder.com/5ec04d287e2f3101001e69a7/640x800_75_a4df925a-f064-44c0-a698-9d47ea5f1aef.webp"
            }
            photo2={
              "https://images-ssl.gotinder.com/59441efca2ee5120408c664c/640x800_75_13795fb6-35bd-4f05-bda3-c605b95869a8.webp"
            }
          />
        )}
        {page === 2 && (
          <Page
            nextPage={"last"}
            photo1={
              "https://images-ssl.gotinder.com/59441efca2ee5120408c664c/640x800_75_a4472a75-dec1-4e5d-b1c5-8b13a0a93979.webp"
            }
            photo2={
              "https://images-ssl.gotinder.com/5c1c7047c6bf2d742ae75285/640x640_9720f732-3b95-4c80-b790-4fe77531bdf2.jpg"
            }
          />
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

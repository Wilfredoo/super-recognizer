import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";
import ScoreResult from "../ScoreResult";
import shuffle from "../../../Helpers/shuffle";

export default function Page({
  loading,
  correctAnswer,
  navigation,
  game,
  level,
  currentPage,
  personToShow,
  score,
  answer,
}) {
  const [rightType, setRightType] = useState("macedonian");

  const buttonValues = [];
  let shuffledButtonValues = [];

  useEffect(() => {
    console.log("game", game, "leveel", level);
    shuffledButtonValues.map((data) => {
      if (data.key === "rightAnswer") setRightType(data.value);
    });
  }, []);

  if (typeof personToShow !== "undefined") {
    for (const [key, value] of Object.entries(personToShow.answers)) {
      buttonValues.push({ key, value });
    }
    shuffledButtonValues = shuffle(buttonValues);
  }

  return (
    <>
      <View>
        <>
          {currentPage < 10 && (
            <>
              <View style={styles.container}>

              {level === "III" &&
              <>
              {console.log("yes level 3")}

                <Image
                  style={styles.imageIIIA}
                  source={{
                    uri: personToShow.photo,
                  }}
                  
                />

                <Image
                  style={styles.imageIIIB}
                  source={{
                    uri: personToShow.photo,
                  }}
                  
                />
                </>
              }
              {level !== "III" &&
              <>
              {console.log("not level 3")}


<Image
                  style={styles.image}
                  source={{
                    uri: personToShow.photo,
                  }}
                  
                />
                </>
                }

                <Text style={styles.text}>
                  What's the ethnicity of this person?
                </Text>
                <View
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {!loading &&
                    shuffledButtonValues &&
                    shuffledButtonValues.map((data, index) => {
                      let typeAnswer = true;
                      if (data.key !== "rightAnswer") typeAnswer = false;
                      return (
                        <View
                          key={index}
                          style={{
                            alignSelf: "stretch",
                          }}
                        >
                          <TouchableOpacity onPress={() => answer(typeAnswer)}>
                            <Text style={styles.button}>{data.value}</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  {loading && correctAnswer === true && (
                    <Text style={styles.correctAnswer}>Correct ✔</Text>
                  )}
                  {loading && correctAnswer === false && (
                    <>
                      <Text style={styles.incorrectAnswer}>
                        Incorrect X{"\n"}
                      </Text>
                    </>
                  )}
                  {loading && correctAnswer === false && (
                    <>
                      <Text style={styles.rightType}>
                        Right Answer: {rightType}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
          {currentPage === 10 && (
            <>
              <ScoreResult navigation={navigation} game={game} score={score} totalQuestions={10} />
            </>
          )}
        </>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: { marginBottom: 20, textAlign: "center", maxWidth: "90%" },
  imageIIIA: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignItems: "center",
    tintColor: "#52575d",

    borderRadius:400,


  },
  imageIIIB: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignItems: "center",
    position: "absolute",
    opacity: 0.15,
    borderRadius:10,
    borderRadius:400,




  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignItems: "center",

  },
  container: { alignItems: "center" },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    bottom: 20,
    maxWidth: "90%",
  },
  correctAnswer: {
    fontSize: 40,
    color: "#005086",
  },
  incorrectAnswer: {
    fontSize: 40,
    color: "#810000",
  },
  rightType: {
    fontSize: 25,
    color: "#810000",
  },
  button: {
    textAlign: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#fcf7bb",
    width: 100,
  },
});

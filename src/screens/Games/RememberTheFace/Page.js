import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";
import ScoreResult from "../ScoreResult";

export default function Page({
  navigation,
  game,
  answer,
  nextPage,
  currentPage,
  photoToShow,
  score,
  loading,
  correctAnswer
}) {
  return (
    <>
      <View>
        <>
          {currentPage === 0 && (
            <>
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: photoToShow.url,
                  }}
                />
                <Text style={styles.text}>Remember this face</Text>
                <TouchableOpacity onPress={() => nextPage()}>
                  <Text
                    style={styles.start}
                  >
                    Start
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {currentPage >= 1 && currentPage <= 10 && (
            <>
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: photoToShow.url,
                  }}
                />
                <Text style={styles.text}>Is this the face you saw?</Text>
                {loading && correctAnswer === true && (
                  <Text style={styles.correctAnswer}>Correct ✔</Text>
                )}
                {loading && correctAnswer === false && (
                  <Text style={styles.incorrectAnswer}>Incorrect X</Text>
                )}
                {!loading &&
                <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                  onPress={() => answer("YES", photoToShow.rightAnswer)}
                >
                  <Text
                    style={styles.button}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => answer("NO", photoToShow.rightAnswer)}
                >
                  <Text
                    style={styles.button}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              }
              </View>

            </>
          )}
          {currentPage === 11 && (
            <>
              <ScoreResult
                navigation={navigation}
                game={game}
                score={score}
              />
            
            </>
          )}
        </>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  text: { marginBottom: 20, textAlign: "center", maxWidth: "90%" },
  image: { width: 300, height: 300, marginBottom: 20, alignItems: "center" },
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
  button: {
    textAlign: "center",
    margin: 20,
    padding: 10,
    backgroundColor: "#fcf7bb",
    width: 120,
  }, start:
  {
    textAlign: "center",
    margin: 20,
    padding: 10,
    backgroundColor: "#1b6ca8",
    color: "#fff",
    width: 200,
  }
});

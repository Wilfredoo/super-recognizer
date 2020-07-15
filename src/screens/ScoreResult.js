import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Header";
import "firebase/firestore";

export default function ScoreResult({ navigation }) {
  const { rightAnswers } = navigation.state.params;
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        {rightAnswers <= 7 && (
          <Text style={styles.title}>You didn't make it (yet)</Text>
        )}
        {rightAnswers >= 7 && (
          <Text style={styles.text}>You've unlocked level...</Text>
        )}
        <Text style={styles.text}>
          Right answers: {JSON.stringify(rightAnswers)}
        </Text>
        <Text style={styles.text}>Total questions: 10</Text>
        {rightAnswers <= 7 && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate("GameIntro")}>
              <Text
                style={{
                  textAlign: "center",
                  margin: 20,
                  padding: 10,
                  backgroundColor: "gray",
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </>
        )}
        {rightAnswers >= 7 && (
          <>
            <Text style={styles.text}>You've unlocked level 2!</Text>
            <TouchableOpacity onPress={() => navigation.navigate("GameIntro")}>
              <Text
                style={{
                  textAlign: "center",
                  margin: 20,
                  padding: 10,
                  backgroundColor: "gray",
                }}
              >
                Next Level
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={{ textAlign: "center", fontStyle:"italic", position: "absolute", bottom: 50, width: "90%" }}>
          "It's not the size of the dog in the fight, it's the size of the fight
          in the dog"
        </Text>
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
  text: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30
  },
});

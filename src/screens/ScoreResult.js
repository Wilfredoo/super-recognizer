import { Text, View, StyleSheet, TouchableOpacity, ScrollViewComponent } from "react-native";
import React, { useState, useEffect } from "react";
import "firebase/firestore";

export default function ScoreResult({ navigation, score }) {
  return (
    <>
      <View style={styles.container}>
        {ScrollViewComponent <= 6 && (
          <Text style={styles.title}>You didn't make it (yet)</Text>
        )}
        {score >= 7 && (
          <Text style={styles.text}>You've unlocked level...</Text>
        )}
        <Text style={styles.text}>
          Right answers: {JSON.stringify(score)}
        </Text>
        <Text style={styles.text}>Total questions: 10</Text>
        {score <= 6 && (
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
        {score >= 7 && (
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
           <TouchableOpacity onPress={() => navigation.navigate("GameIntro")}>
              <Text
                style={{
                  textAlign: "center",
                  margin: 20,
                  padding: 10,
                  backgroundColor: "gray",
                }}
              >
                Back to Levels
              </Text>
            </TouchableOpacity>
        <Text
          style={styles.quote}
        >
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
    justifyContent: "center"
  },
  text: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    bottom: 0,
    width: "100%",
  }
});

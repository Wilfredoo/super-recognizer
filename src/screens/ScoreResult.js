import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "./Header";
import "firebase/firestore";

export default function ScoreResult({ navigation }) {
  const { rightAnswers } = navigation.state.params;
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.text}>This is your score result</Text>
        <Text style={styles.text}>Total questions: 10</Text>
        <Text style={styles.text}>
          Right answers: {JSON.stringify(rightAnswers)}
        </Text>
        <Text style={styles.text}>Keep trying!</Text>
        <Text style={styles.text}>You've unlocked level 2!</Text>
        <View style={{ margin: 15 }}>
          <Button
            onPress={() => console.log("next level")}
            title="Try Again"
            color="#841584"
          />
        </View>
        <View style={{ margin: 15 }}>
          <Button
            onPress={() => console.log("next level")}
            title="Play Level 2"
            color="#841584"
          />
        </View>
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
});

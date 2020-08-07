import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollViewComponent,
} from "react-native";
import React from "react";
import "firebase/firestore";
import Feedback from "./Feedback"

export default function ScoreResult({ navigation, game, score }) {
  return (
    <>
      <View style={styles.container}>
        {ScrollViewComponent <= 6 && (
          <Text style={styles.title}>You didn't make it (yet)</Text>
        )}
        <Text style={styles.text}>Right answers: {JSON.stringify(score)}</Text>
        <Text style={styles.text}>Total questions: 10</Text>
          <>
            <TouchableOpacity onPress={() => navigation.navigate("GameIntro", {
              game: game
            })}>
              <Text
                style={{
                  textAlign: "center",
                  margin: 20,
                  padding: 10,
                  backgroundColor: "#1b6ca8",
                  color: "#fff",

                  width: 150,
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </>
        <TouchableOpacity onPress={() => navigation.navigate("App")}>
          <Text
            style={{
              textAlign: "center",
              margin: 20,
              padding: 10,
              backgroundColor: "#1b6ca8",
              color: "#fff",

              width: 150,
            }}
          >
            Try another game
          </Text>
        </TouchableOpacity>
      <Feedback />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

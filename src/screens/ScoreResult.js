import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollViewComponent,
} from "react-native";
import React from "react";
import "firebase/firestore";

export default function ScoreResult({ navigation, score, level }) {
  return (
    <>
      <View style={styles.container}>
        {ScrollViewComponent <= 6 && (
          <Text style={styles.title}>You didn't make it (yet)</Text>
        )}
        {score >= 7 && (
          <Text style={styles.text}>You've unlocked level...</Text>
        )}
        <Text style={styles.text}>Right answers: {JSON.stringify(score)}</Text>
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
                  width: 150,
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </>
        )}
        {score >= 7 && (
          <>
            {level < 10 && (
              <Text style={styles.text}>
                You've unlocked level {level + 1}!
              </Text>
            )}

            {level < 10 && (
              <TouchableOpacity
                onPress={() => navigation.navigate("GameIntro")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    margin: 20,
                    padding: 10,
                    backgroundColor: "gray",
                    width: 150,
                  }}
                >
                  Next Level
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("App")}>
          <Text
            style={{
              textAlign: "center",
              margin: 20,
              padding: 10,
              backgroundColor: "gray",
              width: 150,
            }}
          >
            Back to Games
          </Text>
        </TouchableOpacity>
        {level === 10 && (
          <Text style={styles.text}>
            You've unlocked all the levels. Hurray.
          </Text>
        )}
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

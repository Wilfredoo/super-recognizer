import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollViewComponent,
} from "react-native";
import React from "react";
import "firebase/firestore";


//little change
export default function ScoreResult({ navigation, game, score, totalQuestions }) {
  return (
    <>
      <View style={styles.container}>
        {ScrollViewComponent <= 6 && (
          <Text style={styles.title}>You didn't make it (yet)</Text>
        )}
        <Text style={styles.text}>Right answers: {JSON.stringify(score)}</Text>
        <Text style={styles.text}>Total questions: {totalQuestions}</Text>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    marginBottom: 10,
    textAlign:"center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

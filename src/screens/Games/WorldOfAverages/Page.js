import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";
import ScoreResult from "../ScoreResult";

export default function Page({
  navigation,
  game,
  answer,
  currentPage,
  personToShow,
  score,
}) {
  return (
    <>
      <View>
        <>
          {currentPage < 10 && (
            <>
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: personToShow.photo,
                  }}
                />
                <Text style={styles.text}>
                  What's the ethnicity of this person?
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => answer(true)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        margin: 20,
                        padding: 10,
                        backgroundColor: "gray",
                        width: 120,
                      }}
                    >
                      {personToShow.rightAnswer}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => answer(false)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        margin: 20,
                        padding: 10,
                        backgroundColor: "gray",
                        width: 120,
                      }}
                    >
                      {personToShow.wrongAnswer1}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => answer(false)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        margin: 20,
                        padding: 10,
                        backgroundColor: "gray",
                        width: 120,
                      }}
                    >
                      {personToShow.wrongAnswer2}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          {currentPage === 10 && (
            <>
              <ScoreResult navigation={navigation} game={game} score={score} />
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
});

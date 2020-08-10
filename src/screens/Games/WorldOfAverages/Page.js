import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";
import ScoreResult from "../ScoreResult";
import shuffle from "../../../Helpers/shuffle";

export default function Page({
  navigation,
  game,
  currentPage,
  personToShow,
  score,
  answer,
}) {
  const buttonValues = [];
console.log("person to show", personToShow)
  for (const [key, value] of Object.entries(personToShow.answers)) {
    buttonValues.push({ key, value });
  }

  const shuffledButtonValues = shuffle(buttonValues);

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

                {shuffledButtonValues &&
                  shuffledButtonValues.map((data) => {
                    return (
                      <TouchableOpacity onPress={() => answer(true)}>
                        <Text
                          style={{
                            textAlign: "center",
                            margin: 20,
                            padding: 10,
                            backgroundColor: "gray",
                            width: 120,
                          }}
                        >
                          {data.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
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

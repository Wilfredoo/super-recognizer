import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../Repetitive/Header";
import Back from "../Repetitive/Back";

export default function GameIntro({ navigation }) {
  const { game } = navigation.state.params;

  return (
    <>
      <Back navigation={navigation} where="Home" />
      <Header navigation={navigation} />
      <View style={styles.container}>
        {game === "RememberTheFace" && (
          <>
            <Text style={styles.text}>Remember The Face</Text>
            <Text style={styles.text}>
              In this game, you have to remember a specific person and tap them
              whenever you see them again.
            </Text>
          </>
        )}
        {game === "SpotTheImposter" && (
          <>
            <Text style={styles.text}>Spot The Impostor</Text>
            <Text style={styles.text}>
              We'll show you different pictures of a celebrity and their
              doppelgangers. Can you spot the doppelgangers?
            </Text>
          </>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(game, {
              game: game,
            })
          }
        >
          <Text
            style={{
              backgroundColor: "#1b6ca8",
              paddingVertical: 10,
              paddingHorizontal: 18,
              color: "white",
            }}
          >
            START
          </Text>
        </TouchableOpacity>
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
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
  enabled: {
    fontWeight: "bold",
    fontSize: 20,
  },
  disabled: {
    color: "gray",
    fontSize: 20,
  },
});

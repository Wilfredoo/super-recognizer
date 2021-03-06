import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../Repetitive/Header";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import * as firebase from "firebase";
import "firebase/firestore";

export default function AllGames({ navigation }) {
  const store = firebase.firestore();
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Games</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GameIntro", {
              game: "RememberTheFace",
            })
          }
        >
          <Text style={styles.text}>Remember The Face</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GameIntro", {
              game: "SpotTheImposter",
            })
          }
        >
          <Text style={styles.text}>Imposter Syndrome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GameIntro", {
              game: "WorldOfAverages",
            })
          }
        >
          <Text style={styles.text}>World of Averages</Text>
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 50,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold"
  },
  text: {
    marginBottom: 50,
    textAlign: "center",
    fontSize: 20,
  },
  disabled: {
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
    color: "gray",
  },
});

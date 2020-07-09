import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from "./Header";
import "firebase/firestore";

export default function ScoreResult({ navigation }) {
  const { rightAnswers } = navigation.state.params;

    return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text>This is your score result</Text>
        <Text>Total questions</Text>
        <Text>Right answers: {JSON.stringify(rightAnswers)}</Text>
        <Text>Keep trying!</Text>
        <Text>You've unlocked level 2!</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({});

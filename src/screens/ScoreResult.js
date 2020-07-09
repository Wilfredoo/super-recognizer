import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from "./Header";
import "firebase/firestore";

export default function ScoreResult({ navigation }) {
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text>This is your score result</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({

});

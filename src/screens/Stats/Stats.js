import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import Header from "../Repetitive/Header";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

export default function Stats({ navigation }) {

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>
        Here is the stats
        </Text>
      
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
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
 
});
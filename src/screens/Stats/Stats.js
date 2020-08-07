import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Repetitive/Header";
// import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import Feedback from "../Games/Feedback";

export default function Stats({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      
        <Feedback />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },

  title: {
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
});

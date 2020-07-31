import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  return (
      <TouchableOpacity onPress={() => navigation.navigate("App")}>
        <View style={styles.container}>
          <Text style={{marginBottom: 7}}>Super Recognizer</Text>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../../assets/face.jpg")}
          />
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center"
  }
});
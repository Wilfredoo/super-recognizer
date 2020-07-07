import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("App")}>
        <View style={{marginBottom: 12}}>
         
          <Text style={{  }}>Super Recognizer</Text>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/icon.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  flex: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
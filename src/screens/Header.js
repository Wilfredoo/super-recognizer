import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("App")}>
        <View style={styles.flex}>
         
          <Text style={{ marginBottom: 12 }}>A nice header</Text>
         
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
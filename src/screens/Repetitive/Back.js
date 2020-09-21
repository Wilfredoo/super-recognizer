import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Back({ navigation, where }) {
  const back = () => {
    navigation.navigate(where);
  };
  return (
    <View>
      <Feather
        style={{ position: "absolute", top: 65, left: 20 }}
        name="arrow-left"
        size={30}
        color="#204051"
        onPress={back}
      />
    </View>
  );
}

//another change
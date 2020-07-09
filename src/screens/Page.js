import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";

export default function Page({ nextPage, photo1, photo2 }) {
  return (
    <>
      <View>
        <>
          {nextPage === 1 && (
            <>
              <Text style={{ marginBottom: 20 }}>
                this is your friend, remember her
              </Text>
              <Text style={{ marginBottom: 20 }}>
                everyone else is a stranger
              </Text>
            </>
          )}

          {nextPage !== 1 && <Text style={{ marginBottom: 20 }}>Who is the stranger?</Text>}
          <TouchableOpacity onPress={() => select(nextPage, false)}>
            <Image
              style={{ width: 200, height: 200, marginBottom: 20 }}
              source={{
                uri: photo1,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => select(nextPage, true)}>
            <Image
              style={{ width: 200, height: 200, marginBottom: 20 }}
              source={{
                uri: photo2,
              }}
            />
          </TouchableOpacity>
        </>
      </View>
    </>
  );
}
const styles = StyleSheet.create({});

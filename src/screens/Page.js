import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";



export default function Page({ nextPage, currentPage }) {
  return (
    <>
      <View>
        <>
          {currentPage === 0 && (
            <>
              <Text style={styles.text}>This is your friend, remember her</Text>
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://i.pinimg.com/originals/07/86/ab/0786abef4efc8a0845c43e1599a4bf90.jpg",
                }}
              />
               <TouchableOpacity onPress={() => nextPage()}>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 20,
                    padding: 10,
                    backgroundColor: "gray",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            </>
          )}

          {currentPage >= 1 && (
            <>
              <Text style={styles.text}>Is this a stranger?</Text>
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://i.pinimg.com/originals/07/86/ab/0786abef4efc8a0845c43e1599a4bf90.jpg",
                }}
              />
              <TouchableOpacity onPress={() => nextPage()}>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 20,
                    padding: 10,
                    backgroundColor: "gray",
                  }}
                >
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => nextPage()}>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 20,
                    padding: 10,
                    backgroundColor: "gray",
                  }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  text: { marginBottom: 20, textAlign: "center" },
  image: { width: 200, height: 200, marginBottom: 20, alignItems: "center" },
});

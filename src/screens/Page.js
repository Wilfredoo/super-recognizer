import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";
import ScoreResult from "./ScoreResult"

export default function Page({
  navigation,
  answer,
  nextPage,
  currentPage,
  photoToShow,
  score,
}) {
  return (
    <>
      <View>
        <>
          {currentPage === 0 && (
            <>
              <Text style={styles.text}>This is an Otter</Text>
              <Image
                style={styles.image}
                source={{
                  uri: photoToShow.url,
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
          {currentPage >= 1 && currentPage <= 10 && (
            <>

              <Text style={styles.text}>If an otter, press NO. If it is not an otter, press YES.</Text>
              <Image
                style={styles.image}
                source={{
                  uri: photoToShow.url,
                }}
              />
              <TouchableOpacity
                onPress={() => answer("YES", photoToShow.rightAnswer)}
              >
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
              <TouchableOpacity
                onPress={() => answer("NO", photoToShow.rightAnswer)}
              >
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
        
            </>
          )}
            {currentPage === 11 && (
              <>
            {console.log("score")}

            <ScoreResult navigation={navigation} score={score}/>
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

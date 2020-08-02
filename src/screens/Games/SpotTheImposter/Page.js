import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "firebase/firestore";
import ScoreResult from "../ScoreResult";

export default function Page({
  navigation,
  game,
  answer,
  nextPage,
  currentPage,
  celebrity,
  photoToShow,
  score,
}) {
  return (
    <>
      <View>
        <>
          {currentPage === 0 && (
            <>
              <View style={styles.container}>
          <Text style={styles.text}>This is the real {celebrity}</Text>
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
                      width: 200,
                    }}
                  >
                    Start
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {currentPage >= 1 && currentPage <= 10 && (
            <>
              <View style={styles.container}>
                <Text style={styles.text}>Is this an imposter?</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: photoToShow.url,
                  }}
                />
                <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                  onPress={() => answer("YES", photoToShow.rightAnswer)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      margin: 20,
                      padding: 10,
                      backgroundColor: "gray",
                      width: 120,
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
                      width: 120,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
                </View>

              </View>
            </>
          )}
          {currentPage === 11 && (
            <>
              <ScoreResult
                navigation={navigation}
                game={game}
                score={score}
              />
              <Text style={styles.quote}>
                "It's not the size of the dog in the fight, it's the size of the
                fight in the dog"
              </Text>
            </>
          )}
        </>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  text: { marginBottom: 20, textAlign: "center", maxWidth: "90%" },
  image: { width: 300, height: 300, marginBottom: 20, alignItems: "center" },
  container: { alignItems: "center" },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    bottom: 20,
    maxWidth: "90%",
  },
});
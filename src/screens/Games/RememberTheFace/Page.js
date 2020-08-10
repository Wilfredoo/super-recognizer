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
                <Image
                  style={styles.image}
                  source={{
                    uri: photoToShow.url,
                  }}
                />
                <Text style={styles.text}>Remember this face</Text>
                <TouchableOpacity onPress={() => nextPage()}>
                  <Text
                    style={{
                      textAlign: "center",
                      margin: 20,
                      padding: 10,
                      backgroundColor: "#1b6ca8",
                      color: "#fff",
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
                <Image
                  style={styles.image}
                  source={{
                    uri: photoToShow.url,
                  }}
                />
                <Text style={styles.text}>Is this the face you saw?</Text>

                <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                  onPress={() => answer("YES", photoToShow.rightAnswer)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      margin: 20,
                      padding: 10,
                      backgroundColor: "#1b6ca8",
                      color: "#fff",
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
                      backgroundColor: "#1b6ca8",
                      color: "#fff",
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

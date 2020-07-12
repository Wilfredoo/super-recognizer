import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import "firebase/firestore";

export default function Page({ nextPage, select, finish, photo1, photo2 }) {
  return (
    <>
      <View>
        <>
          {nextPage === 1 && (
            <>
              <Text style={styles.text}>
                This is your friend, remember her
              </Text>
              <Text style={styles.text}>
                Everyone else is a stranger
              </Text>
            </>
          )}
          {nextPage !== 1 && (
            <Text style={styles.text}>Who is the stranger?</Text>
          )}
          <TouchableOpacity onPress={() => select(nextPage, true)}>
            <Image
              style={styles.image}
              source={{
                uri: photo1,
              }}
            />
          </TouchableOpacity>
          {nextPage !== 1 && (
            <>
              <TouchableOpacity onPress={() => select(nextPage, true)}>
                <Image
                  style={styles.image}
                  source={{
                    uri: photo2,
                  }}
                />
              </TouchableOpacity>
            </>
          )}
          
        </>
      </View>
    </>
  );
}
const styles = StyleSheet.create({

text:  { marginBottom: 20, textAlign: "center" },
image: { width: 200, height: 200, marginBottom: 20, alignItems: "center" }
});

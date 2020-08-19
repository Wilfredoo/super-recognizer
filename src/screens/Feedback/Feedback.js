import React from "react";
import { useState, useEffect } from "react";
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import * as firebase from "firebase";

export default function Feedback() {
  const store = firebase.firestore();
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const [error, setError] = useState(null);

  const showToast = () => {
    ToastAndroid.show("Feedback was sent. Thanks.", ToastAndroid.SHORT);
  };

  const onSubmit = async () => {
    if (name === "" || feedback === "") return setError("empty");
    await store.collection("feedback").add({
      name: name,
      feedback: feedback,
      time: Date.now(),
    });

    await showToast();
    setFeedback("");
    setName("");
    setError(null);
  };

  return (
    <View style={styles.container}>
    <KeyboardAvoidingScrollView
    contentContainerStyle={styles.contentContainer}

    >

      <Text style={styles.text}>
        Ideas for a new game? Something you didn't like? Found an error? {"\n"}
        {"\n"}Here is the place to say it
      </Text>
      <TextInput
        maxLength={100}
        minLength={2}
        multiline={true}
        numberOfLines={4}
        required={true}
        onChangeText={(name) => setName(name)}
        defaultValue={name}
        style={styles.nameInput}
        placeholder="Your Name"
      />
      <TextInput
        maxLength={100}
        minLength={2}
        multiline={true}
        numberOfLines={4}
        required={true}
        onChangeText={(feedback) => setFeedback(feedback)}
        defaultValue={feedback}
        style={styles.feedbackInput}
        placeholder="You can be concise or go as lengthy as you'd like"
      />
      {error === "empty" && (
        <Text>Don't leave it empty. Tell us what we can improve.</Text>
      )}

      <TouchableOpacity onPress={() => onSubmit()}>
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
          Send
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 25
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  nameInput: {
    height: 70,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    marginTop: 25,
    marginBottom: 5,
    padding: 20,
  },
  feedbackInput: {
    height: 70,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    height: "30%",
    marginBottom: 25,

    textAlignVertical: "top",
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

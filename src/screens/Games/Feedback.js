import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function Feedback() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const res = await db.collection("feedback").add({
      user: "Tom",
      feedback: data,
      time: Date.now(),
      reference: "general",
    });
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
        
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
        )}
        name="feedback"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.feedback && (
        <Text>Don't leave it empty. Tell us what we can improve.</Text>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 70,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "black",
    borderWidth: 2,
    width: "90%",
    height: "80%",
    marginBottom: 15
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

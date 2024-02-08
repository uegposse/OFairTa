import React from "react";
import { StyleSheet, TextInput } from "react-native";

export function MyTextInput(props) {
  return (
    <TextInput
      placeholderTextColor="#005047"
      style={[styles.input, { height: props.height }]}
      multiline={true}
      value={props.value}
      onChangeText={props.onChangeText}
      onContentSizeChange={props.onContentSizeChange}
      textAlignVertical="top"
      placeholder="Digite sua historia"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: "#005047",
    elevation: 3,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#019972",
    paddingVertical: 20,
  },
});

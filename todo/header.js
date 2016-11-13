import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
const Header = ({ value, onToggleAllComplete, onAddItem, onChange }) => {
    return (
        <View style={styles.header}>
          <TouchableOpacity onPress={onToggleAllComplete}>
            <Text style={styles.toggleIcon}>✔</Text>
          </TouchableOpacity>
          <TextInput
            value={value}
            placeholder="What needs to be done?"
            onChangeText={onChange}
            style={styles.input}
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={onAddItem}
          />
        </View>
    );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  toggleIcon: {
    fontSize: 20,
    color: "#CCC",
  },
  toggleActive: {
    color: "#333"
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50,
  },
})
export default Header;
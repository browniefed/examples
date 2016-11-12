import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Footer = ({ filter, count, handleFilter, handleFilterComplete }) => {
    return (
      <View style={styles.footer}>
          <Text>{count} Count</Text>
          <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === "ALL" && styles.selected]} onPress={() => handleFilter("ALL")}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "ACTIVE" && styles.selected]} onPress={() => handleFilter("ACTIVE")}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "COMPLETED" && styles.selected]} onPress={() => handleFilter("COMPLETED")}>
            <Text>Completed</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleFilterComplete}>
            <Text>Clear Completed</Text>
          </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filters: {
    flexDirection: "row",
    alignSelf: "center"
  },  
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent"
  },
  selected: {
    borderColor: "rgba(175, 47, 47, 0.2)"
  }
})

export default Footer;
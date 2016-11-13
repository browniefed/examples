import React from "react";
import { 
  View, 
  Text, 
  TextInput,
  StyleSheet, 
  TouchableOpacity,
  Switch
} from "react-native";

const TodoRow = ({ text, complete, editing, onUpdate, onToggleEdit, onComplete, onRemove }) => {
  const textComponent = (
    <TouchableOpacity style={styles.textWrap} onLongPress={() => onToggleEdit(true)}>
      <Text style={[styles.text, complete ? styles.complete : undefined]}>{text}</Text>
    </TouchableOpacity>
  );

  const editingComponent = (
    <View style={styles.textWrap}>
      <TextInput
        onChangeText={onUpdate}
        autoFocus
        value={text}
        style={styles.input}
        multiline
        onSubmitEditing={() => onToggleEdit(false)}
      />
    </View>
  );
  const removeButton = (
    <TouchableOpacity onPress={onRemove}>
      <Text style={styles.destroy}>X</Text>
    </TouchableOpacity>
  );
  const doneButton = (
    <TouchableOpacity 
      style={styles.done} 
      onPress={() => onToggleEdit(false)}
    >
      <Text style={styles.doneText}>Save</Text>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={onComplete}
        />
          {editing ? editingComponent : textComponent}
        {editing ? doneButton : removeButton}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4d4d4d",
  },
  complete: {
    textDecorationLine: "line-through"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d",
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7,
  },
  doneText: {
    color: "#4d4d4d",
    fontSize: 20,
  },
  destroy: {
    color: "#cc9a9a",
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 7
  }
})

export default TodoRow;
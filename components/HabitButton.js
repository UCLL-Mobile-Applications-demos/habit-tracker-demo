import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HabitButton = ({ habit, onPress }) => {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(prevCount => prevCount + 1);
    onPress();//invokes incrementTotalCompletions in App.js
  };

  const handleLongPress = () => {
    setCount(0);
  };

  return (
    <TouchableOpacity 
      style={styles.habitButton}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={500}
      accessibilityLabel={`${habit.name} button, completed ${count} times. Tap to log, long press to reset.`}
    >
      <Text style={styles.habitName}>{habit.name}</Text>
      <Text style={styles.habitCount}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  habitButton: {
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitName: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  habitCount: {
    color: '#4a90e2',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HabitButton;
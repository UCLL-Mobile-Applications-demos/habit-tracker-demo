import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HabitButton from './components/HabitButton';

const habitData = [
  { id: 'water', name: 'Drink Water' },
  { id: 'exercise', name: 'Exercise' },
  { id: 'meditate', name: 'Meditate' },
  { id: 'read', name: 'Read' },
  { id: 'journal', name: 'Journal' },
  { id: 'vitamins', name: 'Take Vitamins' },
];

export default function App() {
  const [totalCompletions, setTotalCompletions] = useState(0);

  const incrementTotalCompletions = () => {
    setTotalCompletions(prevTotal => prevTotal + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Habit Tracker</Text>
      <Text style={styles.subtitle}>Tap to log, long press to reset</Text>
      <FlatList
        data={habitData}
        renderItem={({ item }) => (
          <HabitButton habit={item} onPress={incrementTotalCompletions} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <Text style={styles.totalCount}>
        Total Habits Completed Today: {totalCompletions}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  grid: {
    alignItems: 'center',
  },
  totalCount: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
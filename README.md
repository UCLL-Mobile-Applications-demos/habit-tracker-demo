### 1. setup a blank project

using expo setup a blank project.

```
npx create-expo-app habbit-tracker --template blank
cd habbit-tracker
```

now run the project using
```
npx expo start
```

press `i` to open the app in iOS simulator, or `a` to open in the android emulator.  
Alternatively you can install expo go on you mobile device and scan the QR-code (doesn't work on campus).

### 2. Create the basic layout and structure

First, let's create the basic structure of our app without any functionality.

Update the `App.js` file:

```javascriptreact
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const habitData = [
  { id: 'water', name: 'Drink Water' },
  { id: 'exercise', name: 'Exercise' },
  { id: 'meditate', name: 'Meditate' },
  { id: 'read', name: 'Read' },
  { id: 'journal', name: 'Journal' },
  { id: 'vitamins', name: 'Take Vitamins' },
];

const HabitButton = ({ habit }) => (
  <View style={styles.habitButton}>
    <Text style={styles.habitName}>{habit.name}</Text>
    <Text style={styles.habitCount}>0</Text>
  </View>
);

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Habit Tracker</Text>
      <Text style={styles.subtitle}>Tap to log, long press to reset</Text>
      <FlatList
        data={habitData}
        renderItem={({ item }) => <HabitButton habit={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <Text style={styles.totalCount}>
        Total Habits Completed Today: 0
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
  totalCount: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### 3. Move HabitButton to a separate file

Create a new folder called `components` in your project root directory:

```shellscript
mkdir components
```

Now, create a new file `HabitButton.js` inside the `components` folder:

```javascriptreact
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HabitButton = ({ habit }) => (
  <View style={styles.habitButton}>
    <Text style={styles.habitName}>{habit.name}</Text>
    <Text style={styles.habitCount}>0</Text>
  </View>
);

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
```

Update the `App.js` file to import the HabitButton component:

```javascriptreact
import React from 'react';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Habit Tracker</Text>
      <Text style={styles.subtitle}>Tap to log, long press to reset</Text>
      <FlatList
        data={habitData}
        renderItem={({ item }) => <HabitButton habit={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <Text style={styles.totalCount}>
        Total Habits Completed Today: 0
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
```

### 4. Add touch functionality

Now, let's add touch functionality to our HabitButton component.

Update the `components/HabitButton.js` file:

```javascriptreact
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HabitButton = ({ habit }) => {
  const handlePress = () => {
    console.log(`${habit.name} pressed`);
  };

  const handleLongPress = () => {
    console.log(`${habit.name} long pressed`);
  };

  return (
    <TouchableOpacity 
      style={styles.habitButton}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={500}
      accessibilityLabel={`${habit.name} button, tap to log, long press to reset`}
    >
      <Text style={styles.habitName}>{habit.name}</Text>
      <Text style={styles.habitCount}>0</Text>
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
```

### 5. Apply state to HabitButton components

Finally, let's add state to our HabitButton components and update the total count in the App component.

Update the `components/HabitButton.js` file:

```javascriptreact
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HabitButton = ({ habit, onPress }) => {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(prevCount => prevCount + 1);
    onPress();
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
```

Update the `App.js` file:

```javascriptreact
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
```

## Explanation of Applied Principles

### 1. Custom Components

We created a custom `HabitButton` component in a separate file to encapsulate the logic and UI for each habit. This promotes code reusability and separation of concerns.

### 2. FlatList

FlatList is a core component in React Native used for efficiently rendering scrollable lists. It's optimized for long lists of data and provides better performance than a simple ScrollView with an array of elements.

We use `FlatList` to render our list of habits:

```javascriptreact
<FlatList
  data={habitData}
  renderItem={({ item }) => (
    <HabitButton habit={item} onPress={incrementTotalCompletions} />
  )}
  keyExtractor={(item) => item.id}
  numColumns={2}
  contentContainerStyle={styles.grid}
/>
```

`FlatList` is optimized for long lists and provides features like lazy rendering and recycling of list item components.

- `data` is the array of items to be rendered.
- `renderItem` defines how each item should be rendered.
- `keyExtractor` defines how to get a unique key for each item.
- `numColumns` specifies that we want a grid layout with 2 columns.
- `contentContainerStyle` applies styles to the container of all the rendered items.

By using FlatList with properly implemented `keyExtractor` and `renderItem` props, you ensure that your list renders efficiently, even with large amounts of data. This is crucial for maintaining good performance in your React Native applications.

#### 2.1. keyExtractor


The `keyExtractor` prop is a function that tells the FlatList how to extract a unique key for each item in your data array. This key is used by React to optimize the rendering and updating of list items.

In our Habit Tracker app, we used it like this:

```javascriptreact
keyExtractor={(item) => item.id}
```

- The `keyExtractor` function receives each item in your data array as an argument.
- It should return a unique string that identifies that item.
- In our case, we're using the `id` property of each habit object as the unique key.


#### 2.2. renderItem


The `renderItem` prop is a function that tells FlatList how to render each item in your data array. It receives an object with the `item` property and should return a React element.

In our app, we used it like this:

```javascriptreact
renderItem={({ item }) => (
  <HabitButton habit={item} onPress={incrementTotalCompletions} />
)}
```

- The function receives an object with the `item` property, which we destructure.
- For each item (habit in our case), we return a `HabitButton` component.
- We pass the habit data and an `onPress` function as props to `HabitButton`. This allows the component to trigger a function in te App.js (that handles the total completed habbits)

### 3. Event Handling

In the `HabitButton` component, we use `onPress` and `onLongPress` to handle different touch events:

```javascriptreact
<TouchableOpacity 
  onPress={handlePress}
  onLongPress={handleLongPress}
  delayLongPress={500}
  ...
>
```

- `onPress` increments the habit count and updates the total completions.
- `onLongPress` resets the individual habit count to zero.


### 4. State Management

We use the `useState` hook in both the `HabitButton` component and the `App` component:

- In `HabitButton`: `const [count, setCount] = useState(0);` manages the count for each individual habit.
- In `App`: `const [totalCompletions, setTotalCompletions] = useState(0);` keeps track of the total habits completed.


State allows our components to re-render and update the UI when data changes.

### 5. Accessibility

We use `accessibilityLabel` to provide a description of the button for screen readers:

```javascriptreact
accessibilityLabel={`${habit.name} button, completed ${count} times. Tap to log, long press to reset.`}
```
We describe what actions the button can perform and it's current state.
This improves the accessibility of our app for users with visual impairments

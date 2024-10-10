import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Calculator from './components/Calculator'; // Your Calculator component
import History from './components/History'; // Your History component

const App = () => {
  const [showHistory, setShowHistory] = useState(false);

  const onShowHistory = () => {
    setShowHistory(!showHistory); // Toggle between calculator and history view
  };

  return (
    <View style={styles.container}>
      {/* Top section with history button */}
      <View style={styles.top}>
        <Pressable style={styles.historyButton} onPress={onShowHistory}>
          <Text style={styles.historyButtonText}>View History</Text>
        </Pressable>
      </View>

      {/* Bottom section rendering either calculator or history */}
      <View style={styles.bottom}>
        {showHistory ? <History /> : <Calculator />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05132B',
  },
  top: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 40, // This adds spacing to move the button down
  },
  historyButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  historyButtonText: {
    color: '#000',
    fontSize: 16,
  },
  bottom: {
    flex: 1,
  },
});

export default App;

import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import Calculator from './components/Calculator'; 
import History from './components/History'; 

const App = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [historyChanged, setHistoryChanged] = useState(false); // State to track changes in history

  const onShowHistory = () => {
    setShowHistory(!showHistory); 
  };

  const onDeleteHistory = async () => {
    try {
      const response = await fetch('http://10.17.10.31:6000/delete-history', {
        method: 'DELETE',
      });

      if (response.ok) {
        setHistoryChanged(!historyChanged); // Trigger re-fetch by changing the state
      } else {
        throw new Error('Failed to delete history');
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete history. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top section with both buttons */}
      <View style={styles.top}>
        <Pressable style={styles.historyButton} onPress={onShowHistory}>
          <Text style={styles.historyButtonText}>
            {showHistory ? "Calculator" : "History" }
          </Text>
        </Pressable>

        {showHistory && (
          <Pressable style={styles.deleteButton} onPress={onDeleteHistory}>
            <Text style={styles.deleteButtonText}>Delete History</Text>
          </Pressable>
        )}
      </View>

      {/* Bottom section rendering either calculator or history */}
      <View style={styles.bottom}>
        {showHistory ? <History historyChanged={historyChanged} /> : <Calculator />}
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
    flexDirection: 'row', // To align the buttons horizontally
    justifyContent: 'space-between', // Space between the two buttons
    alignItems: 'center', // Align items vertically center
    paddingHorizontal: 20,
    marginTop: 40, 
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
  deleteButton: {
    backgroundColor: '#FF3B30', // Red color to indicate deletion
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  bottom: {
    flex: 1,
  },
});

export default App;

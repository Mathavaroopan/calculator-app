import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const History = ({ historyChanged }) => {
    const [history, setHistory] = useState([]);
    const [msg, setMsg] = useState("Loading...")
  
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const response = await fetch('http://10.17.10.31:6000/history');
          const data = await response.json();
          setHistory(data);
          if(data.length == 0) setMsg("No History")
        } catch (err) {
          console.error('Failed to fetch history', err);
        }
      };
  
      fetchHistory();
    }, [historyChanged]);
  
  return (
    <ScrollView style={styles.container}>
      {history.length > 0 ? (
        history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.expression}>{item.calculation_expression}</Text>
            <Text style={styles.result}>{item.result}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noHistory}>{msg}</Text>
      )}
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#05132B',
  },
  historyItem: {
    marginVertical: 10,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  expression: {
    fontSize: 16,
    color: '#ddd',
  },
  result: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  noHistory: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

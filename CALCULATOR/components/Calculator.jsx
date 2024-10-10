import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = async (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === '=') {
      try {
        let calculationResult = eval(input).toString();
        if (calculationResult.includes('.') && calculationResult.split('.')[1].length > 4) {
          calculationResult = parseFloat(calculationResult).toFixed(4).toString();
        }
        setResult(calculationResult);

        const response = await fetch('http://10.17.10.31:6000/add-calculation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            calculation_expression: input,
            result: calculationResult,
          }),
        });

        if (!response.ok) {
          throw new Error('Error while sending data to the server');
        }
        setInput(calculationResult);
      } catch (e) {
        console.log(e);
        setResult('Error');
      }
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Text style={styles.inputText}>{input.replace("*", "x")}</Text>
        {result !== '' && <Text style={styles.resultText}>{result}</Text>}
      </View>
      <View style={styles.lower}>
        <View style={styles.row}>
          <Pressable style={[styles.btn, styles.functionBtn]} onPress={() => handlePress('C')}>
            <Text style={styles.functionText}>C</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.functionBtn]} onPress={() => handlePress('(')}>
            <Text style={styles.functionText}>(</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.functionBtn]} onPress={() => handlePress(')')}>
            <Text style={styles.functionText}>)</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.operatorBtn]} onPress={() => handlePress('+')}>
            <Text style={styles.operatorText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => handlePress('7')}>
            <Text style={styles.btnText}>7</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('8')}>
            <Text style={styles.btnText}>8</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('9')}>
            <Text style={styles.btnText}>9</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.operatorBtn]} onPress={() => handlePress('/')}>
            <Text style={styles.operatorText}>/</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => handlePress('4')}>
            <Text style={styles.btnText}>4</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('5')}>
            <Text style={styles.btnText}>5</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('6')}>
            <Text style={styles.btnText}>6</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.operatorBtn]} onPress={() => handlePress('*')}>
            <Text style={styles.operatorText}>x</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => handlePress('1')}>
            <Text style={styles.btnText}>1</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('2')}>
            <Text style={styles.btnText}>2</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('3')}>
            <Text style={styles.btnText}>3</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.operatorBtn]} onPress={() => handlePress('-')}>
            <Text style={styles.operatorText}>-</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => handlePress('.')}>
            <Text style={styles.btnText}>.</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress('0')}>
            <Text style={styles.btnText}>0</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.functionBtn]} onPress={() => handlePress('DEL')}>
            <Text style={styles.functionText}>DEL</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.operatorBtn]} onPress={() => handlePress('=')}>
            <Text style={styles.operatorText}>=</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#05132B',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  upper: {
    flex: 0.9,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    width: '100%',
  },
  lower: {
    flex: 1.2,
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  btn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '400',
  },
  functionBtn: {
    fontSize: 30,
    fontWeight: '400',
    backgroundColor: '#FFFFFF',
  },
  functionText: {
    color: '#FF3B30',
    fontSize: 24,
  },
  operatorBtn: {
    backgroundColor: '#DF598A',
  },
  operatorText: {
    color: 'white',
    fontSize: 30,
  },
  inputText: {
    fontSize: 40,
    color: 'white',
  },
  resultText: {
    fontSize: 60,
    color: 'white',
  }
});

export default Calculator;

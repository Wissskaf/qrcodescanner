// HistoryScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HistoryScreen = ({ navigation }) => {
  const [scannedHistory, setScannedHistory] = useState([]);

  useEffect(() => {
    // Load scanned QR code history when the component mounts
    loadScannedHistory();
  }, []);

  // Use useFocusEffect to refresh the list when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadScannedHistory();
    }, [])
  );

  const loadScannedHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('scannedHistory');
      if (storedHistory !== null) {
        setScannedHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading scanned history:', error.message);
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Delete QR Code',
      'Are you sure you want to delete this QR Code?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteQRCode(index) },
      ],
      { cancelable: false }
    );
  };

  const deleteQRCode = async (index) => {
    try {
      const updatedHistory = [...scannedHistory];
      updatedHistory.splice(index, 1);

      // Update the stored history
      await AsyncStorage.setItem('scannedHistory', JSON.stringify(updatedHistory));

      // Update the state to refresh the list
      setScannedHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting QR code:', error.message);
    }
  };

  const handleRowPress = (item) => {
    navigation.navigate('Details', { code: item.code });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleRowPress(item)} style={styles.row}>
    <View style={styles.row}>
      <Text>{item.code}</Text>
      <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned History</Text>
      {scannedHistory.length > 0 ? (
        <FlatList
          data={scannedHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No scanned history</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12, // Add padding to create space between the border and content
    borderWidth: 1, // Add a border
    borderRadius: 8, // Add border radius for rounded corners
    borderColor: '#ddd', // Border color
    backgroundColor: 'white', // Background color
  },
  deleteButton: {
    
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;

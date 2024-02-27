// QRScannerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    // Save scanned QR code in history
    saveScannedQRCode(data);

    // Reset the scanner after a few seconds
    setTimeout(() => {
      setScanned(false);
    }, 3000); // Adjust the timeout duration as needed
  };

  const saveScannedQRCode = async (code) => {
    try {
      const existingHistory = await AsyncStorage.getItem('scannedHistory');
      const newHistory = existingHistory ? JSON.parse(existingHistory) : [];
      
      // Add the scanned QR code to history
      newHistory.push({ code, timestamp: new Date().toISOString() });

      // Save the updated history
      await AsyncStorage.setItem('scannedHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving scanned QR code:', error.message);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Text style={styles.scanText}>QR Code Scanned!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  scanText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QRScannerScreen;

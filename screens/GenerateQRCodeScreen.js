// GenerateQRCodeScreen.js
// GenerateQRCodeScreen.js

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { useGeneratedTexts } from './GeneratedTextsContext';

const GenerateQRCodeScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  const [generatedQRCode, setGeneratedQRCode] = useState('');
  const [generatedTexts, setGeneratedTexts] = useState([]);
  const viewShotRef = useRef(null);

//   const navigateToHome = () => {
//     // Pass generatedTexts as a parameter when navigating to HomeScreen
//     navigate('HomeScreen', { generatedTexts });
//   };

  useEffect(() => {
    // Load previously generated texts from AsyncStorage
    loadGeneratedTexts();
  }, []);

  const loadGeneratedTexts = async () => {
    try {
      const storedTexts = await AsyncStorage.getItem('generatedTexts');
      if (storedTexts !== null) {
        setGeneratedTexts(JSON.parse(storedTexts));
      }
    } catch (error) {
      console.error('Error loading generated texts:', error.message);
    }
  };

  const saveGeneratedTexts = async (texts) => {
    try {
      await AsyncStorage.setItem('generatedTexts', JSON.stringify(texts));
    } catch (error) {
      console.error('Error saving generated texts:', error.message);
    }
  };

  const generateQRCode = () => {
    if (text.trim() !== '') {
      setGeneratedQRCode(text);
      setGeneratedTexts((prevTexts) => [...prevTexts, text]);
      saveGeneratedTexts([...generatedTexts, text]);
      Keyboard.dismiss();
    }
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Share.share({
        url: uri,
      });
    } catch (error) {
      console.error('Error sharing QR Code:', error.message);
    }
  };

  const navigateToGeneratedTexts = () => {
    navigation.navigate('GeneratedTexts', { generatedTexts });
  };


  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>
        
        <Text style={styles.title}>Generate QR Code</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter text for QR Code"
          value={text}
          onChangeText={(value) => setText(value)}
        />

        <Button title="Generate QR Code" onPress={generateQRCode} />

        {generatedQRCode !== '' && (
          <ViewShot
            ref={viewShotRef}
            options={{ format: 'jpg', quality: 0.9 }}
            style={styles.qrCodeContainer}
          >
            <Text style={styles.generatedText}>Generated QR Code:</Text>
            <QRCode value={generatedQRCode} size={200} />
          </ViewShot>
        )}

        {generatedQRCode !== '' && (
          <Button title="Share QR Code" onPress={handleShare} />
        )}

        {generatedTexts.length > 0 && (
          <Button title="My Codes" onPress={navigateToGeneratedTexts} />
        )}

      </View>
      
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  qrCodeContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  generatedText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default GenerateQRCodeScreen;

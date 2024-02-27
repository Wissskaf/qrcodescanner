// DetailsScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

const DetailsScreen = ({ route }) => {
  const { code } = route.params;
  const [generatedQRCode, setGeneratedQRCode] = useState('');
  const viewShotRef = useRef(null);

  useEffect(() => {
    // Generate QR code when the component mounts
    if (code.trim() !== '') {
      setGeneratedQRCode(code);
    }
  }, [code]);

  const handleShare = async () => {
    try {
      // Capture the QR code view as an image
      const uri = await viewShotRef.current.capture();

      // Share the captured image URI
      await Share.share({
        url: uri,
      });
    } catch (error) {
      console.error('Error sharing QR Code:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text>{code}</Text>
      {generatedQRCode !== '' && (
        <ViewShot
          ref={viewShotRef}
          options={{ format: 'png', quality: 1 }}
          style={styles.qrCodeContainer}
        >
          <Text style={styles.generatedText}>Generated QR Code:</Text>
          <QRCode value={generatedQRCode} size={200} />
        </ViewShot>
      )}
      <View style={styles.shareButtonContainer}>
        <Button title="Share" onPress={handleShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  qrCodeContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  generatedText: {
    fontSize: 16,
    marginBottom: 8,
  },
  shareButtonContainer: {
    marginTop: 16,
  },
});

export default DetailsScreen;

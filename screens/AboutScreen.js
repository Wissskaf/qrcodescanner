// screens/AboutScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Generate QR Code</Text>
      <Button
        title="Scan"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default AboutScreen;

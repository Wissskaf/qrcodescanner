// GeneratedTextRow.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GeneratedTextRow = ({ text }) => (
  <View style={styles.row}>
    <Text>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default GeneratedTextRow;

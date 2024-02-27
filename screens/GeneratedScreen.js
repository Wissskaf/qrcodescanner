// GeneratedTextsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GeneratedTextRow from '../components/GeneratedTextRow';

const GeneratedTextsScreen = ({ route }) => {
  const { generatedTexts } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generated Texts</Text>
      {generatedTexts.length > 0 ? (
        <FlatList
          data={generatedTexts}
          renderItem={({ item }) => <GeneratedTextRow text={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No generated texts</Text>
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
});

export default GeneratedTextsScreen;

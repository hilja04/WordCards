import { useState } from "react";
import { Text, TextInput, View, FlatList } from "react-native";
import { Button, IconButton} from "react-native-paper";
import styles from "./styles";
import * as Clipboard from 'expo-clipboard';


export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetch = () => {
    if (!search.trim()) {
      setErrorMessage("Please enter a word to get its definition.");
      setResult([]);
      return;
    }

    // Fetch translations using the dictionary API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then(response => response.json())
      .then(data => {
        if (data.title === "No Definitions Found") {
          setErrorMessage("Word not found.");
          setResult([]);
        } else {
          // Extract multiple definitions instead of just the first one
          const definitions = data[0].meanings.flatMap(meaning =>
            meaning.definitions.map(def => ({
              partOfSpeech: meaning.partOfSpeech,
              definition: def.definition
            }))
          );

          setResult(definitions);
          setErrorMessage('');
        }
        setSearch('');
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("Error fetching data.");
        setResult([]);
      });
  };
  const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
};


  return (
    <View style={[styles.container, { flex: 1, justifyContent: 'flex-start' }]}>
      <Text style={styles.text}>Enter a word to get definitions</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a word"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <Button style={styles.button} mode="contained" onPress={handleFetch}>Find Definitions</Button>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={result}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultBox}>
              <Text style={styles.text}>{item.partOfSpeech}: {item.definition}</Text>
              <IconButton 
                icon="content-copy" 
                size={20} 
                style={{ position: 'absolute', bottom: 5, right: 5 }} 
                onPress={() => copyToClipboard(item.definition)}
              />


            </View>
          )}
        />

      )}
    </View>
  );
}

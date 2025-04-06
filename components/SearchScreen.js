import { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import styles from "./styles";

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState({}); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetch = () => {

    if (!search.trim()) {
      // If search is empty, show a message asking to enter a word
      setErrorMessage("Please write a word to the Search input");
      setResult({}); // Clear previous results
      return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then((response) => response.json())
      .then(data => {
        // Check if the response contains a valid result
        if (data.title === "No Definitions Found") {
          setErrorMessage("Word not found");
          setResult({}); // Clear previous results
        } else {
          // Get the first definition of the first meaning
          const firstDefinition = data[0].meanings[0].definitions[0].definition;
          
          // Setting the searched word and the definition
          setResult({ word: search, definition: firstDefinition });
          setErrorMessage(''); 
        }
        setSearch(''); // Clear the input after fetching
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error fetching data");
        setResult({}); // Clear previous results
      });
  };

  return (
    <View style={[styles.container, { flex: 1, justifyContent: 'flex-start' }]}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <Button title="Find" onPress={handleFetch} />
      
      {/* Show the error message if the word is not found */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        // Check if result has data before rendering
        result.word && result.definition && (
          <View style={styles.resultBox}>
            <Text style={styles.text}>
              {result.word} = {result.definition} {/* Display the word and its definition */}
            </Text>
          </View>
        )
      )}
    </View>
  );
}

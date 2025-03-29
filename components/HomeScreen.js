import React from 'react';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text,FlatList,TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function HomeScreen(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [decks, setDecks] = useState([]);

    const db = SQLite.openDatabaseSync('coursedb');
    
    useEffect(() => { 
        initialize();
     }, []);

    const initialize = async () => {
        try {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS deck (
            id INTEGER PRIMARY KEY NOT NULL,
             description TEXT, 
             title TEXT);
          `);
          updateList();
        } catch (error) {
          console.error('Could not open database', error);
        }
      }
    const saveItem = async () => {
        try {
            await db.runAsync('INSERT INTO deck (title, description) VALUES (?, ?)', title, description);
            setTitle(''); // Reset the title input field
            setDescription(''); // Reset the description input field
            updateList(); 
        } catch (error) {
            console.error('Could not add item', error);
        }
    };
    const updateList = async () => {
        try {
          const list = await db.getAllAsync('SELECT * FROM deck');
          setDecks(list);
        } catch (error) {
          console.error('Could not get items', error);
        }
      }
      const deleteItem = async (id) => {
        try {
          await db.runAsync('DELETE FROM deck WHERE id=?', id);
          await updateList();
        }
        catch (error) {
          console.error('Could not delete item', error);
        }
      }
    return (
        <>
        <View style={styles.container}>
          <TextInput style={styles.input}
                placeholder='Title' 
                onChangeText={title => setTitle(title)}
                value={title}
            /> 
            <TextInput style={styles.input}
                placeholder='Description'  
                onChangeText={description => setDescription(description)}
                value={description}
            /> 
            <Button onPress={saveItem} mode="contained" style={styles.button}>
                Save Deck
            </Button>

        <FlatList 
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
                <View style={styles.deck}>
                <Text style={styles.deckTitle} numberOfLines={1} >{item.title}</Text>
                <Text style={styles.deckDescription} numberOfLines={3}>{item.description} </Text>
                <Text style={{ color: '#ff0000' }} onPress={() => deleteItem(item.id)}>Done</Text>
                </View>
            }
            data={decks}
            />
        </View>
        </>
      );
    
}

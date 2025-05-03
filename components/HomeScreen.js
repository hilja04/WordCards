import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';
import { Alert } from 'react-native';

//HomeScreen component to display user's decks and to add new ones
export default function HomeScreen({ navigation }) {
    //States
    const db = useSQLiteContext();
    const [decks, setDecks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        updateList();
    }, []);


    // Function to fetch decks from the database 
    const updateList = async () => {
        try {
            const list = await db.getAllAsync('SELECT * FROM deck'); // fetches the decks
            setDecks(list); // sets the updated decks
        } catch (error) {
            console.error('Could not get items', error);
        }
    };


    // Function to save a new deck into the database
    const saveItem = async () => {
        try {
            await db.runAsync('INSERT INTO deck (title, description) VALUES (?, ?)', title, description); //inserts the deck
            setTitle('');
            setDescription('');
            setShowModal(false);
            updateList(); //updates the list of decks
        } catch (error) {
            console.error('Could not add item', error);
        }
    };

    // Function to delete a deck from the database
    const deleteDeck = async (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this deck?",   //confirmation
            [
                { text: "Cancel", },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            // delete all cards in the deck
                            await db.runAsync('DELETE FROM card WHERE deck_id = ?', id);

                            // delete the deck
                            await db.runAsync('DELETE FROM deck WHERE id = ?', id);

                            // Update the deck list
                            await updateList();
                        } catch (error) {
                            console.error('Could not delete item', error);
                        }
                    },
                },
            ]
        );
    };


    return (
        <View style={styles.container}>
            <Button mode="contained" style={styles.button} onPress={() => setShowModal(true)}>
                Add Deck
            </Button>
            {/* Modal for creating a new deck */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Create a new deck</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            onChangeText={setTitle}
                            value={title}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            onChangeText={setDescription}
                            value={description}
                        />
                        <View>
                            <Button mode="contained" style={styles.button} onPress={saveItem}>
                                Save Deck
                            </Button>
                            <Button mode="contained" style={styles.cancelButton} onPress={() => setShowModal(false)}>
                                Cancel
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* List all decks */}
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={decks}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.deck} onPress={() => navigation.navigate('DeckDetails', { deck: item })}>
                        <Text style={styles.deckTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.deckDescription} numberOfLines={3}>{item.description}</Text>
                        <View style={{ alignSelf: 'flex-start',position:'absolute',left:10, bottom:15 }}>
                            <Text style={{ color: '#ff0000' }} onPress={() => deleteDeck(item.id)}>
                                Delete
                            </Text>
                        </View>    
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

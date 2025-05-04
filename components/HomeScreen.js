import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';

//HomeScreen component to display user's decks and to add new ones
export default function HomeScreen({ navigation }) {
    //States
    const db = useSQLiteContext(); // access to database
    const [decks, setDecks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchDecks();
    }, []);

    // Function to fetch and update decks from the database
    const fetchDecks = async () => {
        try {
            const list = await db.getAllAsync('SELECT * FROM deck'); // db query: fetches the decks
            setDecks(list); // sets the decks
        } catch (error) {
            console.error('Could not get items', error);
        }
    };

    // Function to add and save a new deck into the database
    const addDeck = async () => {
        try {
            await db.runAsync('INSERT INTO deck (title, description) VALUES (?, ?)', title, description); // db query: inserts the deck
            setTitle('');
            setDescription('');
            setShowModal(false);
            fetchDecks(); //updates the list of decks
        } catch (error) {
            console.error('Could not add item', error);
        }
    };

    // Function to delete a deck 
    const deleteDeck = async (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this deck?",   // confirmation
            [
                { text: "Cancel", },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            // db query: delete all cards with the deck
                            await db.runAsync('DELETE FROM card WHERE deck_id = ?', id);

                            // db query: delete the deck
                            await db.runAsync('DELETE FROM deck WHERE id = ?', id);

                            // Update the deck list
                            await fetchDecks();
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
                            <Button mode="contained" style={styles.button} onPress={addDeck}>
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
                        <View style={{ alignSelf: 'flex-start', position: 'absolute', left: 10, bottom: 15 }}>
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

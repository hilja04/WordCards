import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function HomeScreen({ navigation }) {
    const [decks, setDecks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
                    title TEXT
                );
            `);
            updateList();
        } catch (error) {
            console.error('Could not open database', error);
        }
    };

    const saveItem = async () => {
        try {
            await db.runAsync('INSERT INTO deck (title, description) VALUES (?, ?)', title, description);
            setTitle('');
            setDescription('');
            setShowModal(false); 
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
    };

    const deleteItem = async (id) => {
        try {
            await db.runAsync('DELETE FROM deck WHERE id=?', id);
            await updateList();
        } catch (error) {
            console.error('Could not delete item', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button mode="contained" style={styles.button} onPress={() => setShowModal(true)}>
                Add Deck
            </Button>

            {/* Modal Window */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)} 
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
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
                        <Button mode="contained" style={styles.button} onPress={saveItem}>
                            Save Deck
                        </Button>
                        <Button mode="outlined" style={styles.cancelButton} onPress={() => setShowModal(false)}>
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* List of decks */}
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={decks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.deck}
                        onPress={() => navigation.navigate('Deck', { deck: item })}
                    >
                        <Text style={styles.deckTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.deckDescription} numberOfLines={3}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

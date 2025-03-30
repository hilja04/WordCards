import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import { useSQLiteContext } from 'expo-sqlite';
import styles from './styles';

export default function DeckPage({ route }) {
    const { deck } = route.params; // Vastaanota deck tiedot
    const db = useSQLiteContext();
    const [cards, setCards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const list = await db.getAllAsync('SELECT * FROM card WHERE deck_id = ?', deck.id);
            setCards(list);
        } catch (error) {
            console.error('Could not fetch cards', error);
        }
    };

    const addCard = async () => {
        try {
            await db.runAsync('INSERT INTO card (deck_id, question, answer) VALUES (?, ?, ?)', deck.id, question, answer);
            setQuestion('');
            setAnswer('');
            setShowModal(false);
            fetchCards();
        } catch (error) {
            console.error('Could not add card', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await db.runAsync('DELETE FROM card WHERE id=?', id); 
            await fetchCards();
        } catch (error) {
            console.error('Could not delete item', error);
        }
    };
    const toggleCard = (index) => {
        const updatedCards = [...cards];
        updatedCards[index].showAnswer = !updatedCards[index].showAnswer;
        setCards(updatedCards);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>{deck.description}</Text>
            <Button mode="contained" style={styles.button} onPress={() => setShowModal(true)}>
                Add Card
            </Button>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Write a word and its translation or explanation: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Word 1"
                            value={question}
                            onChangeText={setQuestion}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Word 2"
                            value={answer}
                            onChangeText={setAnswer}
                        />
                        <Button mode="contained" style={styles.button} onPress={addCard}>
                            Save Card
                        </Button>
                        <Button
                            mode="outlined"
                            style={styles.cancelButton}
                            onPress={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={cards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => toggleCard(index)} style={styles.card}>
                        <Text style={styles.cardQuestion}>
                            {item.showAnswer ? item.answer : item.question}
                        </Text>
                        <Text style={{ color: '#ff0000' }} onPress={() => deleteItem(item.id)}>
                            Done
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

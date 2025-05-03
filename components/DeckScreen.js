import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import { useSQLiteContext } from 'expo-sqlite';
import styles from './styles';
import { Alert } from 'react-native';
import CardGame from './CardGame';

//DeckScreen component to show one deck and its content
export default function DeckScreen({ route }) {
    const { deck } = route.params;
    const db = useSQLiteContext();
    const [cards, setCards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showGame, setShowGame] = useState(false);

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

    //Add card to the deck
    const addCard = async () => {
        try {
            await db.runAsync('INSERT INTO card (deck_id, question, answer) VALUES (?, ?, ?)', deck.id, question, answer);
            setQuestion(''); //Clearing the states
            setAnswer('');
            setShowModal(false);
            fetchCards();
        } catch (error) {
            console.error('Could not add card', error);
        }
    };

    //Delete for the cards
    const deleteCard = async (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this card?", //Confirmation
            [
                { text: "Cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await db.runAsync('DELETE FROM card WHERE id=?', id);
                            await fetchCards();
                        } catch (error) {
                            console.error('Could not delete item', error);
                        }
                    },
                },
            ]
        );
    };

    //Function to turn the card
    const toggleCard = (index) => {
        const updatedCards = [...cards];
        updatedCards[index].showAnswer = !updatedCards[index].showAnswer;
        setCards(updatedCards);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>{deck.description}</Text>
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={() => setShowModal(true)}>
                    Add Card
                </Button>
                <Button mode="contained" style={styles.gameButton} onPress={() => setShowGame(true)}>
                    Start Game
                </Button>
            </View>
            {/* Modal for creating a card*/}
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
                        <View>
                            <Button mode="contained" style={styles.button} onPress={addCard}>
                                Save Card
                            </Button>
                            <Button mode="contained" style={styles.cancelButton} onPress={() => setShowModal(false)}>
                                Cancel
                            </Button>
                        </View>
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
                        <Text style={{ color: '#ff0000', marginTop: 10 }} onPress={() => deleteCard(item.id)}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                )}
            />
            {/* Renders CardGame if deck has cards */}
            {cards.length > 0 && (
                <CardGame
                    showGame={showGame}
                    onClose={() => setShowGame(false)}
                    cards={cards}
                />
            )}

        </View>
    );
}

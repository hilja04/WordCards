import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import styles from './styles';

export default function CardGame({ showGame, onClose, cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState({ correct: 0, incorrect: 0, incorrectCards: [] }); // stores score and incorrect cards
    const [gameFinished, setGameFinished] = useState(false);
    const [gameCards, setGameCards] = useState(cards); // Dynamic game card list

    useEffect(() => {
        if (showGame) {
            setGameCards(cards); // Reset cards when game is shown
            setCurrentIndex(0);
            setShowAnswer(false);
            setScore({ correct: 0, incorrect: 0, incorrectCards: [] });
            setGameFinished(false);
        }
    }, [showGame, cards]);

    const toggleCard = () => setShowAnswer(!showAnswer);

    //Marks answer correct and goes to next card
    const markCorrect = () => {
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        nextCard();
    };
    //Marks answer incorrect, stores the index of the incorrect card and goes to next one
    const markIncorrect = () => {
        setScore(prev => ({
            ...prev,
            incorrect: prev.incorrect + 1,
            incorrectCards: [...prev.incorrectCards, currentIndex]
        }));
        nextCard();
    };

    const nextCard = () => {
        if (currentIndex < gameCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
        } else {
            setGameFinished(true);
        }
    };

    //Function to restart the game with the cards the user got wrong
    const restartWithIncorrectCards = () => {
        const incorrectOnly = score.incorrectCards.map(index => gameCards[index]);

        if (incorrectOnly.length > 0) {
            setGameCards(incorrectOnly);
            setCurrentIndex(0);
            setShowAnswer(false);
            setScore({ correct: 0, incorrect: 0, incorrectCards: [] });
            setGameFinished(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={showGame} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <IconButton
                        icon="close"
                        size={24}
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onPress={onClose}
                    />

                    {!gameFinished ? (
                        <>
                            <Text style={styles.text2}>
                                Press Wrong {'\u274C'} if your answer is incorrect or Right {'\u2705'} if your answer is correct
                            </Text>
                            <TouchableOpacity onPress={toggleCard} style={styles.card}>
                                <Text style={styles.cardQuestion}>
                                    {showAnswer
                                        ? `A: ${gameCards[currentIndex].answer}`
                                        : `Q: ${gameCards[currentIndex].question}`}
                                </Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Button mode="contained" style={{ width: 120, margin: 2 }} onPress={markIncorrect}>
                                    Wrong {'\u274C'}
                                </Button>
                                <Button mode="contained" style={{ width: 120, margin: 2 }} onPress={markCorrect}>
                                    Right {'\u2705'}
                                </Button>
                            </View>
                        </>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.resultText}>Game Over!</Text>
                            <Text style={styles.resultText}>Correct Answers: {score.correct}</Text>
                            <Text style={styles.resultText}>Incorrect Answers: {score.incorrect}</Text>
                            {/* Shows retry button only if user got incorrect cards */}
                            {score.incorrect > 0 ? (
                                <>
                                    <Text style={styles.textBlack}>
                                        You got some answers wrong! Press "Retry" to try again with the cards you missed in the first round.
                                    </Text>
                                    <Button style={styles.gameButton} mode="contained" onPress={restartWithIncorrectCards}>
                                        Retry
                                    </Button>
                                </>
                            ) : (
                                <Text style={styles.textBlack}>
                                    Congratulations! You got all the answers right! {'\uD83C\uDF89'}{'\u2728'}
                                </Text>
                            )}


                            <Button style={styles.cancelButton} mode="contained" onPress={onClose}>
                                Exit Game
                            </Button>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

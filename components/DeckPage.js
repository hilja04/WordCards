import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

export default function DeckPage({ route }) {
    const { deck } = route.params; // Vastaanota deck tiedot

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.description}>{deck.description}</Text>
        </View>
    );
}

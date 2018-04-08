import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DeckListItem({ title, questions }) {
    return (
        <View style={styles.listItem}>
                <Text style={styles.title}>{title}</Text>
                {questions ? (
                    <Text>{questions.length} Cards</Text>
                ) : (
                    <Text>0 Cards</Text>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#fff',
        margin: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CFD8DC',
    },
    title: {
        fontSize: 30,
    }
})

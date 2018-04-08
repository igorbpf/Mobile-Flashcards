import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DeckListItem from './DeckListItem';
import { getDecks } from '../utils';
import { Entypo } from '@expo/vector-icons';


export default class DeckList extends Component {

    state = {
        decks: []
    }

    componentDidMount(){
        getDecks()
            .then(resp => {
                this.setState({ decks: Object.values(JSON.parse(resp)).reverse() })
            })
            .catch(err => console.warn(err))
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'DeckDetail', { name: item.title }
            )}>
                <DeckListItem {...item} />
            </TouchableOpacity>
        )
    }

    render(){
        const decks = getDecks()
        return (
            <View style={styles.container}>
                {this.state.decks.length > 0 ? (
                <View style={styles.list}>
                    <FlatList
                        data={this.state.decks}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.title}
                    />
            </View>
            ) : (
                <View style={styles.noDecks}>
                    <Entypo name='emoji-sad' size={80}/>
                    <Text style={styles.message}>
                        No decks available!
                    </Text>
                </View>
            )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    noDecks: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 25,
    }
})

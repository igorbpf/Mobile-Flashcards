import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { setLocalNotification, clearLocalNotifications } from '../utils/helpers';


export default class Score extends Component {

    componentDidMount(){
        clearLocalNotifications()
            .then(setLocalNotification)
    }

    toQuiz = () => {
        this.props.navigation.navigate('Quiz', {
            card: this.props.navigation.state.params.card,
        })
    }
    toDeck = () => {
        this.props.navigation.navigate('DeckDetail', {
            name: this.props.navigation.state.params.card.title,
        })
    }

    render(){
        const { score, totalQuestions } = this.props.navigation.state.params
        const ratio = score/totalQuestions
        return (
            <View style={styles.container}>
                { ratio <= 1/3 ? (
                    <View style={styles.faces}>
                        <Entypo name='emoji-sad' size={100}/>
                        <Text style={{fontSize: 20}}>That was bad!!!</Text>
                    </View>
                ) : ratio > 1/3 && ratio <= 2/3 ? (
                    <View style={styles.faces}>
                        <Entypo name='emoji-neutral' size={100}/>
                        <Text style={{fontSize: 20}}>Not very well...</Text>
                    </View>
                ) : (
                    <View style={styles.faces}>
                        <Entypo name='emoji-happy' size={100}/>
                        <Text style={{fontSize: 20}}>Not bad!!!</Text>
                    </View>
                )}
                <Text style={{fontSize: 20}}>
                    You scored {score} of {totalQuestions}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        style={styles.buttonQuiz}
                        onPress={this.toQuiz}>
                        <View>
                            <Text style={{fontSize: 15}}>
                                Restart Quiz
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonDeck}
                        onPress={this.toDeck}>
                        <View>
                            <Text style={{fontSize: 15}}>
                                Back to Deck
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonQuiz: {
        width: 150,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#90CAF9',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        marginBottom: 50,
    },
    buttonDeck: {
        width: 150,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#E6EE9C',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        marginBottom: 50,
    },
    faces: {
        justifyContent: 'space-between',
        height: 200,
        alignItems: 'center',
    }


})

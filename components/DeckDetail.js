import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { getDecks } from '../utils';


export default class DeckDetail extends Component {

    state = {
        card: undefined,
        bounceValue: new Animated.Value(1),
    }

    componentDidMount(){
        const { bounceValue } = this.state
        const title = this.props.navigation.state.params.name

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.2 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start()

        getDecks()
            .then(resp => {
                this.setState({
                    card: JSON.parse(resp)[title]
                })
            })
            .catch((err) => console.log(err))
    }

    goToAddCard = () => {
        this.props.navigation.navigate('NewCard', { title: this.state.card.title })
    }

    startQuiz = () => {
        this.props.navigation.navigate('Quiz', { card: this.state.card })
    }

    render(){
        const { bounceValue } = this.state
        return (
            <View style={styles.container}>
                {this.state.card && (
                    <View style={styles.container}>
                    <Animated.Text
                        style={[styles.title, {transform: [{scale: bounceValue}]}]}>
                        {this.state.card.title}
                    </Animated.Text>
                    <Animated.Text
                        style={[styles.numCards, {transform: [{scale: bounceValue}]}]}>
                        {this.state.card.questions.length} Cards
                    </Animated.Text>

                    <TouchableOpacity
                        style={styles.buttonAddCard}
                        onPress={this.goToAddCard}>
                        <View>
                            <Text style={{fontSize: 15}}>
                                Add Card
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.card.questions.length === 0 ? styles.buttonQuizDisabled : styles.buttonQuiz}
                        onPress={this.startQuiz}
                        disabled={this.state.card.questions.length === 0}>
                        <View>
                            <Text style={{color: 'white', fontSize: 15}}>
                                Start Quiz
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 20,
        fontSize: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numCards: {
        margin: 20,
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAddCard: {
        width: 200,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    buttonQuiz: {
        width: 200,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    buttonQuizDisabled: {
        width: 200,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
})

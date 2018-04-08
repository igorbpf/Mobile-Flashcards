import React, { Component } from 'React';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';


export default class Quiz extends Component {
    state = {
        questions: [],
        score: 0,
        numQuestions: 1,
        isQuestion: true,
        indexQuestion: 0,
    }

    componentDidMount(){
        this.setState({ questions: this.props.navigation.state.params.card.questions })
    }

    moveCard = () => {
        if (this.state.indexQuestion < this.state.questions.length - 1) {
            this.setState((prevState) => ({
                indexQuestion: prevState.indexQuestion + 1
            }))
        } else {
            this.moveToScore()
        }
    }

    moveToScore = () => {
        this.props.navigation.navigate('Score', {
            score: this.state.score,
            totalQuestions: this.state.questions.length,
            card: this.props.navigation.state.params.card,
        })
    }

    changeView = () => {
        this.setState((prevState) => ({ isQuestion: !prevState.isQuestion }))
    }

    accountScore = () => {
        this.setState((prevState) => ( { score: prevState.score + 1 }), () => this.moveQuestion())
    }

    moveQuestion = () => {
        this.setState((prevState) => ({ isQuestion: !prevState.isQuestion }), this.moveCard)
    }

    render(){
        const { questions, indexQuestion, isQuestion, score } = this.state
        return(
            <View style={styles.screen}>
                {questions.length > 0 && (
                    isQuestion ? (
                        <View style={{flex: 1}}>
                            <View style={{marginTop: 20, marginLeft: 20}}>
                                <Text style={{fontSize: 20}}>
                                    {indexQuestion + 1}/{questions.length}
                                </Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.text}>
                                    {questions[indexQuestion].question}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.changeView}>
                                <View>
                                    <Text style={{fontSize: 15, color: '#fff'}}>
                                        Show Answer
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <View style={{flex: 1}}>
                            <View style={{marginTop: 20, marginLeft: 20}}>
                                <Text style={{fontSize: 20}}>
                                    {indexQuestion + 1}/{questions.length}
                                </Text>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.text}>
                                    {questions[indexQuestion].answer}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity
                                style={styles.incorrectButton}
                                onPress={this.moveQuestion}>
                                <View>
                                    <Text>
                                        Incorrect
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.correctButton}
                                onPress={this.accountScore}>
                                <View>
                                    <Text>
                                        Correct
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    )
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    card: {
        flex: 1,
        margin: 10,
        marginTop: 140,
        marginBottom: 140,
        borderWidth: 1,
        minHeight: 120,
        borderColor: 'lightgrey',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CFD8DC',
    },
    text: {
        fontSize: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#000',
        width: 200,
        height: 40,
        borderRadius: 8,
        marginBottom: 50,

    },
    incorrectButton: {
        width: 150,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        marginBottom: 50,
    },
    correctButton: {
        width: 150,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        marginBottom: 50,
    }
})

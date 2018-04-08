import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { addCardToDeck } from '../utils';


export default class NewCard extends Component {

    state = {
        question: '',
        answer: '',
        isValidQuestion: false,
        isValidAnswer: false,
    }

    handleQuestionChange = (question) => {
        this.setState({
            question
        }, () => {
            if (this.state.question.length > 0) {
                this.setState({
                    isValidQuestion: true
                })
            } else {
                this.setState({
                    isValidQuestion: false
                })
            }
        })
    }

    handleAnswerChange = (answer) => {
        this.setState({
            answer
        }, () => {
            if (this.state.answer.length > 0) {
                this.setState({
                    isValidAnswer: true
                })
            } else {
                this.setState({
                    isValidAnswer: false
                })
            }
        })
    }


    clearInputs = () => {
        this.handleQuestionChange('')
        this.handleAnswerChange('')
    }

    showAlert = () => {
        Alert.alert(
                  'Card Added',
                  'Your card was added successfully',
                  [
                    {text: 'Back to Home', onPress: () =>  this.props.navigation.navigate('Home')},
                    {text: 'Add other card', onPress: this.clearInputs},
                  ],
                  { cancelable: false }
                )
    }

    showFail = () => {
        Alert.alert(
                  'Fail to add',
                  'Sorry!!!!',
                )
    }


    submitCard = () => {
        const { question, answer } = this.state
        const { title } = this.props.navigation.state.params
        const card = {
                question,
                answer,
            }

        addCardToDeck({ title, card })
            .then(this.showAlert)
            .catch((err) => this.showFail(err))

    }

    render(){
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                 placeholder='Question'
                 style={styles.textInput}
                 value={this.state.question}
                 onChangeText={this.handleQuestionChange}
                />
                 <TextInput
                  placeholder='Answer'
                  style={styles.textInput}
                  value={this.state.answer}
                  onChangeText={this.handleAnswerChange}
                />

             <TouchableOpacity
                 style={this.state.isValidQuestion && this.state.isValidAnswer ? styles.button : styles.buttonDisabled}
                 disabled={!this.state.isValidQuestion && !this.state.isValidAnswer}
                 onPress={this.submitCard}
                 >
                 <View>
                     <Text style={styles.buttonText}>
                         Submit
                     </Text>
                 </View>
             </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: 10,
        fontSize: 30,
    },
    textInput: {
        width: 200,
        height: 44,
        padding: 3,
        borderRadius: 8,
        borderColor: 'grey',
        margin: 30,
        fontSize: 20,
        overflow: 'visible',
    },
    button: {
        width: 200,
        borderRadius: 8,
        backgroundColor: '#388E3C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonDisabled: {
        width: 200,
        borderRadius: 8,
        backgroundColor: '#E53935',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 30,
        color: '#fff',
    }
})

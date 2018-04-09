import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { saveDeckTitle, getDecks } from '../utils';


export default class NewDeck extends Component {

    state = {
        deckName: '',
        isValid: false,
    }

    handleTextChange = (deckName) => {
        this.setState({
            deckName
        }, () => {
            if (this.state.deckName.length > 0) {
                this.setState({
                    isValid: true
                })
            } else {
                this.setState({
                    isValid: false
                })
            }
        })
    }

    goToDeckDetail = () => {
        const { deckName } = this.state
        this.setState({
            deckName: ''
        }, () => {
                this.setState({
                    isValid: false
                }, () => {
                    this.props.navigation.navigate('DeckDetail', { name: deckName })
                })
        })
    }

    showFail = (err) => {
        Alert.alert(
                  'Fail to add',
                  'Sorry!!!!',
                )
    }

    submitDeck = () => {
        saveDeckTitle(this.state.deckName)
            .then(this.goToDeckDetail)
            .catch(this.showFail)
    }

    render(){
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.text}>
                    What's the name of your new deck?
                </Text>
                <TextInput
                 placeholder='Deck Name'
                 style={styles.textInput}
                 value={this.state.deckName}
                 onChangeText={this.handleTextChange}
             />
             <TouchableOpacity
                 style={this.state.isValid ? styles.button : styles.buttonDisabled}
                 disabled={!this.state.isValid}
                 onPress={this.submitDeck}
                 >
                 <View>
                     <Text style={styles.buttonText}>
                         Create Deck
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
        padding: 8,
        borderRadius: 8,
        borderColor: 'grey',
        margin: 50,
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

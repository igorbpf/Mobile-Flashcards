import axios from 'axios';
import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = 'Flashcards:storage';

export function getDecks(){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: [],
        }
    }))
}

export function addCardToDeck({ title, card }){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
                .then(resp => {
                    const questions = JSON.parse(resp)[title].questions
                    AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
                        [title]: {
                            title,
                            questions: [...questions, card]
                        }
                    }))
                })
                .catch(err => console.log(err))
}


const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

// export function getDecks(){
//     return decks
// }

const fetcher = () => {
    return axios.create({
          baseURL: 'https://api.coinmarketcap.com/v1/',
      });
}

export function fetchCoins(){
    return fetcher().get('ticker/')
}

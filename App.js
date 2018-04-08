import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import DeckList from './components/DeckList';
import FlashStatusBar from './components/FlashStatusBar';
import DeckDetail from './components/DeckDetail';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import Score from './components/Score';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helpers';


const Tabs = TabNavigator({
    Home: {
        screen: DeckList,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='md-list' size={30} color={tintColor} />
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? 'white' : 'black',
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000',
            }
        },
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name}`,
   }),
   },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000',
            }
        },
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.card.title}`,
   }),
   },
    Score: {
        screen: Score,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000',
            }
        },
        navigationOptions: ({ navigation }) => ({
            title: 'Score',
   }),
   },
   NewCard: {
       screen: NewCard,
       navigationOptions: {
           headerTintColor: '#fff',
           headerStyle: {
               backgroundColor: '#000',
           }
       },
       navigationOptions: ({ navigation }) => ({
           title: 'Add New Card',
  }),
  }
}, {
    navigationOptions: {
        headerStyle: { paddingBottom : 20 }
    }
})


export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <View style={styles.container}>
          <FlashStatusBar backgroundColor={"#E0F7FA"} barStyle="light-content" />
          <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    // alignItems: 'stretch',
    // justifyContent: 'center',
  },
});

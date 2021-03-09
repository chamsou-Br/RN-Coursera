import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import Aboutus from './componenets/about';
import Contact from './componenets/contact';
import Main from './componenets/main'
import { comments } from './redux/comments';
import { dishes } from './redux/dishes';
import { leaders } from './redux/leaders';
import { promotions } from './redux/promotions';
import {favorites} from './redux/favorite'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

export default function App() {
  const store = createStore(
    combineReducers({
      dishes : dishes ,
      comments : comments,
      promotions : promotions,
      leaders : leaders ,
      favorites : favorites
    }),
    applyMiddleware(thunk, logger)
  )
  return (
    <Provider store={store}>
        <Main />
    </Provider>
    
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

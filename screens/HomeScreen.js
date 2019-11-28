import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder
} from 'react-native';
import {Card} from 'react-native-elements';
import data from './data.json'
import CharCard from './CharCard'
import Buttons from './Buttons'
const axios = require('axios')

import { MonoText } from '../components/StyledText';

class HomeScreen extends Component {
  constructor() {
    super()

    this.state = {
      characters: data
    }
  }

  componentWillMount() {
  }

  render() {
    const chars = this.state.characters.map(char => (
      <CharCard char={char} key={char.id}/>
    ))
    return (
      <View style={styles.top}>
      <View style={styles.container}>
        {chars}
      </View>
      <Buttons style={styles.buttons}/>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#F3FFBD',
    paddingBottom: 0
  },
  container: {
    height: '90%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    position: 'absolute',
    bottom: 0
  }
});


export default HomeScreen

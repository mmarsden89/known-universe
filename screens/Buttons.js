
import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import data from './data.json'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
const axios = require('axios')

import { MonoText } from '../components/StyledText';

class Buttons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: .5
    }
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.dislike}>
          <Icon
            name="times"
            size={50}
            color="#fff"
          />
        </View>
        <View style={styles.superlike}>
          <Icon
            name="star"
            size={40}
            color="#fff"
            style={styles.icon}
            />
        </View>
        <View style={styles.like}>
          <Icon
            name="heart"
            size={40}
            color="#fff"
            style={styles.icon}
            onClick={this.handleLike}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#F3FFBD',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  icon: {
    margin: 0,
    paddingTop: 5
  },
  like: {
    backgroundColor: '#70C1B3',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .5
  },
  dislike: {
    backgroundColor: '#FF1654',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  superlike: {
    backgroundColor: '#247BA0',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  }
});


export default Buttons

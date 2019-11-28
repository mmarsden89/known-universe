
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
import { LinearGradient } from 'expo-linear-gradient';
const axios = require('axios')

import { MonoText } from '../components/StyledText';

class CharCard extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })
        this.animatedValue.setValue({ x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.animatedValue.x, dy: this.animatedValue.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: .999,
          velocity: { x: gestureState.vx > 0 ? 2 : -2, y: 0 }
        }).start();
      },
    })
  }

  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform(),
    }
    const otherStyle = {
      rotate: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]})
    }
    return (
      <Animated.View style={[styles.hm, animatedStyle]}
      {...this.panResponder.panHandlers}>
        <Image
          style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          source={{uri: this.props.char.image}}/>
            <Text style={styles.titleText}>{this.props.char.name}, {34 + (this.props.char.born * -1) || 'hidden'}</Text>
            <Text numberOfLines={1}style={styles.baseText}>{this.props.char.species} @ {this.props.char.affiliations[0]}</Text>
            <LinearGradient
            colors={['rgba(0, 0, 0, .01)','rgba(0,0,0,.5)']}
            style={{ borderRadius: 5, flex: 1, marginTop: -50 }}>
        </LinearGradient>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  hm: {
    flex: 1,
    position: 'absolute',
    width: 350,
    height: 500,
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden'
  },
  titleText: {
    color: 'white',
    marginTop: -50,
    marginLeft: 15,
    fontSize: 20,
    zIndex: 5
  },
  baseText: {
    color: 'white',
    marginLeft: 15,
    zIndex: 5
  }
});


export default CharCard

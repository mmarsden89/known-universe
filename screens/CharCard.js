
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
    this.state = {
      animatedValue: new Animated.ValueXY()
    }
  }

  componentWillMount() {
    // this._value = {x: 0, y: 0}
    this._animatedValueX = 0
    this._animatedValueY = 0
    this.state.animatedValue.x.addListener((value) => this._animatedValueX = value.value);
    this.state.animatedValue.y.addListener((value) => this._animatedValueY = value.value);

    // this.animatedValue.addListener((value) => this._value = value);
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.animatedValue.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY,
        })
        this.state.animatedValue.setValue({ x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.animatedValue.x, dy: this.state.animatedValue.y}
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.animatedValue, {
          toValue: 0
        }).start();
      },
    })
  }

  render() {
    const animatedStyle = {
      transform: [
        {
          translateX: this.state.animatedValue.x
        },
        {
          translateY: this.state.animatedValue.y
        },
      {
        rotate: this.state.animatedValue.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]})
    }
  ]
}
    return (
      <Animated.View style={[styles.hm, animatedStyle]}
      {...this._panResponder.panHandlers}>
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

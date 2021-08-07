import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

const imageBaseUrl = require('../../assets/images/splash.png');

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={imageBaseUrl} resizeMode="center" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
});

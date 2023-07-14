import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../icons/mark.png')}
        style={styles.backgroundImage}
      />
      <Image source={require('../../icons/logo.png')} style={styles.logo} />
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>Appcrates Ltd</Text>
        <Text style={styles.bottomText}>All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundImage: {
    width: 479,
    height: 425,
    resizeMode: 'contain',
  },
  logo: {
    width: 135,
    height: 135,
    position: 'absolute',
    top: 350,
  },
  bottomView: {
    top: 130,
    alignItems: 'center',
  },
  bottomText: {
    color: '#000000',
    fontSize: 15,
  },
});

export default Splash;

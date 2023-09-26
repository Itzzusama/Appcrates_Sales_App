import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import images from '../../icons';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 1000);
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log('get token');
      navigation.replace('MyDrawer');
    } else {
      console.log('not token');

      navigation.replace('LoginScreen');
    }
  };
  return (
    <View style={styles.container}>
      <Image source={images.mark} style={styles.backgroundImage} />
      <Image source={images.logo} style={styles.logo} />
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

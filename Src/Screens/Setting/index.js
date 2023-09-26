import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../../icons';

const Setting = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={images.back} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Setting</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            source={require('../../icons/power-off.png')}
            style={styles.image}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  headerText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 120,
  },
});

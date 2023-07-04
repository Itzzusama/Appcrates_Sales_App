import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const AboutUs = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../icons/menu.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            source={require('../../icons/power-off.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutUs;

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
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
});

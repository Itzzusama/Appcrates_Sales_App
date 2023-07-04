import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawerContent = ({navigation, props}) => {
  const handleProfilePress = () => {};

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            source={require('../icons/profile.png')}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              borderWidth: 2,
              borderColor: 'grey',
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              marginLeft: 5,
              alignSelf: 'center',
            }}>
            {'Usama Aman'}
          </Text>
          <Text style={{color: 'black', marginLeft: 5, alignSelf: 'center'}}>
            {'React Native Developer'}
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
        style={{
          position: 'relative',
          right: 0,
          left: 0,
          bottom: 5,
          backgroundColor: 'rgb(231,230,230)',
        }}>
        <Text
          style={{
            backgroundColor: 'rgba(162,160,160,0.29)',
            width: '100%',
            height: 40,
            textAlign: 'center',
            paddingTop: 8,
          }}>
          <Image
            source={require('../icons/power-off.png')}
            style={{width: 15, height: 15, marginRight: 5}}
          />
          {'LogOut'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  profileText: {
    fontSize: 16,
  },
});

export default CustomDrawerContent;

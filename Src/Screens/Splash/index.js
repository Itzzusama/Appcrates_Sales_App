import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
// import { Image } from 'react-native'



const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen')
    }, 1000);
  })

  return (

    <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>

      <Image source={require('../../icons/logo.png')}
        style={{width: 150, height: 150 }}></Image>

     

    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})





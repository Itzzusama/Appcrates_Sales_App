import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Screens
import Splash from './Src/Screens/Splash';
import Home from './Src/Screens/Home';
import LoginScreen from './Src/Screens/LoginScreen';
import Tasks from './Src/Screens/Tasks';
import Notification from './Src/Screens/Notification';
import Leads from './Src/Screens/Leads';
import Interviews from './Src/Screens/Interviews';
import Interview from './Src/Screens/Interview';
import InterviewDetails from './Src/Screens/InterviewDetails';
import Profile from './Src/Screens/Profile';
import Setting from './Src/Screens/Setting';
import AboutUs from './Src/Screens/AboutUs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomDrawerContent from './Src/Components/CustomDrawerContent';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer({navigation, route}) {
  const {name, jobTitle} = route.params;
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      // drawerContent={props =>{CustomDrawerContent}}
      drawerContent={props => {
        return (
          <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
              <View>
                <Image
                  source={require('../Appcrates_App/Src/icons/profile.png')}
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
                  {name}
                </Text>
                <Text
                  style={{color: 'black', marginLeft: 5, alignSelf: 'center'}}>
                  {jobTitle}
                </Text>
              </View>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={{
                width: '45%',
                borderRadius: 20,
                elevation: 5,
                alignSelf: 'center',
                marginBottom: 40,
                backgroundColor: 'rgb(231,230,230)',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../Appcrates_App/Src/icons/power-off.png')}
                style={{width: 20, height: 20, marginLeft: 23, marginTop: 13}}
              />
              <Text
                style={{
                  height: 35,
                  marginLeft: 10,
                  marginTop: 12,
                  color: 'black',
                }}>
                {'logout'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="All Interviews" component={Interviews} />
      <Drawer.Screen name="All Test Tasks" component={Tasks} />
      <Drawer.Screen name="All Leads" component={Leads} />
      <Drawer.Screen
        name="My Profile"
        component={Profile}
        initialParams={{name, jobTitle}}
      />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="About Us" component={AboutUs} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          initialParams={{
            name: 'Team ReactNative',
            jobTitle: 'React Native Developer',
          }}
        />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Interview" component={Interview} />
        <Stack.Screen name="InterviewDetails" component={InterviewDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

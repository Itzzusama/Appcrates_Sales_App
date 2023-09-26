import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import messaging from '@react-native-firebase/messaging';
import CustomDrawerContent from './Src/Components/CustomDrawerContent';
import {useDispatch} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import images from './Src/icons';
import {store, persistor} from './Src/redux';
import {loginuserInfo} from './Src/redux/actions/userSession';

LogBox.ignoreAllLogs(true);
const Drawer = createDrawerNavigator();

function MyDrawer({navigation, route}) {
  const {name, jobTitle} = route.params;
  const [profileName, setProfileName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add the loading state
  const dispatch = useDispatch();
  useEffect(() => {
    profileData(); // Call the function to fetch the username
    fireBase();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'Hi, You have a new testTask arrived!',
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  }, []);

  const fireBase = async () => {
    const token = await messaging().getToken();
    console.log('Notification Tokken===>', token);
  };
  const profileData = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log('enter');
    try {
      const response = await axios.get(
        'https://sales.appcratesoperations.com/public/api/user_profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log('api res', response.data);
      setProfileName(response.data.first_name + ' ' + response.data.last_name);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true); // Set loading state to true when logout starts

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://sales.appcratesoperations.com/public/api/logout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('logout>>>', response.data);
      if (response.status === 200) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('LoginScreen');
        dispatch(loginuserInfo(null));
        // console.log('userinfo on logout', loginuserInfo);
      }
    } catch (error) {
      console.error('error during fetching logout api', error);
    }

    setIsLoading(false); // Set loading state to false when logout is completed
  };

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
                  source={images.profile}
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
                  {profileName}
                </Text>
                {/* <Text
                  style={{color: 'black', marginLeft: 5, alignSelf: 'center'}}>
                  {jobTitle}
                </Text> */}
              </View>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            {/* Show the loading indicator if isLoading is true */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
            <TouchableOpacity
              onPress={handleLogout}
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
                source={images.power_off}
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
    <Provider store={store}>
      <PersistGate loading={<Text>Loading ...</Text>} persistor={persistor}>
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
            <Stack.Screen
              name="InterviewDetails"
              component={InterviewDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // A semi-transparent background
  },
});

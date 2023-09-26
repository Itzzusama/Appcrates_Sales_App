import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../icons';

const Profile = ({navigation, route}) => {
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add this

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    console.log('enter');
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
      setUserData(response.data);
      const profileData = response.data.first_name + response.data.last_name;
      if (profileData) {
        await AsyncStorage.setItem(
          'profileData',
          `${userData.first_name}` + '' + `${userData.last_name}`,
        );
      }
      console.log('profile data response', profileData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
    setIsLoading(false);
  };
  const handleBoxPress = (heading, text) => {
    Alert.alert(heading, text);
  };
  const stackUser = () => {
    console.log('userDATA', userData);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image source={images.back} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Profile</Text>
          </View>
          <View style={styles.topContainer}>
            <View style={styles.iconContainer}>
              <Image source={images.profile} style={styles.icon} />
              <TouchableOpacity
                onPress={() =>
                  handleBoxPress(
                    'Change Image',
                    'You can change the image here.',
                  )
                }>
                <Image source={images.pen} style={styles.penIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.headingContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.headingContainerText}>Personal info</Text>
              </View>
              <View style={{height: 180, alignContent: 'center'}}>
                <View style={styles.infoContainer}>
                  <Text style={styles.headingText}>Your Name</Text>
                  <Text style={styles.headingSubText}>
                    {`${userData.first_name}`} {`${userData.last_name}`}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.headingText}>Department</Text>
                  <Text style={styles.headingSubText}>App Developer</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.headingText}>Stack</Text>
                  <View
                    style={{flexDirection: 'column', }}>
                    {userData?.tech_stacks?.map((stack, index) => (
                      <Text key={index} style={styles.headingSubText}>
                        {stack.tech_stack_details.name}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.headingContainer}>
              <View style={styles.infoContainer}>
                <Text style={[styles.headingContainerText, {marginTop: 50}]}>
                  Contact info
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.headingText}>Email</Text>
                <Text style={styles.headingSubText}>{`${userData.email}`}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.headingText}>Phone No</Text>
                <Text style={styles.headingSubText}>
                  {`${userData.phone_number}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
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
    marginRight: 130,
  },
  topContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  penIcon: {
    width: 24,
    height: 24,
    bottom: 15,
    left: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  headingContainer: {
    width: '80%',
    // marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  headingContainerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 20,
    right: 20,
  },
  headingSubText: {
    fontSize: 16,
    color: '#71CAB3',
    marginLeft: 20,
    flexDirection: 'column',
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#4286f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;

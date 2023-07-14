import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Profile = ({navigation, route}) => {
  const {name, jobTitle} = route.params;

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
    // Alert.alert('No Notifications');
  };

  const handleBoxPress = (heading, text) => {
    Alert.alert(heading, text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../icons/back.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image
            source={require('../../icons/notification.png')}
            style={styles.image}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.topContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../icons/profile.png')}
            style={styles.icon}
          />
          <TouchableOpacity
            onPress={() =>
              handleBoxPress('Change Image', 'You can change the image here.')
            }>
            <Image
              source={require('../../icons/pen.png')}
              style={styles.penIcon}
            />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{jobTitle}</Text> */}
        <View style={styles.headingContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.headingContainerText}>Personal info</Text>
          </View>
          <View style={{height: 180, alignContent: 'center'}}>
            <View style={styles.infoContainer}>
              <Text style={styles.headingText}>Your Name</Text>
              <Text style={styles.headingSubText}>{name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.headingText}>Department</Text>
              <Text style={styles.headingSubText}>App Developer</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.headingText}>Stack</Text>
              <Text style={styles.headingSubText}>{'React Native    '}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headingContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.headingContainerText}>Contact info</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.headingText}>Email</Text>
            <Text style={styles.headingSubText}>
              {'team.reactnative@appcrates.com'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.headingText}>Phone No</Text>
            <Text style={styles.headingSubText}>+92 300000000</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
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

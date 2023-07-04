import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Profile = ({ navigation, route }) => {

  const { name, jobTitle } = route.params;

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
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../icons/menu.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            source={require('../../icons/power-off.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../icons/profile.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{jobTitle}</Text>
        <View style={styles.headingContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.headingText}>Department</Text>
            <Text style={styles.headingSubText}>App Developer</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.headingText}>Stack</Text>
            <Text style={styles.headingSubText}>{'React Native    '}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.headingText}>Phone No</Text>
            <Text style={styles.headingSubText}>+92 3071224772</Text>
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
  topContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
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
    marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  headingSubText: {
    fontSize: 16,
    color: 'gray',
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

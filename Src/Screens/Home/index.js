import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';

const Home = ({navigation}) => {
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
        <TouchableOpacity onPress={handleNotificationPress}>
          <Image
            source={require('../../icons/notification.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress("Today's Task", 'No task assigned')}>
          <Text style={styles.boxHeading}>Today's Task</Text>
          <Text style={styles.taskText}>No task assigned</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress('Pending Task', 'No task assigned')}>
          <Text style={styles.boxHeading}>Pending Task</Text>
          <Text style={styles.taskText}>No task assigned</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.rectangle}
        onPress={() => handleBoxPress('Progress', 'No Record Found')}>
        <Text style={styles.heading}>Progress</Text>
        <Text style={styles.bodyText}>No Record Found</Text>
      </TouchableOpacity>
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  box: {
    width: 170,
    height: 170,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  boxHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    alignSelf: 'center',
  },
  taskText: {
    fontSize: 16,
    color: 'black',
  },
  rectangle: {
    height: '50%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 1,
    elevation: 3,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  bodyText: {
    fontSize: 16,
    color: 'black',
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

export default Home;

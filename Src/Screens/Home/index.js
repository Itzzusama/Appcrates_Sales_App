import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Home = ({navigation}) => {
  const handleNotificationPress = () => {
    navigation.navigate('Notification');
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
        <Text style={styles.headerText}>Dashboard</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Image
            source={require('../../icons/Notification_Icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress("Today's Task", 'No task assigned')}>
          <Image
            source={require('../../icons/Interview.png')}
            style={styles.icon}
          />
          <Text style={styles.taskText}>Total No of Interviews Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress('Pending Task', 'No task assigned')}>
          <Image
            source={require('../../icons/interview_Today.png')}
            style={styles.icon}
          />
          <Text style={styles.taskText}>Total No of Interviews Today</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.belowLineContainer}>
          <Image
            style={styles.lineImage}
            source={require('../../icons/Line.png')}
          />
          <Text style={styles.middleText}>Quick Menu</Text>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('All Interviews')}>
            <Image
              source={require('../../icons/allInterview.png')}
              style={styles.boxImage}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boxText}>View All Interviews</Text>
              <Image
                source={require('../../icons/arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('All Test Tasks')}>
            <Image
              source={require('../../icons/testTask.png')}
              style={styles.boxImage}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boxText}>View All Test Tasks</Text>
              <Image
                source={require('../../icons/arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('All Leads')}>
            <Image
              source={require('../../icons/Leads.png')}
              style={styles.boxImage}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boxText}>View All Leads</Text>
              <Image
                source={require('../../icons/arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../icons/Notification_Icon.png')}
              style={styles.boxImage}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boxText}>All Notifications</Text>
              <Image
                source={require('../../icons/arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('My Profile')}>
            <Image
              source={require('../../icons/Profile_Icon.png')}
              style={styles.boxImage}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boxText}>My Profile</Text>
              <Image
                source={require('../../icons/arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('Setting')}>
            <Image
              source={require('../../icons/Settings.png')}
              style={styles.boxImage}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boxText}>Account Settings</Text>
              <Image
                source={require('../../icons/arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    tintColor: '#1DAB87',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'white',
    marginBottom: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  box: {
    width: 156,
    height: 114,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1DAB87',
  },
  optionBox: {
    width: 156,
    height: 114,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#1DAB87',
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    width: '80%',
  },
  bottomContainer: {
    flex: 1,
  },
  belowLineContainer: {
    alignItems: 'center',
  },
  lineImage: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  middleText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  boxImage: {
    width: 32,
    tintColor: 'white',
    height: 32,
    marginBottom: 10,
    marginLeft: 13,
  },
  arrowImage: {
    width: 14,
    height: 14,
    bottom: 40,
    marginLeft: 20,
    tintColor: 'white',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 13,
    width: 95,
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

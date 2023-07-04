import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import TaskComponent from '../../Components/TaskComponent';
import {ScrollView} from 'react-native-gesture-handler';

const Leads = ({navigation}) => {
  const handleNotificationPress = () => {
    navigation.navigate('Notification');
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

      {/* main body */}
      <ScrollView style={styles.topContainer}>
        <View>
          <TaskComponent
            heading={'Lead 1'}
            Time={'10:00 AM'}
            description={'Test Task'}
            bodyText={'Discuss project timeline and deliverable'}
          />
          <TaskComponent
            heading={'Lead 2'}
            Time={'12:00 AM'}
            description={'Scrum'}
            bodyText={'Review marketing strategies for upcoming campaign'}
          />
          <TaskComponent
            heading={'Lead 3'}
            Time={'01:00 PM'}
            description={'Meeting'}
            bodyText={'Brainstorm ideas for product improvement'}
          />
          <TaskComponent
            heading={'Lead 4'}
            Time={'03:00 PM'}
            description={'Progress Report'}
            bodyText={'Present quarterly financial report to stakeholders'}
          />
          <TaskComponent
            heading={'Lead 5'}
            Time={'03:00 PM'}
            description={'Test Task'}
            bodyText={'Provide training on new company policies and procedures'}
          />
          <TaskComponent
            heading={'Lead 6'}
            Time={'03:00 PM'}
            description={'Test Task'}
            bodyText={
              'Evaluate project progress and identify potential roadblocks'
            }
          />
          <View style={{marginBottom: 40}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Leads;

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
  rectangle: {
    height: '30%',
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
  topContainer: {
    paddingTop: 10,
  },
});

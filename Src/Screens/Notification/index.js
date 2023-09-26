import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useEffect} from 'react';
import {NotificationListner} from '../../utils/pushNotification';
import messaging from '@react-native-firebase/messaging';
import images from '../../icons';
const Notification = ({navigation}) => {
  useEffect(() => {
    // NotificationListner;
    let token = messaging().getToken();
    console.log('Notification Token', token);
  }, []);

  const notifications = [
    {
      id: '1',
      title: 'Hi Umar!',
      message: 'You have a pending TestTask to submit today before 2:00am.',
    },
    {
      id: '2',
      title: 'Hi Umar!',
      message: 'You have a pending TestTask to submit today before 2:00am.',
    },
    {
      id: '3',
      title: 'Hi Umar!',
      message: 'You have a pending TestTask to submit today before 2:00am.',
    },
    {
      id: '4',
      title: 'Hi Umar!',
      message: 'You have a pending TestTask to submit today before 2:00am.',
    },
    {
      id: '5',
      title: 'Hi Umar!',
      message: 'You have a pending TestTask to submit today before 2:00am.',
    },
    {
      id: '6',
      title: 'Hi Umar!',
      message: 'You have a pending TestTask to submit today before 2:00am.',
    },
  ];

  const onIdeaPress = () => {
    Alert.alert('Notifications will appear here');
  };

  const handleNotificationPress = item => {
    Alert.alert(item.title, item.message);
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item)}>
      <View style={styles.notificationItem}>
        <View style={styles.notificationContainer}>
          <Image source={images.small_icon} style={styles.smallIcon} />
          <Text style={styles.notificationTextTitle}>Test Task</Text>
          <Image source={images.arrow} style={styles.dropdownIcon} />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTextTitleMain}>{item.title}</Text>
          <Text style={styles.notificationTextMessage}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={images.back} style={styles.leftImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity onPress={onIdeaPress}>
          <Image source={images.idea} style={styles.rightImage} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderNotificationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  leftImage: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  rightImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallIcon: {
    width: 12,
    height: 13,
    resizeMode: 'contain',
    // marginRight: 4,
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    marginLeft: 195,
  },
  notificationTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 4,
  },
  notificationTextTitleMain: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 2,
  },
  notificationItem: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    height: 140,
    width: 340,
    alignSelf: 'center',
    elevation: 5,
  },
  notificationIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 8,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTextMessage: {
    fontSize: 16,
    color: '#666',
    marginLeft: 2,
  },
});

export default Notification;

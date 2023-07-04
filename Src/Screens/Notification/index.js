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

const Notification = ({navigation}) => {
  const notifications = [
    {
      id: '1',
      title: 'Notification 1',
      message: 'This is the first notification.',
    },
    {
      id: '2',
      title: 'Notification 2',
      message: 'This is the second notification.',
    },
    {
      id: '3',
      title: 'Notification 3',
      message: 'This is the third notification.',
    },
  ];
  const onIdeaPress = () => {
    Alert.alert('Notifications will appear here');
  };
  const renderNotificationItem = ({item}) => {
    const handleNotificationPress = () => {
      Alert.alert(item.title, item.message);
    };

    return (
      <TouchableOpacity onPress={handleNotificationPress}>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Image
            source={require('../../icons/back.png')}
            style={styles.leftImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity onPress={onIdeaPress}>
          <Image
            source={require('../../icons/idea.png')}
            style={styles.rightImage}
          />
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
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  rightImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  notificationItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#666',
  },
});

export default Notification;

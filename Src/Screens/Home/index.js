import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import images from '../../icons';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const Home = ({navigation, route}) => {
  useEffect(() => {
    loginInformation();
  }, []);

  const {loginInfo} = useSelector(state => state.userSession);
  const isSuperAdmin = loginInfo?.lead_status === 1;
  const [loginUpdate, setLoginUpdate] = useState(loginInfo);
  const loginInformation = () => {
    setLoginUpdate(loginInfo);
  };
  // console.log('admin', loginInfo?.lead_status);
  // console.log('login info ---->>>>', loginInfo);

  // const [todayData, setTodayData] = useState(todayInterview);
  // const {todaysInterview} = route.params.todayInterview;
  // const inteviewData = route.params.todayInterview
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loginInformation(``);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [isLeadsButtonDisabled, setIsLeadsButtonDisabled] = useState(
    !isSuperAdmin,
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={images.menu} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Image source={images.Notification_Icon} style={styles.image} />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.topContainer}>
          <View style={styles.box}>
            <Image source={images.interview} style={styles.icon} />
            <Text style={styles.taskText}>Total No of Interviews Today</Text>
            <Text style={styles.taskText}>
              {loginUpdate?.total_interviews_today}
            </Text>
            {/* <Text style={styles.taskText}>{item?.total_interviews_today}</Text> */}
          </View>

          <View style={styles.box}>
            <Image source={images.interview_Today} style={styles.icon} />
            <Text style={styles.taskText}>Total No of TestTasks Today</Text>
            <Text style={styles.taskText}>
              {loginUpdate?.total_test_tasks_today}
            </Text>
            {/* <Text style={styles.taskText}>{item.total_interviews_today}</Text> */}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.belowLineContainer}>
            <Image style={styles.lineImage} source={images.Line} />
            <Text style={styles.middleText}>Quick Menu</Text>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('All Interviews')}>
              <Image source={images.allInterview} style={styles.boxImage} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.boxText}>View All Interviews</Text>
                <Image source={images.arrow} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('All Test Tasks')}>
              <Image source={images.testTask} style={styles.boxImage} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.boxText}>View All Test Tasks</Text>
                <Image source={images.arrow} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.optionBox,
                isLeadsButtonDisabled && styles.disabledButton,
              ]}
              onPress={() => {
                if (!isLeadsButtonDisabled) {
                  navigation.navigate('All Leads');
                }
              }}
              disabled={isLeadsButtonDisabled}>
              <Image source={images.Leads} style={styles.boxImage} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.boxText}>View All Leads</Text>
                <Image source={images.arrow} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={images.Notification_Icon}
                style={styles.boxImage}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.boxText}>All Notifications</Text>
                <Image source={images.arrow} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('My Profile')}>
              <Image source={images.Profile_icon} style={styles.boxImage} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.boxText}>My Profile</Text>
                <Image source={images.arrow} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('Setting')}>
              <Image source={images.Setting} style={styles.boxImage} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.boxText}>Account Settings</Text>
                <Image source={images.arrow} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  disabledButton: {
    backgroundColor: '#D3D3D3', // Use a different color for disabled state
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

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  ScrollView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-render-html';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../icons';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

const Interview = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const {leadsDetails} = route.params || {};
  // console.log('lead description', leadsDetails.get_leadfiles[0].cv);
  // const {testTasksData} = useSelector(state => state.userSession);
  // const {inteviewData} = useSelector(state => state.userSession);
  // console.log('this is test task data===?', inteviewData);

  // const {interviewDetail = {}} = route.params || {};
  // const {testTasksDetails = {}} = route.params || {};

  const checkPermission = async url => {
    if (Platform.OS === 'ios') {
      downloadImage(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          setLoading(true);
          downloadImage(url);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = url => {
    // Main function to download the image
    if (!url) {
      Alert.alert('No attachments found');
      setLoading(false);
      return;
    }

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = url;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        setLoading(false);
        alert('Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  useEffect(() => {
    // fetchData();
  }, []);
  // route.params.interviewDetail;
  // console.log('interview data ', route.params.interviewDetail);
  // console.log('interview data ', route.params.leadsDetails);

  // parameter coming from Interview Screen
  const [interviewDetail, setInterviewDetail] = useState(
    route.params?.interviewDetail,
  );
  const [index, setIndex] = useState(route.params?.index);
  // console.log('interviewDetail----', interviewDetail);

  // parameter coming from lead screen
  const [leadsDetailsIndex, setLeadsDetailsIndex] = useState(
    route.params?.index,
  );
  // parameter coming from Test Tasks screen
  const [testTasksDetails, setTestTasksDetails] = useState(
    route.params?.testTasksDetails,
  );
  // console.log('test task data ', route.params?.testTasksDetails[13].get_testtaskfiles[0].image);
  const [testTasksDetailsindex, setTestTasksDetailsindex] = useState(
    route.params?.index,
  );
  // console.log(
  //   'testtaskfiles===',
  //   testTasksDetails[testTasksDetailsindex]?.get_testtaskfiles[0].image,
  // );

  return (
    <View style={styles.container}>
      {interviewDetail ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image source={images.back} style={styles.leftImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Interview</Text>
        </View>
      ) : null}
      {leadsDetails ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image source={images.back} style={styles.leftImage} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {right: 35}]}>Lead</Text>
        </View>
      ) : null}
      {testTasksDetails ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image source={images.back} style={styles.leftImage} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {right: 15}]}>Test Task</Text>
        </View>
      ) : null}

      {/* for Interview */}
      {interviewDetail ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.redBox}>
            <View style={styles.centeredBox}>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Client Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index]?.leads?.client_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Profile Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].leads.profile_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Company Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].leads.client_company_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Interview Date</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].interview_date}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Experience</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].leads.experience}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>CCTC</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].leads.cctc}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>ECTC</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].leads.ectc}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Notice Period</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[index].leads.notice_period}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.blueBox}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                Interview Description
              </Text>
            </View>
            <View
              style={{alignItems: 'center', marginTop: 10, marginBottom: 30}}>
              <Text style={{width: '90%', color: 'black'}}>
                {interviewDetail[index].description}
              </Text>
            </View>
          </View>
          <View style={styles.blueBox}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
              }}>
              Interview Link
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(interviewDetail[0]?.link);
              }}
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'blue',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  width: 320,
                }}>
                {interviewDetail[0].link}
              </Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', marginTop: 10}}></View>
          </View>
          <View style={styles.detailsBox}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('InterviewDetails', {
                  interviewDetail: interviewDetail,
                  interviewDetailIndex: index,
                })
              }>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 15,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                  View this lead details
                </Text>
                <Image
                  style={{height: 12, width: 12, left: 80, top: 3}}
                  source={images.arrow}
                />
              </View>
              <View style={{alignItems: 'center', marginTop: 10}}></View>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                fontSize: 11,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 8,
              }}>
              Are you attending the interview
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      {/* for leads */}
      {leadsDetails ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.redBox}>
            <View style={styles.centeredBox}>
              {leadsDetails?.client_name ? (
                <View style={styles.infoRow}>
                  <Text style={styles.boldText}>Client Name</Text>
                  <Text style={styles.colonText}>:</Text>
                  <Text style={styles.infoText}>
                    {leadsDetails?.client_name}
                  </Text>
                </View>
              ) : null}
              {leadsDetails?.client_company_name ? (
                <View style={styles.infoRow}>
                  <Text style={styles.boldText}>Company Name</Text>
                  <Text style={styles.colonText}>:</Text>
                  <Text style={styles.infoText}>
                    {leadsDetails?.client_company_name}
                  </Text>
                </View>
              ) : null}
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Profile Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {leadsDetails?.profile_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Profile Email</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {leadsDetails?.profile_email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Lead Date</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{leadsDetails?.lead_date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Lead Creation Times </Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{`${moment(
                  leadsDetails.created_at,
                ).fromNow()}`}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Lead Title</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{leadsDetails?.lead_title}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Client Location</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {leadsDetails?.client_location}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Notice period</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {leadsDetails?.notice_period}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Experience</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{leadsDetails?.experience}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>CCTC</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{leadsDetails?.cctc}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>ECTC</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{leadsDetails?.ectc}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Tech Stack</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {leadsDetails?.technology_stack}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Lead Status</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>{leadsDetails?.lead_status}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Lead Added By</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {leadsDetails?.lead_winner_name}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.blueBox}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
              }}>
              Job Description
            </Text>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 20,
                  width: 305,
                  marginRight: 20,
                }}>
                <HTML
                  source={{html: leadsDetails.description}}
                  tagsStyles={{
                    p: {
                      fontSize: 14,
                      color: 'black',
                      fontWeight: 'bold',
                      width: 320,
                    },
                    ul: {
                      marginLeft: 20,
                    },
                    li: {
                      fontSize: 14,
                      color: 'black',
                      marginLeft: 10,
                    },
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 30,
                marginBottom: 20,
              }}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 120,
            }}>
            <TouchableOpacity
              onPress={() => checkPermission(leadsDetails.get_leadfiles[0].cv)}>
              <View
                style={{
                  height: 50,
                  width: 100,
                  backgroundColor: '#1DAB87',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'white'}}>{'CV'}</Text>
                <Image
                  style={{height: 32, width: 32, tintColor: 'white'}}
                  source={images.CV}
                />
              </View>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            <TouchableOpacity
              onPress={() =>
                checkPermission(leadsDetails.get_leadfiles[0].contract_file)
              }>
              <View
                style={{
                  height: 50,
                  width: 100,
                  backgroundColor: '#1DAB87',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginLeft: 20,
                }}>
                <Text style={{color: 'white'}}>{'Files'}</Text>
                <Image
                  style={{height: 32, width: 32, tintColor: 'white'}}
                  source={images.files}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      {/* for TestTasks */}
      {testTasksDetails ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.redBox}>
            <View style={styles.centeredBox}>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Client Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.client_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Company Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {
                    testTasksDetails[testTasksDetailsindex]?.leads
                      .client_company_name
                  }
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Profile Name</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.profile_name}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Test Task Deadline</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.test_task_date}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Test Task Time</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.test_task_time}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Experience</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.experience}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>Notice Period</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.notice_period}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>CCTC</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.cctc}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>ECTC</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.ectc}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.blueBox}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                Test Task Description
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{width: '90%', color: 'black', marginBottom: 20}}>
                {testTasksDetails[testTasksDetailsindex]?.description}
                {
                  testTasksDetails[testTasksDetailsindex]?.get_testtaskfiles[0]
                    ?.image
                }
              </Text>
            </View>
            <View style={{alignSelf: 'flex-start'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  marginBottom: 10,
                  marginTop: 40,
                  marginLeft: 10,
                }}>
                {'Attached Files:'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() =>
                  checkPermission(
                    testTasksDetails[testTasksDetailsindex]
                      ?.get_testtaskfiles[0]?.image,
                  )
                }>
                <View
                  style={{
                    height: 50,
                    width: 100,
                    backgroundColor: '#1DAB87',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: 'white'}}>{'Files'}</Text>
                  <Image
                    style={{height: 32, width: 32, tintColor: 'white'}}
                    source={images.files}
                  />
                </View>

                {loading && <ActivityIndicator size="small" color="#0000ff" />}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.blueBox}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
              }}>
              Test Task URL
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(testTasksDetails[testTasksDetailsindex]?.link);
              }}
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'blue',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  width: 320,
                }}>
                {testTasksDetails[testTasksDetailsindex]?.link}
              </Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', marginTop: 10}}></View>
          </View>
          <View style={styles.detailsBox}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('InterviewDetails', {
                  testTasksDetails: testTasksDetails,
                  testTasksDetailsindex: testTasksDetailsindex,
                })
              }>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 15,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                  View this Lead Details
                </Text>
                <Image
                  style={{height: 12, width: 12, left: 80, top: 3}}
                  source={images.arrow}
                />
              </View>
              <View style={{alignItems: 'center', marginTop: 10}}></View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 11,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 8,
              }}>
              Are you attending the interview
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    // backgroundColor: 'red',
    // borderBottomWidth:2,
    // padding:5
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginRight: 115,
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
  scrollContainer: {
    flexGrow: 1,
  },
  redBox: {
    // width: 342,
    width: '98%',
    alignSelf: 'center',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 16,
    elevation: 6,
    backgroundColor: 'white',
    marginTop: 10,
  },
  centeredBox: {
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
    width: '50%',
    color: 'black',
  },
  colonText: {
    fontSize: 14,
    color: 'black',
  },
  infoText: {
    fontSize: 14,
    color: 'black',
    width: '40%',
    marginLeft: 30,
  },
  yellowBox: {
    // height: 291,
    width: '98%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 16,
    elevation: 6,
    backgroundColor: 'white',
    width: 342,
    alignSelf: 'center',
  },
  blueBox: {
    borderRadius: 16,
    width: '98%',
    alignSelf: 'center',
    marginTop: 10,
    elevation: 6,
    backgroundColor: 'white',
    marginBottom: 70,
  },
  detailsBox: {
    borderRadius: 16,
    width: '98%',
    alignSelf: 'center',
    marginTop: 10,
    elevation: 6,
    backgroundColor: '#ADD8E6',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginBottom: 80,
  },
  acceptButton: {
    backgroundColor: '#4ED964',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: 'red',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Interview;

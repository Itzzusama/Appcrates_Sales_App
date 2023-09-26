import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Linking,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import images from '../../icons';
import HTML from 'react-native-render-html';
import RNFetchBlob from 'rn-fetch-blob';

const InterviewDetails = ({navigation, route}) => {
  useEffect(() => {}, []);

  const [interviewDetail, setInterviewDetail] = useState(
    route.params.interviewDetail,
  );

  const [interviewDetailIndex, setInterviewDetailIndex] = useState(
    route.params.interviewDetailIndex,
  );
  // console.log(
  //   'Interview Details>>>',
  //   interviewDetail[interviewDetailIndex]?.leads.get_leadfiles[0]?.cv,
  // );
  // console.log("interviewDetail.leads.description",interviewDetail);
  const [testTasksDetails, setTestTasksDetails] = useState(
    route.params.testTasksDetails,
  );
  const [testTasksDetailsindex, setTestTasksDetailsindex] = useState(
    route.params.testTasksDetailsindex,
  );
  const [loading, setLoading] = useState(false);

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
          Alert.alert('Storage Permission Not Granted');
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

        alert(' Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.container}>
      {interviewDetail ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image source={images.back} style={styles.leftImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{'Interview Details'}</Text>
        </View>
      ) : null}

      {testTasksDetails ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image source={images.back} style={styles.leftImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{'Lead Details'}</Text>
        </View>
      ) : null}
      {interviewDetail ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.redBox}>
            <View style={styles.centeredBox}>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Client Name'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.client_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Company Name'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {
                    interviewDetail[interviewDetailIndex].leads
                      .client_company_name
                  }
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Profile Name'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.profile_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Profile Email'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.profile_email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Client Location'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.client_location}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Experience'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.experience}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Notice Period'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.notice_period}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'CCTC'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.cctc}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'ECTC'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.ectc}
                </Text>
              </View>
              {/* <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Job URL'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail.leads.job_url}
                </Text>
              </View> */}
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Lead Added on'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.lead_date}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Tech Stack'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.technology_stack}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Lead Status'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.lead_status}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Lead Added By'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {interviewDetail[interviewDetailIndex].leads.lead_winner_name}
                </Text>
              </View>
              <View style={{alignItems: 'center', marginTop: 15}}>
                <Text
                  style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                  {'Job Description'}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  width: 305,
                  marginTop: 10,
                  marginLeft: 20,
                  marginRight: 10,
                }}>
                <HTML
                  source={{
                    html: interviewDetail[interviewDetailIndex].leads
                      .description,
                  }}
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    checkPermission(
                      interviewDetail[interviewDetailIndex]?.leads
                        ?.get_leadfiles[0]?.cv,
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
                    <Text style={{color: 'white'}}>{'CV'}</Text>
                    <Image
                      style={{height: 32, width: 32, tintColor: 'white'}}
                      source={images.CV} //{interviewDetail[interviewDetailIndex].leads.get_leadfiles[0]?.cv}
                    />
                  </View>
                </TouchableOpacity>
                {loading && <ActivityIndicator size="small" color="#0000ff" />}
                <TouchableOpacity
                  onPress={() =>
                    checkPermission(
                      interviewDetail[interviewDetailIndex]?.leads
                        ?.get_leadfiles[0]?.contract_file,
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
            </View>
          </View>

          {/* <View>
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
          </View> */}
        </ScrollView>
      ) : null}
      {/* for testTaskDetails  */}
      {testTasksDetails ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.redBox}>
            <View style={styles.centeredBox}>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Client Name'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.client_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Company Name'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {
                    testTasksDetails[testTasksDetailsindex]?.leads
                      .client_company_name
                  }
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Profile Name'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.profile_name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Profile Email'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.profile_email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Client Location'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {
                    testTasksDetails[testTasksDetailsindex]?.leads
                      .client_location
                  }
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Experience'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.experience}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Notice Period'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.notice_period}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'CCTC'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.cctc}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'ECTC'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.ectc}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Lead Added on'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.lead_date}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Tech Stack'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {
                    testTasksDetails[testTasksDetailsindex]?.leads
                      .technology_stack
                  }
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Lead Status'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {testTasksDetails[testTasksDetailsindex]?.leads.lead_status}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.boldText}>{'Lead Added By'}</Text>
                <Text style={styles.colonText}>:</Text>
                <Text style={styles.infoText}>
                  {
                    testTasksDetails[testTasksDetailsindex]?.leads
                      .lead_winner_name
                  }
                </Text>
              </View>
              <View style={{alignItems: 'center', marginTop: 15}}>
                <Text
                  style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                  {'Job Description'}
                </Text>
              </View>
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
                    marginRight: 20,
                    width: 305,
                  }}>
                  <HTML
                    source={{
                      html: testTasksDetails[testTasksDetailsindex]?.leads
                        .description,
                    }}
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
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    checkPermission(
                      testTasksDetails[testTasksDetailsindex]?.leads
                        ?.get_leadfiles[0]?.cv,
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
                    <Text style={{color: 'white'}}>{'CV'}</Text>
                    <Image
                      style={{height: 32, width: 32, tintColor: 'white'}}
                      source={images.CV}
                    />
                  </View>
                  {loading && (
                    <ActivityIndicator size="small" color="#0000ff" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    checkPermission(
                      testTasksDetails[testTasksDetailsindex]?.leads
                        ?.get_leadfiles[0]?.contract_file,
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
            </View>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginRight: 100,
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
    // height: 696,
    paddingBottom: 10,
    paddingTop: 20,
    width: '99%',
    alignSelf: 'center',
    marginBottom: 70,
    alignItems: 'center',
    borderRadius: 16,
    elevation: 6,
    backgroundColor: 'white',
    marginTop: 10,
  },
  centeredBox: {
    flex: 1,
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
    height: 291,
    borderRadius: 16,
    elevation: 6,
    backgroundColor: 'white',
    width: '98%',
    alignSelf: 'center',
  },
  blueBox: {
    borderRadius: 16,
    height: 188,
    width: '98%',
    alignSelf: 'center',
    marginTop: 10,
    elevation: 6,
    backgroundColor: 'white',
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

export default InterviewDetails;

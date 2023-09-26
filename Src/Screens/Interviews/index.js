import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  TextInput,
  SafeAreaView,
  FlatList,
  Button,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserData} from '../../redux/actions/action';
import images from '../../icons';
import {interviewData} from '../../redux/actions/userSession';
import {useIsFocused} from '@react-navigation/native';

const Interviews = ({navigation}) => {
  const {interviewsData} = useSelector(state => state.userSession);
  const isFocused = useIsFocused();
  // console.log('Interview DATA======', interviewsData);
  const [isTodaysInterviewOnly, setIsTodaysInterviewOnly] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [interViewArray, setInterViewArray] = useState([...interviewsData]);
  const [token, setToken] = useState('');
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState('');
  const [myUserData, setMyUserData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  // const interviews = useSelector(state => state.interviews.inteviewData);
  // console.log('myreduxData', interviews);

  // useEffect(() => {
  //   dispatch(fetchUserData)
  // }, []);

  // useEffect(()=>{
  //   setUserData(interviews)
  // },[interviews])
  useEffect(() => {
    fetchData();
    console.log("imhereeeeeeeeeeeee");
  }, [isFocused]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  useEffect(() => {
    if (selectedStartDate === null && selectedEndDate === null) {
      handleOptionPress();
    }
  }, [selectedStartDate, selectedEndDate]);

  // console.log('myUserData', userData);

  const fetchData = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    // console.log('enter');
    try {
      const response = await axios.get(
        'https://sales.appcratesoperations.com/public/api/get_Interviews',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log('api res', response.data);
      dispatch(interviewData(response.data.interviews));
      // console.log('this is redux----->', interviewData);

      setUserData(response.data.interviews);
      setMyUserData(response.data.interviews);
      // console.log('Interview Data ', userData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleCalendarPress = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleDayPress = day => {
    if (!selectedStartDate) {
      setSelectedStartDate(day.dateString);
    } else if (!selectedEndDate) {
      setSelectedEndDate(day.dateString);
    } else {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    }
  };

  const handleOptionPress = (isTodayPress = isTodaysInterviewOnly) => {
    console.log(`selectedStartDate===`, selectedStartDate);
    console.log(`selectedEndDate===`, selectedEndDate);
    const todayDate = new Date().toISOString().split('T')[0];

    if (isTodayPress) {
      let filteredInterviews = [...interviewsData].filter(interview => {
        return interview.interview_date === todayDate;
        // console.log('in today========');
      });
      setInterViewArray(filteredInterviews);
    } else if (selectedStartDate !== null && selectedEndDate !== null) {
      console.log('in filter=================');
      const filterCalenderDAta = [...interviewsData].filter(item => {
        return (
          item.interview_date >= selectedStartDate &&
          item.interview_date <= selectedEndDate
        );
      });
      console.log("filterCalenderDAta=====",filterCalenderDAta);
      setInterViewArray(filterCalenderDAta);
    } else {
      console.log('in else====================');
      setInterViewArray([...interviewsData]);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const handleSearch = searchText => {
    setSearchQuery(searchText);
  };
  const clearFilter = () => {};
  const renderRectangularBox = ({item, index}) => {
    // Filter the data based on the search query
    if (searchQuery.trim() !== '') {
      const clientName = interViewArray[index].leads.client_name.toLowerCase();
      if (!clientName.includes(searchQuery.toLowerCase())) {
        return null; // If the client name doesn't match the search query, don't render the item
      }
    }

    const {client_name, client_company_name} = item?.leads;
    const {interview_date, interview_time} = item;

    return (
      <View style={styles.rectangularBox}>
        <TouchableOpacity
          style={styles.touchableBox}
          onPress={() =>
            navigation.navigate('Interview', {interviewDetail: interViewArray, index: index})
          }>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Client Name:</Text>
              <Text style={styles.textValue}>
                {client_name.length > 10
                  ? `${client_name.slice(0, 14)}...`
                  : client_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Company Name: </Text>
              <Text style={styles.textValue}>{`${client_company_name}`}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Interview Date: </Text>
              <Text style={styles.textValue}>{interview_date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Interview Time: </Text>
              <Text style={styles.textValue}>{`${interview_time}`}</Text>
            </View>
          </View>
          <Image source={images.arrow} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={images.back} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerText}>All Interview</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={{color: '#1DAB87', fontSize: 20}}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder=" Enter Interview Name"
              placeholderTextColor={'#1DAB87'}
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              onPress={() => {
                setSelectedStartDate(null), setSelectedEndDate(null);
                // if(selectedStartDate === null){}
                setInterViewArray(myUserData)
              }}>
              <Text style={styles.optionText}>Clear Filter</Text>
              {/* <Image source={images.filter} style={styles.filterIcon} /> */}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                handleOptionPress(!isTodaysInterviewOnly);
                setIsTodaysInterviewOnly(!isTodaysInterviewOnly);
              }}
              style={[
                styles.optionContainer,
                isTodaysInterviewOnly && styles.optionSelected,
              ]}>
              <Text
                style={[
                  styles.optionText,
                  isTodaysInterviewOnly && styles.optionTextSelected,
                ]}>
                Todays interview only
              </Text>
            </TouchableOpacity>

            <View style={styles.additionalContainer}>
              <TouchableOpacity onPress={handleCalendarPress}>
                <Image style={styles.calenderImage} source={images.calender} />
              </TouchableOpacity>

              <Image
                style={styles.additionalVerticalLine}
                source={images.verticalLine}
              />
              <View style={styles.additionalTextContainer}>
                {/* Check if both start and end dates are selected, then display the range */}
                {selectedStartDate && selectedEndDate ? (
                  <>
                    <Text style={styles.additionalText}>
                      {formatDate(selectedStartDate)}
                    </Text>
                    <Text style={styles.additionalText}>to</Text>
                    <Text style={styles.additionalText}>
                      {formatDate(selectedEndDate)}
                    </Text>
                  </>
                ) : (
                  // If only the start date is selected, display only the start date
                  selectedStartDate && (
                    <Text style={styles.additionalText}>
                      {formatDate(selectedStartDate)}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>
          <FlatList
            data={interViewArray}
            keyExtractor={item => item.id.toString()}
            renderItem={renderRectangularBox}
            style={styles.rectangularContainer}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={onRefresh}
            //     tintColor="#1DAB87" // Optional: This is to change the loading spinner color
            //   />
            // }
          />
        </View>
      )}
      {isCalendarOpen === true && ( // Updated the condition here to check for the calendar open state
        <View
          style={{
            position: 'absolute',
            top: 200,
            end: 45,
          }}>
          <TouchableOpacity onPress={() => setIsCalendarOpen(false)}>
            <Text
              style={{color: 'black', textAlign: 'right', marginBottom: 10}}>
              Clear
            </Text>
          </TouchableOpacity>

          <Calendar
            onDayPress={handleDayPress}
            style={styles.calendarContainer}
            markedDates={{
              [selectedStartDate]: {
                selected: true,
                startingDay: true,
                color: '#1DAB87',
              },
              [selectedEndDate]: {
                selected: true,
                endingDay: true,
                color: '#1DAB87',
              },
            }}
          />
          <Button
            title="Search"
            onPress={() => {
              setIsCalendarOpen(false);
              handleOptionPress();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Interviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    flex: 1,
    width: 300,
    backgroundColor: '#1DAB87',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 100,
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
  },

  bottomContainer: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 9,
    borderColor: '#1DAB87',
    marginRight: 10,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  optionContainer: {
    backgroundColor: 'white',
    borderRadius: 9,
    borderColor: '#1DAB87',
    borderWidth: 1,
    marginTop: 35,
    height: 35,
    width: '50%',
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#1DAB87',
  },
  optionText: {
    fontSize: 16,
    color: '#1DAB87',
  },
  optionTextSelected: {
    color: 'white',
  },
  additionalContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    left: 70,
    height: 70,
    width: '28%',
    borderColor: '#1DAB87',
    borderWidth: 1,
    borderRadius: 10,
  },
  calenderImage: {
    height: 32,
    width: 32,
    marginRight: 8,
    marginLeft: 4,
  },
  additionalVerticalLine: {
    height: 42,
    width: 1,
    marginRight: 8,
    tintColor: '#1DAB87',
  },
  additionalTextContainer: {
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  additionalText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  rectangularContainer: {
    marginTop: 16,
  },
  touchableBox: {
    // marginBottom: 10,
  },
  rectangularBox: {
    backgroundColor: '#1DAB87',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 166,
    width: 342,
    alignSelf: 'center',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  infoContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabel: {
    fontSize: 16,
    color: 'white',
  },
  textValue: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    padding: 3,
    width: 140,
  },
  arrowImage: {
    alignSelf: 'flex-end',
    left: 40,
    bottom: 120,
    height: 15,
    width: 15,
    tintColor: 'white',
  },
});

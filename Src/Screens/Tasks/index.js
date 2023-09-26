import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../icons';
import {testTaskData} from '../../redux/actions/userSession';
import {useIsFocused} from '@react-navigation/native';

const Tasks = ({navigation}) => {
  const {testTasksData} = useSelector(state => state.userSession);
  // console.log('this is test task data===?', testTasksData[13].get_testtaskfiles[0].image);
  const isFocused = useIsFocused();

  const [token, setToken] = useState('');
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTodaysInterviewOnly, setIsTodaysInterviewOnly] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  useEffect(() => {
    fetchData();
  }, [isFocused]);
  const dispatch = useDispatch();
  const fetchData = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    console.log('enter');
    try {
      const response = await axios.get(
        'https://sales.appcratesoperations.com/public/api/get_Test_Tasks',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(testTaskData(response.data.test_tasks));
      setUserData(response.data.test_tasks);
      // console.log('TestTasks Data====>', userData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };
  const handleDayPress = day => {
    if (!selectedStartDate) {
      setSelectedStartDate(day.dateString);
    } else if (!selectedEndDate) {
      setSelectedEndDate(day.dateString);
      // setIsCalendarOpen(false); // Close the calendar when both start and end dates are selected
    } else {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    }
  };
  const handleSearch = searchText => {
    setSearchQuery(searchText);
  };
  const handleCalendarPress = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleOptionPress = () => {
    setIsTodaysInterviewOnly(!isTodaysInterviewOnly);
  };
  const isDateToday = dateString => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const resetData = () => {
    setUserData(testTasksData); // Assuming testTasksData contains the original data
    setSearchQuery('');
    setIsTodaysInterviewOnly(false);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const renderRectangularBox = ({item, index}) => {
    // Filter the data based on the search query
    if (searchQuery.trim() !== '') {
      const clientName = item.leads.client_name.toLowerCase();
      if (!clientName.includes(searchQuery.toLowerCase())) {
        return null; // If the client name doesn't match the search query, don't render the item
      }
    }

    // Check if 'Today's Interview Only' button is enabled and the date matches today's date
    const isTodayInterview =
      isTodaysInterviewOnly && isDateToday(item.test_task_date);

    // If 'Today's Interview Only' button is enabled and the date doesn't match today's date, don't render the item
    if (isTodaysInterviewOnly && !isTodayInterview) {
      return null;
    }
    return (
      <View style={styles.rectangularBox}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Interview', {
              testTasksDetails: userData,
              index,
            })
          }
          style={styles.touchableBox}>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Client Name: </Text>
              <Text style={styles.textValue}>{item.leads.client_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Company Name: </Text>
              <Text style={styles.textValue}>
                {item.leads.client_company_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Test Task Deadline Date: </Text>
              <Text style={styles.textValue}>{item.test_task_date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Test Task Deadline Time: </Text>
              <Text style={styles.textValue}>{item.test_task_time}</Text>
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
        <Text style={styles.headerText}>All Test Tasks</Text>
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
              placeholder="  Enter Lead Name"
              placeholderTextColor={'#1DAB87'}
              onChangeText={handleSearch} // Update the search query on each input change
            />
            <TouchableOpacity
              onPress={() => {
                resetData();
              }}>
              <Text style={styles.optionText}>Clear Filter</Text>
              {/* <Image source={images.filter} style={styles.filterIcon} /> */}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={handleOptionPress}
              style={[
                styles.optionContainer,
                isTodaysInterviewOnly && styles.optionSelected,
              ]}>
              <Text
                style={[
                  styles.optionText,
                  isTodaysInterviewOnly && styles.optionTextSelected,
                ]}>
                Todays Leads only
              </Text>
            </TouchableOpacity>

            <View style={styles.additionalContainer}>
              <TouchableOpacity onPress={handleCalendarPress}>
                <Image
                  style={styles.additionalImage}
                  source={images.calender}
                />
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
            data={userData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderRectangularBox}
            style={styles.rectangularContainer}
          />
        </View>
      )}
      {isCalendarOpen && (
        <View
          style={{
            position: 'absolute',
            top: 200,
            end: 45,
          }}>
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
              if (selectedStartDate && selectedEndDate) {
                const filteredData = userData.filter(item => {
                  return (
                    item.test_task_date >= selectedStartDate &&
                    item.test_task_date <= selectedEndDate
                  );
                });
                console.log(filteredData);
                setUserData(filteredData);
                setIsCalendarOpen(false);
              }
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Tasks;

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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginRight: 90,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
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
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    left: 60,
    height: 70,
    width: '30%',
    // alignContent: 'center',
    // alignContent:'space-between',
    borderColor: '#1DAB87',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom:20
  },
  calendarContainer: {
    flex: 1,
    width: 300,
    backgroundColor: '#1DAB87',
  },
  additionalImage: {
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
    marginBottom: 10,
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
    marginTop: 20,
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
    width: '50%',
  },
  arrowImage: {
    height: 15,
    width: 15,
    tintColor: 'white',
    left: 310,
    bottom: 110,
    marginRight: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

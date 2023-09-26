import React, {useState, useEffect , useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  Button,
} from 'react-native';
import axios from 'axios';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';

import images from '../../icons';

const Leads = () => {
  let lock = false;

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const totalLeads = useRef(0);

  const [leadsList, setLeadsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTodaysInterviewOnly, setIsTodaysInterviewOnly] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [pagesIndex, setPageIndex] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    if (searchQuery.length <= 3) {
      fetchData();
    }
  }, [searchQuery]);

  const fetchData = async (
    _pagesIndex = pagesIndex,
    onlyToday = isTodaysInterviewOnly,
    search = searchQuery,
    from_date,
    to_date,
  ) => {
    const token = await AsyncStorage.getItem('token');
    // lock = true;
    try {
      let URL = `https://sales.appcratesoperations.com/public/api/get_Leads`;
      if (search !== ``) {
        URL += `?search=${searchQuery}`;
      } else {
        URL += `?page=${_pagesIndex}`;
        if (onlyToday) URL += '&today=true';
        if (from_date && to_date)
          URL += `&from_date=${from_date}&to_date=${to_date}`;
      }

      console.log('fetchData-pagesIndex', {_pagesIndex, URL});
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // dispatch(leadData(response.data));
      // setUserData(response.data);
      const {
        current_page = 1,
        last_page = 1,
        data: leadsData = [],
      } = response.data.leads || {};
      totalLeads.current = response.data?.leads?.total;
      console.log(`response.data?.leads?.total==`,response.data?.leads?.total);
      console.log(`total======`, totalLeads);
      if (current_page == 1) {
        setLeadsList(leadsData);
      } else {
        setLeadsList(leadsList.concat(leadsData));
      }
      setPageIndex(current_page + 1);
      // if (current_page == last_page) setPageEnd(true);
      console.log(
        'fetchData-response',
        current_page,
        last_page,
        leadsData.length,
      );
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      lock = false;
    }
  };
  const handleDayPress = day => {
    if (!selectedStartDate) {
      setSelectedStartDate(day.dateString);
    } else if (!selectedEndDate) {
      setSelectedEndDate(day.dateString);
      // setIsCalendarOpen(false);
    } else {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    }
  };
  const filterLeads = (leads, query) => {
    if (!query) {
      return leads;
    }
    query = query.toLowerCase();
    return leads.filter(lead => {
      return (
        lead?.client_name?.toLowerCase().includes(query) ||
        lead?.client_company_name?.toLowerCase().includes(query)
      );
    });
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

  const handleOptionPress = () => {
    setIsTodaysInterviewOnly(!isTodaysInterviewOnly);
  };

  const handleLoadMore = () => {
    console.log('totalLeads', totalLeads.current);
    console.log('leadsList', leadsList.length);
    if (totalLeads.current > leadsList.length) {
      fetchData();
    }
  };
  const handleCalendarPress = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleSearchButtonPress = () => {
    if (selectedStartDate && selectedEndDate) {
      setFormattedStartDate(moment(selectedStartDate).format('DD-MM-YYYY'));
      setFormattedEndDate(moment(selectedEndDate).format('DD-MM-YYYY'));
      // console.log('Start date--', formattedStartDate);
      // console.log('selectedEndDate date--', formattedEndDate);
      fetchData(
        1,
        isTodaysInterviewOnly,
        searchQuery,
        moment(selectedStartDate).format('DD-MM-YYYY'),
        moment(selectedEndDate).format('DD-MM-YYYY'),
      );
      setIsCalendarOpen(false);
    }
  };
  const renderRectangularBox = ({item, index}) => {
    // // console.log('this is item==', item);
    // // Check if userData or userData.leads is null or undefined
    // if (!userData?.leads || userData.leads.length === 0) {
    //   return null; // If no leads data, don't render any item
    // }

    // // Filter the data based on the search query
    // if (searchQuery.trim() !== '') {
    //   const clientName = item.client_name?.toLowerCase() ?? '';
    //   if (!clientName.includes(searchQuery.toLowerCase())) {
    //     return null; // If the client name doesn't match the search query, don't render the item
    //   }
    // }

    // // Check if 'Today's Interview Only' button is enabled and the date matches today's date
    // const isTodayInterview =
    //   isTodaysInterviewOnly && isDateToday(item.lead_date);

    // // If 'Today's Interview Only' button is enabled and the date doesn't match today's date, don't render the item
    // if (isTodaysInterviewOnly && !isTodayInterview) {
    //   return null;
    // }
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Interview', {leadsDetails: item})}
        style={styles.touchableBox}>
        <View style={styles.rectangularBox}>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Client Name: </Text>
              <Text style={styles.textValue}>{item.client_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Company Name: </Text>
              <Text style={styles.textValue}>{item.client_company_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Lead Date: </Text>
              <Text style={styles.textValue}>{item.lead_date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Lead Created At: </Text>
              <Text style={styles.textValue}>{`${moment(
                item.created_at,
              ).fromNow()}`}</Text>
            </View>
          </View>
          <Image source={images.arrow} style={styles.arrowImage} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.back} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerText}>All Leads</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={{color: '#1DAB87', fontSize: 20}}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput]}
              placeholder="  Enter Lead Name"
              placeholderTextColor={'#1DAB87'}
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              onPress={() => {
                setSelectedStartDate(null), setSelectedEndDate(null);
                fetchData()
              }}>
              <Text style={styles.optionText}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                const nextStausOfOnlyToday = !isTodaysInterviewOnly;
                setIsTodaysInterviewOnly(nextStausOfOnlyToday);
                fetchData(1, nextStausOfOnlyToday);
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
            data={filterLeads(leadsList, searchQuery)}
            extraData={searchQuery}
            keyExtractor={(item, index) => `leadsList${index}_${item.id}`}
            renderItem={renderRectangularBox}
            style={styles.rectangularContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.8}
            windowSize={50}
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
          <Button title="Search" onPress={handleSearchButtonPress} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Leads;

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
    marginRight: 110,
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
    // padding:10
  },
  searchInput: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 9,
    borderColor: '#1DAB87',
    marginRight: 10,
    // paddingVertical: 5,
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
  },
  infoContainer: {
    marginLeft: 20,
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
  },
  arrowImage: {
    height: 15,
    width: 15,
    tintColor: 'white',
    // right: 45,
    marginRight: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

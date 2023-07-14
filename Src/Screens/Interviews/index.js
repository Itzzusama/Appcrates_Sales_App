import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendar';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import React, {useState} from 'react';

const Interviews = ({navigation}) => {
  const [isTodaysInterviewOnly, setIsTodaysInterviewOnly] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleCalendarPress = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const [interviewData, setInterviewData] = useState([
    {
      id: '1',
      clientName: 'Client 1',
      companyName: 'Company 1',
      interviewDate: '22/6',
      Time: '2:00 PM',
    },
    {
      id: '2',
      clientName: 'Client 2',
      companyName: 'Company 2',
      interviewDate: '24/6',
      Time: '11:00 AM',
    },
    {
      id: '3',
      clientName: 'Client 3',
      companyName: 'Company 3',
      interviewDate: '26/6',
      Time: '5:00 PM',
    },
    {
      id: '4',
      clientName: 'Client 4',
      companyName: 'Company 4',
      interviewDate: '28/6',
      Time: '3:00 PM',
    },
    {
      id: '5',
      clientName: 'Client 5',
      companyName: 'Company 5',
      interviewDate: '28/6',
      Time: '2:30 PM',
    },
  ]);

  const handleOptionPress = () => {
    setIsTodaysInterviewOnly(!isTodaysInterviewOnly);
  };

  const renderRectangularBox = ({item}) => {
    return (
      <View style={styles.rectangularBox}>
        <TouchableOpacity
          style={styles.touchableBox}
          onPress={() => navigation.navigate('Interview')}>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Client Name: </Text>
              <Text style={styles.textValue}>{item.clientName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Company Name: </Text>
              <Text style={styles.textValue}>{item.companyName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Interview Date: </Text>
              <Text style={styles.textValue}>{item.interviewDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.textLabel}>Interview Time: </Text>
              <Text style={styles.textValue}>{item.Time}</Text>
            </View>
          </View>
          <Image
            source={require('../../icons/arrow.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../icons/back.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>All Interview</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="   Enter Lead Name"
            placeholderTextColor={'#1DAB87'}
          />
          <TouchableOpacity onPress={() => console.log('Filter Pressed')}>
            <Image
              source={require('../../icons/filter.png')}
              style={styles.filterIcon}
            />
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
              Todays interview only
            </Text>
          </TouchableOpacity>

          <View style={styles.additionalContainer}>
            <TouchableOpacity onPress={handleCalendarPress}>
              <Image
                style={styles.additionalImage}
                source={require('../../icons/calender.png')}
              />
            </TouchableOpacity>
            {isCalendarOpen && (
              <Calendar
                onDayPress={day => {
                  console.log('selected day', day);
                }}
                style={styles.calendarContainer}
              />
            )}
            <Image
              style={styles.additionalVerticalLine}
              source={require('../../icons/verticalLine.png')}
            />
            <View style={styles.additionalTextContainer}>
              <Text style={styles.additionalText}>20/7</Text>
              <Text style={styles.additionalText}>to</Text>
              <Text style={styles.additionalText}>20/8</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={interviewData}
          keyExtractor={item => item.id}
          renderItem={renderRectangularBox}
          style={styles.rectangularContainer}
        />
      </View>
    </View>
  );
};

export default Interviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    backgroundColor: '#1DAB87',
    // color:'white'
    // borderRadius: 12,
    // marginHorizontal: 20,
    // padding: 20,
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
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    left: 60,
    height: 70,
    width: '30%',
    borderColor: '#1DAB87',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom:20
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
    color: '#1DAB87',
  },
  additionalTextContainer: {
    flexDirection: 'column',
  },
  additionalText: {
    fontSize: 14,
    color: 'black',
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
    alignSelf: 'flex-end',
    left: 100,
    bottom: 100,
    height: 15,
    width: 15,
    tintColor: 'white',
  },
});

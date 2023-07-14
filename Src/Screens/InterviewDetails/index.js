import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

const InterviewDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Interview')}>
          <Image
            source={require('../../icons/back.png')}
            style={styles.leftImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{"Interview Details"}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.redBox}>
          <View style={styles.centeredBox}>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>{"Client Name"}</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Mr. Wesilkew</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>{"Company Name"}</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Secto.to</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>{"Interview Date"}</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>23/06</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>{"Interview Time"}</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>3:00 PM</Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                {"Job Details"}
              </Text>
            </View>
            <View style={{alignItems: 'center', width: 335, marginTop: 10}}>
              <Text style={{width: '90%', color: 'black'}}>
                {
                  'Lorem ipsum dolor sit amet, conxsectetur adipiscing elit. Cras ac congue ligula. Fusce ultrices feugiat imperdiet. Phasellus eu blandit diam. Duis ut lorem neque. In eu ipsum est. Quisque nec posuere velit. Quisque et sem.Lorem ipsum dolor sit amet, conxsectetur adipiscing elit. Cras ac congue ligula. Fusce ultrices feugiat imperdiet. Phasellus eu blandit diam. Duis ut lorem neque. In eu ipsum est. Quisque nec posuere velit. Quisque et sem... Lorem ipsum dolor sit amet, conxsectetur adipiscing elit. Cras ac congue ligula. Fusce ultrices feugiat imperdiet. Phasellus eu blandit diam. Duis ut lorem neque. In eu ipsum est. Quisque nec posuere velit. Quisque et sem... Lorem ipsum dolor sit amet, conxsectetur adipiscing elit. Cras ac congue ligula. Fusce ultrices feugiat imperdiet. Phasellus eu blandit diam. Duis ut lorem neque.'
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
                {"Attached Files:"}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 108,
                  width: 81,
                  backgroundColor: '#1DAB87',
                  borderRadius: 8,
                  marginRight: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white'}}>{"CV"}</Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    height: 108,
                    width: 81,
                    backgroundColor: '#1DAB87',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{height: 32, width: 32, tintColor: 'white'}}
                    source={require('../../icons/cv.png')}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 108,
                  width: 81,
                  backgroundColor: '#1DAB87',
                  borderRadius: 8,
                  marginLeft: 10,
                  marginRight: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white'}}>{'Files'}</Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    height: 108,
                    width: 81,
                    backgroundColor: '#1DAB87',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{height: 32, width: 32, tintColor: 'white'}}
                    source={require('../../icons/files.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
    marginRight: 80,
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
    height: 696,
    width: 342,
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
    width: 342,
    alignSelf: 'center',
  },
  blueBox: {
    borderRadius: 16,
    height: 188,
    width: 342,
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

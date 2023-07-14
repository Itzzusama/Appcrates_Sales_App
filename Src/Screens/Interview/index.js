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

const Interview = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../icons/back.png')}
            style={styles.leftImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Interview</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.redBox}>
          <View style={styles.centeredBox}>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Client Name</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Mr. Wesilkewski</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Company Name</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Secto.to</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Interview Date</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>23/06</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Interview Time</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>3:00 PM</Text>
            </View>
          </View>
        </View>
        <View style={styles.yellowBox}>
          <View style={styles.centeredBox}>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Client Location</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Local</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Client Linkedin</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Link</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Client Whatsapp</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>xxxxxxxxx</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Client Skype</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>xxxxxxxxx</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Client Email</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>xx@.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Job URL</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>linkedin.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>linkedin.com</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>23/06</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Tech Stack</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>ROR</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Lead Status</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>In Discussion</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.boldText}>Lead Added By</Text>
              <Text style={styles.colonText}>:</Text>
              <Text style={styles.infoText}>Faizan</Text>
            </View>
          </View>
        </View>

        <View style={styles.blueBox}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('InterviewDetails')}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                Job Details
              </Text>
              <Image
                style={{height: 12, width: 12, left: 110}}
                source={require('../../icons/arrow.png')}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{width: '90%', color: 'black'}}>
                {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac congue ligula. Fusce ultrices feugiat imperdiet. Phasellus eu blandit diam. Duis ut lorem neque, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac congue ligula. Fusce ultrices feugiat imperdiet. Duis ut lorem neque....'
                }
              </Text>
            </View>
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
    marginRight: 125,
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
    height: 166,
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

export default Interview;

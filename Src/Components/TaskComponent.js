import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TaskComponent = ({heading, bodyText, description, Time}) => {
  const handleBoxPress = () => {
    const alertMessage = `Heading: ${heading}\nTime: ${Time}\nDescription: ${description}\nBody Text: ${bodyText}`;
    Alert.alert(heading, alertMessage);
  };
  return (
    <TouchableOpacity style={styles.rectangle} onPress={handleBoxPress}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.heading}>{Time}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.bodyText}>{bodyText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    flex: 1,
    height: '100%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 1,
    elevation: 2,
    marginTop: 15,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 5,
  },
  bodyText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default TaskComponent;

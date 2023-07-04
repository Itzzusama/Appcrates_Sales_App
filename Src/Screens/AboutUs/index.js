import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

const Profile = ({ navigation, route }) => {

  // const { name, jobTitle } = route.params;

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
    // Alert.alert('No Notifications');
  };

  const handleBoxPress = (heading, text) => {
    Alert.alert(heading, text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../icons/menu.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            source={require('../../icons/power-off.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../icons/logo.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.name}>{"Appcrates"}</Text>
          <Text style={styles.subtitle}>{"Software House is a leading technology company specializing in software development and digital solutions. With a team of highly skilled professionals, Software House offers a wide range of services tailored to meet the unique needs of businesses across various industries, Utilizing cutting-edge technologies and industry best practices, Software House develops custom software applications that streamline processes, enhance productivity, and drive business growth. Their experienced software engineers and designers work closely with clients to understand their specific requirements, ensuring that the final product meets and exceeds expectations. Software House offers a comprehensive suite of services, including web application development, mobile app development, software integration, cloud solutions, and quality assurance testing. Their expertise extends to a diverse range of technologies, including but not limited to, Java, .NET, Python, Ruby on Rails, Android, and iOS. By partnering with Software House, businesses gain access to a talented team capable of delivering robust, scalable, and secure software solutions. Whether it's creating a dynamic e-commerce platform, building a mobile app for customer engagement, or implementing a complex enterprise software system, Software House is committed to delivering high-quality results on time and within budget. With a strong focus on innovation and customer satisfaction, Software House has earned a reputation for excellence in the software development industry. Their commitment to ongoing support and maintenance ensures that clients receive continuous assistance long after the project is completed. For businesses seeking reliable and efficient software solutions, Software House is the ideal partner to turn their ideas into reality, providing them with the competitive edge needed to thrive in today's digital landscape."}</Text>
          <View style={styles.headingContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.headingText}>Company Name</Text>
              <Text style={styles.headingSubText}>Appcrates</Text>
            </View>
            {/* <View style={styles.infoContainer}>
              <Text style={styles.headingText}>Stack</Text>
              <Text style={styles.headingSubText}>{'React Native    '}</Text>
            </View> */}
            <View style={styles.infoContainer}>
              <Text style={styles.headingText}>Phone No</Text>
              <Text style={styles.headingSubText}>+92 3071224772</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  },
  headerText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  topContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    margin:10,
    textAlign:"justify"
  },
  headingContainer: {
    width: '80%',
    marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  headingSubText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 20,
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
    marginBottom:15
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {apiToken} from '../../redux/action';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../icons';
import {useDispatch} from 'react-redux';
import {loginuserInfo} from '../../redux/actions/userSession';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loginInfo} = useSelector(state => state.userSession);
  console.log('UserInfoData', loginInfo);

  const [email, setEmail] = useState(''); //nadeem@appcrates.com
  const [password, setPassword] = useState(''); //'SHUtL_93111'
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logoScale = new Animated.Value(1);
  const opacity = new Animated.Value(1);

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://sales.appcratesoperations.com/public/api/login',
        {
          email,
          password,
        },
      );
      const mytoken = response.data.token;

      if (mytoken) {
        await AsyncStorage.setItem('token', mytoken);
        dispatch(loginuserInfo(response.data));
        navigation.navigate('MyDrawer');
      } else {
        // If the server doesn't send a token, it might be due to incorrect credentials.
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Invalid Credentials',
        'Please enter the correct Email/password!',
      ); // Show alert here.
      // Alert.alert("Error", "An error occurred while trying to log in.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = () => {
    loginUser();
    setEmail(null);
    setPassword(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetAnimationValues = () => {
    logoScale.setValue(1);
    opacity.setValue(1);
  };

  const scaleLogo = () => {
    Animated.timing(logoScale, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('MyDrawer');
    });
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1600,
      useNativeDriver: true,
    }).start(() => {
      resetAnimationValues();
    });
  };
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ImageBackground
      resizeMode="contain"
      style={styles.container}
      source={images.mark}>
      <Animated.View style={[styles.boxContainer, {opacity}]}>
        <Animated.Image
          source={images.logo}
          style={[styles.logo, {transform: [{scale: logoScale}]}]}
        />

        <TextInput
          placeholder="Company Email Address"
          placeholderTextColor="black"
          style={[styles.input, {marginBottom: 20}]}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="black"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={togglePasswordVisibility}>
            <Image
              source={
                showPassword
                  ? require('../../icons/eye_hide.png')
                  : require('../../icons/eye.png')
              }
              style={styles.passwordImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={openModal}>
          <Text style={styles.forgetPasswordText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Appcrates Ltd</Text>
          <Text style={styles.bottomText}>All rights reserved.</Text>
        </View>
      </Animated.View>

      {isModalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Please reach out to Admin of the system to get your password reset
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  boxContainer: {
    width: '80%',
    height: 400,
    alignItems: 'center',
  },
  logo: {
    width: 135,
    height: 135,
    marginBottom: 30,
    bottom: 60,
  },
  input: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: '#CCCDD0',
  },
  loginButton: {
    width: '40%',
    height: 40,
    backgroundColor: '#26AE8B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    elevation: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgetPasswordText: {
    color: 'black',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 10,
    left: 80,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordButton: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  passwordImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80%',
    backgroundColor: '#26AE8B',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    transform: [{translateX: -157}, {translateY: -50}],
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    width: 100,
    height: 40,
    backgroundColor: '#26AE8B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomView: {
    top: 140,
    alignItems: 'center',
  },
  bottomText: {
    color: '#000000',
    fontSize: 15,
  },
});

export default LoginScreen;

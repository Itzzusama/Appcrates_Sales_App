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
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const logoScale = new Animated.Value(1);
  const opacity = new Animated.Value(1);

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
      duration: 1000,
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

  const handleLogin = () => {
    if (email === 'Appcrates' && password === '123') {
      Alert.alert('Login Pressed');
    } else {
      scaleLogo();
    }
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
      source={require('../../icons/mark.png')}>
      <Animated.View style={[styles.boxContainer, {opacity}]}>
        <Animated.Image
          source={require('../../icons/logo.png')}
          style={[styles.logo, {transform: [{scale: logoScale}]}]}
        />

        <TextInput
          placeholder="Company Email Address"
          placeholderTextColor="black"
          style={[styles.input, {marginBottom: 20}]}
          maxLength={9}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="black"
            secureTextEntry={!showPassword}
            style={styles.input}
            maxLength={3}
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
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
    transform: [{translateX: -150}, {translateY: -50}],
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

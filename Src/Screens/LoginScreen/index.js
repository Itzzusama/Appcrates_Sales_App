import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showButton, setShowButton] = useState(true);
  const logoScale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    resetAnimationValues();
    startZoomAnimation();
  }, []);

  const resetAnimationValues = () => {
    logoScale.setValue(1);
    opacity.setValue(1);
  };

  const startZoomAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.2,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
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
      scaleLogo();
    } else {
      Alert.alert('Enter Valid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.boxContainer, { opacity }]}>
        <Animated.Image
          source={require('../../icons/logo.png')}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />
        <Text style={styles.label}>Enter Your Email</Text>

        <TextInput
          placeholder="Company Email Address"
          placeholderTextColor={'black'}
          style={styles.input}
          maxLength={9}
          value={email}
          // value={"Appcrates"}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label}>Enter Your Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor={'black'}
          maxLength={3}
          secureTextEntry
          style={styles.input}
          keyboardType="phone-pad"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Please reach out to Admin of the system to get your password reset',
            )
          }>
          <Text style={styles.forgetPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    alignSelf: 'flex-start',
    marginLeft: 32,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#4286f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
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
  },
});

export default LoginScreen;

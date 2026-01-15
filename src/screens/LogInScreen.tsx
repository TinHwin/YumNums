import React, { useState } from 'react';
import { 
  View, 
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Eye,
  EyeOff
} from 'lucide-react-native';
import { useAuthContext } from '../contexts/AuthContext';

const LogInScreen = () => {
  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { user, loading, signInWithGoogle, signOut } = useAuthContext();

  let PasswordVisibilityIconComponent = isPasswordVisible ? Eye : EyeOff

  return (
    <View style={logInStyles.screenStyle}>
      <View style={logInStyles.logInContainerStyle}>
        <Text style={logInStyles.logInContainerHeaderStyle}>
          Login
        </Text>
        <TextInput
          style={logInStyles.emailTextInputStyle}
          placeholder='Email'
        />
        <View
          style={logInStyles.passwordContainer}
        >
          <TextInput
            style={logInStyles.passwordTextInputStyle}
            placeholder='Password'
            secureTextEntry={isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={logInStyles.passwordVisibilityIcon}
          >
            <PasswordVisibilityIconComponent size={24} color="black"/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={logInStyles.forgotPasswordTouchableOpacityStyle}
        >
            <Text
              style={logInStyles.forgotPasswordTextStyle}
            > Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={logInStyles.logInTouchableOpacityStyle}
        >
          <Text style={logInStyles.logInTouchableOpacityTextStyle}>Login</Text>
        </TouchableOpacity>
        <View style={logInStyles.noAccountContainerStyle}>
          <Text>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={logInStyles.noAccountTouchableOpacityTextStyle}
            > Signup</Text>
          </TouchableOpacity>
        </View>
        <View
          style={logInStyles.orContainersStyle}
        >
          <Seperator></Seperator>
          <Text
            style={logInStyles.orTextStyle}
          >Or</Text>
          <Seperator></Seperator>
        </View>
        <TouchableOpacity
          onPress={ signInWithGoogle }
          style={logInStyles.googleLoginContainerStyle}
        >
          <Image 
            source={require('../assets/google_logo.webp')}
            style={logInStyles.googleLoginLogoStyle}
          />
          <Text
            style={logInStyles.googleLoginTextStyle}
          >Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PASSWORD_VISIBILITY_LOGO_SIZE = 24;
const GOOGLE_LOGO_SIZE = 24;

const seperatorStyles: ViewStyle = {
  height: 1,
  width: '45%',
  backgroundColor: 'dimgray'
}

const Seperator = () => <View style={seperatorStyles} />;

const logInStyles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#90BE6D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInContainerStyle: {  
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  logInContainerHeaderStyle: {
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 25,
    fontSize: 20,
    fontWeight: 700
  },
  emailTextInputStyle: {
    height: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordTextInputStyle: {
  },
  passwordVisibilityIcon: {
    width: PASSWORD_VISIBILITY_LOGO_SIZE,
    height: PASSWORD_VISIBILITY_LOGO_SIZE,
  },
  forgotPasswordTouchableOpacityStyle: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  forgotPasswordTextStyle: {
    color: 'steelblue',
    fontWeight: 500,
  },
  logInTouchableOpacityStyle: {
    height: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    backgroundColor: '#90BE6D',
    borderRadius: 5,
  },
  logInTouchableOpacityTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 500,
  },
  noAccountContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  noAccountTouchableOpacityTextStyle: {
    color: 'steelblue',
    fontWeight: 500
  },
  orContainersStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  orTextStyle: {
    width: '10%',
    textAlign: 'center',
    color: 'dimgray',
  },
  googleLoginContainerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  googleLoginLogoStyle: {
    width: GOOGLE_LOGO_SIZE,
    height: GOOGLE_LOGO_SIZE,
  },
  googleLoginTextStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    transform: [{ translateX: -(GOOGLE_LOGO_SIZE / 2) }],
  }
})

export default LogInScreen;

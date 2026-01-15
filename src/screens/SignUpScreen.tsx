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

const SignUpScreen = () => {
  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let PasswordVisibilityIconComponent = isPasswordVisible ? Eye : EyeOff

  return (
    <View style={signUpStyles.screenStyle}>
      <View style={signUpStyles.signUpContainerStyle}>
        <Text style={signUpStyles.signUpContainerHeaderStyle}>
          Signup
        </Text>
        <TextInput
          style={signUpStyles.emailTextInputStyle}
          placeholder='Email'
        />
        <View
          style={signUpStyles.createPasswordContainer}
        >
          <TextInput
            style={signUpStyles.createPasswordTextInputStyle}
            placeholder='Create password'
            secureTextEntry={isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={signUpStyles.passwordVisibilityIcon}
          >
            <PasswordVisibilityIconComponent size={24} color="black"/>
          </TouchableOpacity>
        </View>
        <View
          style={signUpStyles.confirmPasswordContainer}
        >
          <TextInput
            style={signUpStyles.confirmPasswordTextInputStyle}
            placeholder='Confirm password'
            secureTextEntry={isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={signUpStyles.passwordVisibilityIcon}
          >
            <PasswordVisibilityIconComponent size={24} color="black"/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={signUpStyles.signUpTouchableOpacityStyle}
        >
          <Text style={signUpStyles.signUpTouchableOpacityTextStyle}>Signup</Text>
        </TouchableOpacity>
        <View style={signUpStyles.yesAccountContainerStyle}>
          <Text>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={signUpStyles.yesAccountTouchableOpacityTextStyle}
            > Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={signUpStyles.orContainersStyle}
        >
          <Seperator></Seperator>
          <Text
            style={signUpStyles.orTextStyle}
          >Or</Text>
          <Seperator></Seperator>
        </View>
        <TouchableOpacity
          style={signUpStyles.googleLoginContainerStyle}
        >
          <Image 
            source={require('../assets/google_logo.webp')}
            style={signUpStyles.googleLoginLogoStyle}
          />
          <Text
            style={signUpStyles.googleLoginTextStyle}
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

const signUpStyles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#90BE6D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainerStyle: {  
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  signUpContainerHeaderStyle: {
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
  createPasswordContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  createPasswordTextInputStyle: {
  },
  passwordVisibilityIcon: {
    width: PASSWORD_VISIBILITY_LOGO_SIZE,
    height: PASSWORD_VISIBILITY_LOGO_SIZE,
  },
  confirmPasswordContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  confirmPasswordTextInputStyle: {
  },
  signUpTouchableOpacityStyle: {
    height: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    backgroundColor: '#90BE6D',
    borderRadius: 5,
  },
  signUpTouchableOpacityTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 500,
  },
  yesAccountContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  yesAccountTouchableOpacityTextStyle: {
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

export default SignUpScreen;

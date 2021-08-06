/* eslint-disable react/prop-types */
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import Button from '../../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../../store';
import {signIn, signOut} from '../../../../reducers';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../../../../navigation';
import React from 'react';

type SplashNavigationProps = StackNavigationProp<MainStackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashNavigationProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2CC1',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontFamily: 'Muli-ExtraBold',
    fontSize: 30,
    marginBottom: 60,
    color: '#fff',
  },
  buttonSolidStyle: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonSolidTitleStyle: {
    color: '#1B2CC1',
    fontSize: 16,
    fontFamily: 'Muli-Bold',
  },
  textBottomCenter: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
    marginVertical: 5,
    color: '#fff',
  },
  textLink: {
    color: '#1B2CC1',
  },
  inputView: {
    marginVertical: 5,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
    marginBottom: 10,
    color: '#D32B2B',
  },
  headerStyle: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    elevation: 0,
    borderBottomColor: '#fff',
    shadowOpacity: 0,
  },
});

export const HomeScreen: React.FC<SplashScreenProps> = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <View>
      <Text>Oma</Text>
    </View>
  );
};

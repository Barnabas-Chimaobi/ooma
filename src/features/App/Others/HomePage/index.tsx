import * as React from 'react';
import {
  View,
  Text,
  Button,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../../store';
import {increment, decrement, clear} from '../../../../reducers/increment';
import {signIn, signOut} from '../../../../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DetailsScreen({navigation}: any) {
  const {value, isLoading} = useSelector((state: RootState) => state.counter);
  const {token} = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const userToken = async () => {
    dispatch(signIn());
    await AsyncStorage.setItem('token', 'token');
  };

  const clearToken = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(signOut());
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>{value}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <View>{isLoading && <ActivityIndicator color="blue" />}</View>
      <Button title="increment" onPress={() => dispatch(increment(2))} />
      <Button title="decrement" onPress={() => dispatch(decrement(2))} />
      <Button title="clear" onPress={() => dispatch(clear())} />
      <Button title="token" onPress={() => userToken()} />
      <Button title="clear token" onPress={() => clearToken()} />

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default DetailsScreen;

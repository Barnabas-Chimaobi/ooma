import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {checkNetwork} from '../../reducers';
import {instantSuccess} from '../../assets';

const NetworkStateWrapper = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const {toggleNetwork} = useSelector((state: RootState) => state.network);

  const subscriptions = NetInfo.addEventListener((state) => {
    if (!state.isInternetReachable) {
      dispatch(checkNetwork(false));
    } else {
      dispatch(checkNetwork(true));
    }
  });

  useEffect(() => {
    const subscription = NetInfo.addEventListener((state) => {
      if (!state.isInternetReachable) {
        dispatch(checkNetwork(false));
      } else {
        dispatch(checkNetwork(true));
      }
    });
    const componentWillUnmount = () => {
      if (subscription) {
        subscription();
      }
    };
    return componentWillUnmount;
  }, []);

  return toggleNetwork ? null : (
    <View
      style={{
        backgroundColor: '#ff6347',
        justifyContent: 'center',
        padding: '5%',
        borderRadius: 5,
        margin: 5,
      }}>
      <Text style={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>
        You have lost internet connection
      </Text>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: 'green',
          padding: 5,
          borderRadius: 10,
          width: 100,
          top: 8,
          zIndex: 1,
        }}>
        <TouchableHighlight underlayColor="" onPress={() => subscriptions()}>
          <Text style={{textAlign: 'center', color: '#fff'}}>Retry</Text>
        </TouchableHighlight>
      </View>
    </View>
    // <ImageBackground
    //   style={{height: '100%', width: '100%'}}
    //   source={instantSuccess}>
    //   <ActivityIndicator color="green" size="large" animating={loading} />
    //   <View
    //     style={{backgroundColor: '#fff', top: '90%', zIndex: 1, height: 40}}>
    //     <TouchableHighlight onPress={() => subscriptions()}>
    //       <Text style={{textAlign: 'center'}}>Retry</Text>
    //     </TouchableHighlight>
    //   </View>
    // </ImageBackground>
  );
};

export default NetworkStateWrapper;

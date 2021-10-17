import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import BaseUrl from './baseUrl';
// import navigationRef from './rootNavigation';
const axiosInstance = axios.create({
  timeout: 60000,
  timeoutErrorMessage:
    'Either your internet connect is not strong or you have no internet connectiom',
  baseURL: BaseUrl,
  // baseURL: 'https://api.ooma.kitchen/api/v1',
});
const axiosFilter = (instance, token) => {
  // const navigation = useNavigation();
  // console.log(navigation, 'props========');
  //this navigation too.
  instance.interceptors.request.use(
    function (config) {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let url = error.config.url;

      if (checkIfUrlIsExemptedAuthErrorAction(url)) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response && error.response.status == 401) {
        return getNewToken()
          .then((token) => {
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${token}`;
            return new Promise((resolve, reject) => {
              axios
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            Promise.reject(error);
          });
      }

      return Promise.reject(error);
    },
  );

  const getLoggedInUserFromReducer = async () => {
    const user = await AsyncStorage.getItem('userDetails');
    const gottenUser = await JSON.parse(user);
    return gottenUser;
  };

  const getNewToken = async () => {
    //get user info;
    const user = await getLoggedInUserFromReducer();

    return new Promise((resolve, reject) => {
      const data = {
        userId: user?.id,
        refreshToken: user?.refreshToken,
      };
      //
      //make this navigation to be working...
      if (!user?.refreshToken) {
        navigationRef.current?.navigate('Register'); //navigate to login page using reset stack
        return;
      }

      axiosInstance
        .post(`/users/refreshToken`, data)
        .then((res) => {
          let userData = res.data.data;
          //login action ..save to async and other places
          AsyncStorage.setItem('userId', userData?.id);
          userData['refreshToken'] = userData?.newrefreshToken;
          delete userData['newrefreshToken'];
          AsyncStorage.setItem('userDetails', JSON.stringify(userData));
          resolve(userData?.token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const checkIfUrlIsExemptedAuthErrorAction = (url) => {
    const array = [
      'users/create',
      'users/verifyOtp',
      'users/exist',
      'users/login',
    ];
    for (let x = 0; x < array.length; x++) {
      if (url.includes(array[x])) {
        return true;
      }
    }
    return false;
  };

  return <View></View>;
};

export const navigationRef = React.createRef();

export default axiosFilter;

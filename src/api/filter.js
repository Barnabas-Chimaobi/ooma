import axios from 'axios';
import {Promise} from 'es6-promise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';

const axiosFilter = (instance, token) => {
  instance.interceptors.request.use(
    function (config) {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    function (error) {
      global.dd('=======error occured before making request=====', {error});
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
};

const getLoggedInUserFromReducer = async () => {
  const user = await AsyncStorage.getItem('userDetails');
  const gottenUser = await JSON.parse(user);
  console.log(gottenUser, 'console=====ddd===user');
};

const getNewToken = async () => {
  const navigation = useNavigation();

  //get user info;
  let user = getLoggedInUserFromReducer();
  return new Promise((resolve, reject) => {
    let data = {
      userId: user?.data?.data?.id,
      refreshToken: user?.data?.data?.refreshToken,
    };
    //
    if (!user?.data?.data?.refreshToken) {
      navigation.navigate('Register');
      //navigate to login page using reset stack
      return;
    }
    axios
      .post(`/users/refreshToken`, data)
      .then((res) => {
        //login action ..save to async and other places
        AsyncStorage.setItem('userId', res.data.data?.id);
        AsyncStorage.setItem('userDetails', JSON.stringify(res.data.data));
        resolve(res.data.data.accessToken);
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

export {axiosFilter};

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Logo, Button, ButtonType, ShowMessage, type} from './../components';

const request = axios.create({
  timeout: 60000,
  timeoutErrorMessage:
    'Either your internet connect is not strong or you have no internet connectiom',
  baseURL: 'https://api.ooma.kitchen/api/v1',
});

class Api {
  post = async (URL: any, data?: any) => {
    try {
      let token: any = await AsyncStorage.getItem('token');
      token = token || '';
      // console.log = token;
      const res = await request.post(URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res, 'res');
      return {errorStatus: false, ...res};
    } catch (err) {
      console.log(err.response.data, 'post');
      ShowMessage(type.ERROR, err.response.data.message);
      throw err;
      // return err;
    }
  };

  delete = async (URL: any, datas?: any) => {
    try {
      let token: any = await AsyncStorage.getItem('token');
      console.log(token, 'tokennnn');
      token = token || '';
      const res = await request.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: datas,
      });
      return {errorStatus: false, ...res};
    } catch (err) {
      console.log(err.response.data, 'delete');
      return err;
    }
  };

  get = async (URL: any) => {
    try {
      let token: any = await AsyncStorage.getItem('token');
      token = token || '';
      const res = await request.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {errorStatus: false, ...res};
    } catch (err) {
      console.log(err.message, 'get');
      return err;
    }
  };
  put = async (URL: any, data?: any) => {
    try {
      let token: any = await AsyncStorage.getItem('token');
      token = token || '';
      const res = await request.put(URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {errorStatus: false, ...res};
    } catch (err) {
      return err;
    }
  };
}

export default new Api();

import {ToastAndroid, Platform, Alert} from 'react-native';

export default (msg: string) => {
  // if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  // } else {
  //   Alert.alert(msg);
  // }
};

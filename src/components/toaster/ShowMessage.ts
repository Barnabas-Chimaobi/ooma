import {WSnackBar, WModal} from 'react-native-smart-tip';
import {Alert} from 'react-native';

const types: any = {
  ERROR: {
    textColor: '#fff',
    backgroundColor: '#ff6347',
    actionText: null,
    actionTextColor: '#fff',
    position: WSnackBar.position.TOP,
  },
  DONE: {
    textColor: '#fff',
    backgroundColor: '#0B6623',
    actionText: null,
    actionTextColor: '#bf0002',
    position: WSnackBar.position.TOP,
  },
  ALERT: {
    textColor: '#000',
    backgroundColor: '#fff',
    actionText: 'Show',
    actionTextColor: '#bf0002',
    position: WSnackBar.position.TOP,
  },
  INFO: {
    textColor: '#000',
    backgroundColor: '#FFC043',
    actionText: null,
    actionTextColor: '#fff',
    position: WSnackBar.position.TOP,
  },
};

export default (type: string, message: string, url?: string) => {
  const snackBarOpts = {
    data:
      // message.includes('Variable "$')
      //   ? 'Error processing request please try again'
      //   :
      message,
    // position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    duration: 5000, //1.SHORT 2.LONG 3.INDEFINITE
    ...types[type],
    numberOfLines: 2,
    onActionHide: () => {
      // Click Action
      Alert.alert(`To redirect to ${url} !`);
    },
  };
  WSnackBar.show(snackBarOpts);
};

export const type = {
  ERROR: 'ERROR',
  DONE: 'DONE',
  ALERT: 'ALERT',
  INFO: 'INFO',
};

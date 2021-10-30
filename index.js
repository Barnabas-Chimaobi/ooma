/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import codePush from 'react-native-code-push';

// import App from './App';
import {name as appName} from './app.json';
import App from './src';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));

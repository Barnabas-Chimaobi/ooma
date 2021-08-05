/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
import App from './src';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
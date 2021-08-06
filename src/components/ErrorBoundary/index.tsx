import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';
// some stylesheet
// import {styles} from './styles';
// some button component
// import Button from './Button';

class ErrorBoundary extends React.Component<any, any> {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error: any) {
    return {error: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    // deal with errorInfo if needed
  }

  destroyAuthToken = async () => {
    await AsyncStorage.removeItem('user_settings');
  };

  handleBackToSignIn = async () => {
    // remove user settings
    await this.destroyAuthToken();
    // restart app
    RNRestart.Restart();
  };

  render() {
    if (this.state.error) {
      return (
        <SafeAreaView>
          <View>
            <View>
              <Text style={{width: '100%'}}>
                {/* <FontAwesome
                  name="ios-information-circle-outline"
                  size={60}
                  color={theme.priText}
                /> */}
              </Text>
              <Text style={{fontSize: 32}}>Oops, Something Went Wrong</Text>
              <Text
                style={{marginVertical: 10, lineHeight: 23, fontWeight: '500'}}>
                The app ran into a problem and could not continue. We apologise
                for any inconvenience this has caused! Press the button below to
                restart the app and sign back in. Please contact us if this
                issue persists.
              </Text>
              {/* <Button
                label={'Back to Sign In Screen'}
                onPress={() => this.handleBackToSignIn()}
                style={{
                  marginVertical: 15,
                }}
              /> */}
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;

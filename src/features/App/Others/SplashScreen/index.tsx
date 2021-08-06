import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../../../../navigation';

type SplashNavigationProps = StackNavigationProp<MainStackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashNavigationProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2CC1',
    color: '#fff',
    paddingLeft: 10,
    paddingEnd: 10,
    justifyContent: 'center',
  },
  iconImage: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomNavigator');
    }, 500);
  });

  return (
    <View style={styles.container}>
      <View>
        {/* <Image
          source={require('../../assets/Images/logo-white.png')}
          style={styles.iconImage}
        /> */}
      </View>
    </View>
  );
};

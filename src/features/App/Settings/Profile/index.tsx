import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import First from './first';
import Second from './second';
import Third from './third';
import {S} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfile} from '../../../../FetchData';
interface Props {
  navigation: any;
}
const Profile: React.FC<Props> = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState('');

  const getUser = async () => {
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');

    const user = await getProfile(userId);
    console.log(user, 'uerrrrr=======');
    setProfile(user?.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    getUser();
  }, []);

  return (
    <View style={S.container}>
      {/* <ScrollView> */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={28} />
      </TouchableOpacity>

      <First data={profile} navigation={navigation} />
      <Second data={profile} />
      {/* <Third navigation={navigation} /> */}
      {/* <View style={S.fourth}>
        <Text style={{marginBottom: 10}}>Help</Text>
        <Text>FAQ</Text>
      </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default Profile;

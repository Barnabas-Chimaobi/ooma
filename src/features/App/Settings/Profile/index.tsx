import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import First from './first';
import Second from './second';
import Third from './third';
import {S} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props{
  navigation: any
}
const Profile: React.FC<Props> = () => {
  const navigation = useNavigation()
  return (
    <View style={S.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={28} />
      </TouchableOpacity>

      <First navigation={navigation}/>
      <Second />
      <Third navigation={navigation}/>
      <View style={S.fourth}>
        <Text style={{marginBottom: 10}}>Help</Text>
        <Text>FAQ</Text>
      </View>
    </View>
  );
}

export default Profile;

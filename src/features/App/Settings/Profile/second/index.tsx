import React from 'react';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../../../colors';
import { Text} from 'react-native-elements';
import { Divider } from 'react-native-elements';
import {S} from '../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default function index() { 
  const navigation = useNavigation();
  return (
    <View style={S.second}>
       <View
        style={S.top}>
        <Text style={S.boldText}>Phone Number</Text>
        <Text>08158279160</Text>
      </View>
      <View
        style={S.top}>
        <Text style={S.boldText}>Email</Text>
        <Text>harrietmorrison@gmail.com</Text>
      </View>
      <Text style={S.addressView}>Saved Addresses</Text>
      <View style={S.addressText}>
        <Text>No. 290 Agbani Road, Akwnanaw, Enugu</Text>
        <AntDesign name="check" size={19} style={{marginLeft: 30}} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ViewAllAddresses")}>
        <Text style={{color: colors.primary}}>View All</Text>
      </TouchableOpacity>   
      <Divider />
    </View>
  );
}

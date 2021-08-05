import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-elements';
import {S} from '../styles';
const items = [
  {
    icon: <Entypo name="home" size={18} />,
    name: 'Home',
  },
  {
    icon: <Entypo name="suitcase" size={18}/>,
    name: 'Work',
  },
  {
    icon: <Feather name="plus-circle" size={18}/>,
    name: 'Others',
  },
];
interface Props {
  navigation: any
}
const Third: React.FC<Props> =  ({navigation}) => {
  return (
    <View style={S.third}>
      <Text style={S.boldText}>Add New Address</Text>
      {items.map(({icon,name}, idx) => (
        <TouchableOpacity onPress={() => navigation.navigate("AddNewAddressForm")} key={idx} style={{flexDirection: 'row', alignItems: 'center'}}>
          {icon}
          <Text style={{marginLeft: 15}}>{name}</Text>
        </TouchableOpacity>
      ))}
       <Divider />
    </View>
  );
}

export default Third;
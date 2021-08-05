import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, View, Text} from 'react-native';
import {S} from './styles';
interface Props {
  navigation: any;
}
const items = [
  {
    address: 'No. 290 Agbani Road, Akwnanaw, Enugu',
    name: 'Home',
  },
  {
    address: 'No. 1 Nsukka layout, Upper Chime Avenue, New Haven',
    name: 'Work',
  },

  {
    address: 'No. Boulevard Close, Ebe Lane, Ogui New Layout',
    name: 'Others',
  },
];
const Profile: React.FC<Props> = ({navigation}) => {
  return (
    <View style={S.container}>
      <TouchableOpacity
        style={{paddingVertical: 1, marginBottom: 10}}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={28} />
      </TouchableOpacity>
      {items.map(({address, name}, idx) => (
        <View
          style={S.addressView} key={idx}>
          <View style={{width: '84%'}}>
            <View style={S.iconAndText}>
              <AntDesign name="staro" size={17} />
              <Text style={{marginLeft: 15}}>{name}</Text>
            </View>
            <Text style={{fontWeight: 'bold'}}>{address}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("AddNewAddressForm")} style={S.iconEdit}>
            <MaterialIcons name="edit" size={25} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Profile;

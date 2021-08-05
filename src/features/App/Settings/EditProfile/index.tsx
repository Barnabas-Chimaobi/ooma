import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, ButtonType} from '../../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar, Text, Divider} from 'react-native-elements';
import S from './styles';
interface Props {
  navigation: any;
  accessoryProps: any;
}
const EditProfile: React.FC<Props> = ({navigation, accessoryProps}) => {
  return (
    <View style={S.container}>
      <TouchableOpacity
        style={{paddingVertical: 10, marginBottom: 10}}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={28} />
      </TouchableOpacity>
      <View style={S.top}>
        <Avatar 
          size="medium"
          source={require('../../../../assets/Images/user.png')}>
          <Avatar.Accessory size={20} {...accessoryProps} />
        </Avatar>
      </View>
      <Divider  />
      <View style={{paddingVertical: 20}}>
        <Text style={S.text}>Name</Text>
        <Text style={[S.text, S.boldText]}>Harriet Morrison</Text>
        <Text style={S.text}>Email</Text>
        <Text style={[S.text, S.boldText]}> </Text>
        <TouchableOpacity onPress={() => navigation.navigate("UpdatePassword")}>
          <Text style={S.text}>Password</Text>
          <Text style={[S.text, S.boldText]}>******</Text>
        </TouchableOpacity>
      </View>
      <Button title="Update" onPress={()=> navigation.goBack()}/>
    </View>
  );
};
export default EditProfile;

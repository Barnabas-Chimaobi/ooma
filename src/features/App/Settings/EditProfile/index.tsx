import React, {useEffect} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {Button, ButtonType} from '../../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar, Text, Divider} from 'react-native-elements';
import Edit from '../AddNewAddressForm/editProfleForm';
import {useNavigation, useRoute} from '@react-navigation/native';
import S from './styles';
interface Props {
  navigation: any;
  accessoryProps: any;
}
const EditProfile: React.FC<Props> = ({navigation, accessoryProps}) => {
  const route = useRoute();
  useEffect(() => {
    console.log(route, 'routessss===111');
  }, []);
  return (
    <View style={S.container}>
      <ScrollView>
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
        <Divider />
        <View style={{paddingVertical: 20}}>
          <Text style={S.text}>Name</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[S.text, S.boldText]}>
              {route?.params?.profile?.firstName}
            </Text>
            <Text> </Text>
            <Text style={[S.text, S.boldText]}>
              {route?.params?.profile?.lastName}
            </Text>
          </View>

          <Text style={S.text}>Email</Text>
          <Text style={[S.text, S.boldText]}>
            {route?.params?.profile?.email}
          </Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate("UpdatePassword")}>
          <Text style={S.text}>Password</Text>
          <Text style={[S.text, S.boldText]}>******</Text>
        </TouchableOpacity> */}
          <View style={{width: '100%', top: 30}}>
            <Edit />
          </View>
        </View>
      </ScrollView>

      {/* <Button title="Update" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};
export default EditProfile;

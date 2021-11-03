import React from 'react';
import {View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {Button, ButtonType} from '../../../../../components';
import {S} from '../styles';
interface Props {
  navigation: any;
  data: any;
}
const First: React.FC<Props> = ({navigation, data}) => {
  return (
    <View style={S.first}>
      <Avatar
        containerStyle={{marginBottom: 10}}
        size="large"
        rounded
        source={require('../../../../../assets/Images/profile.png')}
      />
      <Text>{data?.firstName}</Text>
      <Button
        type={ButtonType.outline}
        title="Edit Profile"
        containerStyle={S.containerStyle}
        titleStyle={{color: '#303030'}}
        onPress={() => navigation.navigate('EditProfile', {profile: data})}
      />
    </View>
  );
};
export default First;

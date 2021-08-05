import React from 'react';
import {View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {Button, ButtonType} from '../../../../../components';
import {S} from '../styles';
interface Props {
  navigation: any
}
const First: React.FC<Props> = ({navigation}) => { 
  return (
    <View style={S.first}>
      <Avatar
        containerStyle={{marginBottom: 10}}
        size="large"
        rounded
        source={require('../../../../../assets/Images/profile.png')}
      />
      <Text>Harriet Morrison</Text>
      <Button
        type={ButtonType.outline}
        title="Edit Profile"
        containerStyle={S.containerStyle}
        titleStyle={{color: '#303030'}}
        onPress={() => navigation.navigate("EditProfile")}
      />
    </View>
  );
}
export default First;
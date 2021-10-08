import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../../../colors';
import {Text} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import {S} from '../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfile} from '../../../../../FetchData';
import index from '../../../../../navigation/MenuNavigation';

interface Props {
  navigation: any;
  data: any;
}

const Index: React.FC<Props> = ({data}) => {
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
    getUser();
  }, []);

  return (
    <View style={S.second}>
      <View style={S.top}>
        <Text style={S.boldText}>Full Name</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{data?.firstName}</Text>
          <Text> </Text>
          <Text>{data?.lastName}</Text>
        </View>
      </View>
      <View style={S.top}>
        <Text style={S.boldText}>Phone Number</Text>
        <Text>{data?.phoneNumber}</Text>
      </View>
      <View style={S.top}>
        <Text style={S.boldText}>Email</Text>
        <Text>{data?.email}</Text>
      </View>
      <View style={S.top}>
        <Text style={S.addressView}>Saved Addresses</Text>
        <Text>{data?.address}</Text>
        {/* <AntDesign name="check" size={19} style={{marginLeft: 30}} /> */}
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('ViewAllAddresses')}>
        <Text style={{color: colors.primary}}>View All</Text>
      </TouchableOpacity> */}
      {/* <Divider /> */}
    </View>
  );
};

export default Index;

import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SimpleHeader, Button} from '../../../../components';
import VoucherCard from './voucherCard';
import {styles} from './styles';

function elevationShadowStyle(elevation: number) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}

const text = [
  'Extra lunch pack',
  'Free Delivery',
  'Free extra Desserts',
  'Extra Add-ons',
];
const index = () => {
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <SimpleHeader hasBottomBorder />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            ...elevationShadowStyle(2),
            borderRadius: 2,
            justifyContent: 'space-between',
            padding: 10,
            marginTop: 10,
          }}>
          <Text style={{width: '90%'}}>
            Excepteur ut laboris aute cupidatat voluptate fugiat. Amet elit in
            dolor incididunt aute laboris minim aliquip anim labore. Consectetur
            Lorem aliquip sit velit incididunt eu veniam.{' '}
          </Text>
          <TouchableOpacity style={{width: '10%'}}>
            <AntDesign name="close" size={20} style={{textAlign: 'right'}} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Get Voucher</Text>
        <Text style={{marginVertical: 10}}>
          Please, choose a voucher below.
        </Text>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: 10,
            paddingVertical: 20,
          }}>
          <VoucherCard />
          <VoucherCard />
          <VoucherCard />
          <VoucherCard />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default index;

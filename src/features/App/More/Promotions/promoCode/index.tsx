import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, ButtonType, BaseInput} from '../../../../../components';
import {styles} from '../styles';
const index = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <Text style={styles.title}>Enter promo Code</Text>
      <Text style={{marginVertical: 10}}>
        Promo code grants you access to unlimited free deliveries and automatic
        qualification for all ongoing promotions.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View style={{width: '65%'}}>
          <BaseInput
            placeholder="Enter Promo Code"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{
              borderWidth: 1,
              borderRadius: 40,
              borderColor: 'rgba(0, 0, 0, 0.15)',
            }}
          />
        </View>
        <Button
          title="Apply"
          type={ButtonType.solid}
          onPress={() => {}}
          containerStyle={{width: '30%'}}
        />
      </View>
    </>
  );
};

export default index;

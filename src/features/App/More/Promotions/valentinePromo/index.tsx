import React, {useState} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Button, ButtonType} from '../../../../../components';
import {styles} from '../styles';

const index = () => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#F8F0C6'}}>
      <View style={{width: '50%', marginTop: 20}}>
        <Text style={styles.title2}>Enjoy extra free Snacks this weekend </Text>
        <Text>
          Place up to five orders on or before Friday, to stand a chance.{' '}
        </Text>
        <Button
          title="Buy Now"
          type={ButtonType.clear}
          onPress={() => {}}
          titleStyle={{color: '#303030'}}
          buttonStyle={[styles.btnStyle, {backgroundColor: 'transparent'}]}
          containerStyle={[styles.containerStyle, {width: '100%'}]}
        />
      </View>
      <View style={{width: 180, height: 150, alignSelf: 'flex-end'}}>
        <Image
          style={[styles.tinyLogo, {top: -12, right: 13}]}
          source={require('../../../../../assets/Images/f3.png')}
        />
      </View>
    </View>
  );
};

export default index;

import React, {useState} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Button, ButtonType} from '../../../../../components';
import {styles} from '../styles';
const index = () => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#FFC043'}}>
      <View style={{width: 180, height: 150}}>
        <Image
          style={[styles.tinyLogo, {top: -12, right: 13}]}
          source={require('../../../../../assets/Images/f2.png')}
        />
      </View>
      <View style={{width: '50%', marginTop: 20}}>
        <Text style={styles.title2}>Enjoy extra free Snacks this weekend </Text>
        <Text>
          Place up to five orders on or before Friday, to stand a chance.{' '}
        </Text>
        <Button
          title="Get Invite Link"
          type={ButtonType.solid}
          onPress={() => {}}
          buttonStyle={styles.btnStyle}
          containerStyle={[styles.containerStyle, {width: '100%'}]}
        />
      </View>
    </View>
  );
};

export default index;

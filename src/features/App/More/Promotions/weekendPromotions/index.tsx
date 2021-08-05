import React, {useState} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Button, ButtonType} from '../../../../../components';
import {styles} from '../styles';
const index = () => {
  return (
    <>
      <Text style={styles.title}>Weekend Promotions</Text>
      <View
        style={{
          backgroundColor: '#FFFDD0',
          paddingLeft: 10,
          marginVertical: 20,
        }}>
        <View style={styles.flexBtwn}>
          <View style={{width: '50%', marginTop: 20}}>
            <Text style={styles.title2}>
              Enjoy extra free Snacks this weekend{' '}
            </Text>
            <Text>
              Place up to five orders on or before Friday, to stand a chance.{' '}
            </Text>
          </View>
          <View style={styles.imgView}>
            <Image
              style={styles.tinyLogo}
              source={require('../../../../../assets/Images/f1.png')}
            />
          </View>
        </View>
        <Button
          title="Order Now"
          type={ButtonType.solid}
          onPress={() => {}}
          buttonStyle={styles.btnStyle}
          containerStyle={styles.containerStyle}
        />
      </View>
    </>
  );
};

export default index;

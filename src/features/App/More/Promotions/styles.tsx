import React, {useState} from 'react';
import {StyleSheet, Text, Image, View, ScrollView} from 'react-native';

export const styles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 18},
  title2: {fontWeight: 'bold', fontSize: 15, marginBottom: 10},
  flexBtwn: {flexDirection: 'row', justifyContent: 'space-between'},
  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    top: -30,
  },
  imgView: {alignItems: 'flex-start', width: 178, height: 150},
  btnStyle: {backgroundColor: '#303030', borderRadius: 40},
  containerStyle: {width: '50%', marginBottom: 10, alignSelf: 'center'},
  dots: {backgroundColor: '#C4C4C4', width: 15, height: 15, borderRadius: 150},
});

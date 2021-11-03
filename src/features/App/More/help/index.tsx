import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SimpleHeader, CheckBox1} from '../../../../components';

const Help = () => {
  return (
    <View style={{marginLeft: 10}}>
      <SimpleHeader />
      <Text style={{fontSize: 17, top: 20}}>support@ooma.kitchen</Text>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({});

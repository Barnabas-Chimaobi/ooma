import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface Props {
  onPress: any;
  selected: any;
  children: any;
}

export const RadioButton = ({onPress, selected, children}: Props) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.radioButton,
          borderColor: selected ? '#05944F' : '#E6E6E6',
        }}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            ...styles.radioButtonText,
            opacity: selected ? 1 : 0.6,
            fontWeight: selected ? 'bold' : '100',
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    height: 16,
    width: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 12,
    width: 12,
    borderRadius: 7,
    backgroundColor: '#05944F',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5,
  },
});

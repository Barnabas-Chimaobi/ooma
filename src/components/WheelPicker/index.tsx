import React, {Component, useEffect, useState} from 'react';
import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from 'react-native-wheel-picker-android';
import {AppRegistry, StyleSheet, Text, View, Button} from 'react-native';

const wheelPickerData = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

interface Props {
  selectedItem: number;
  data: string[];
  onItemSelected: any;
  selectedItemTextFontFamily?: string;
  itemTextFontFamily?: string;
  selectedValue?: string;
  onPress: () => void;
}

const MyWheelPicker = ({
  selectedItem,
  data,
  onItemSelected,
  selectedItemTextFontFamily,
  itemTextFontFamily,
  selectedValue,
  onPress,
}: Props) => {
  return (
    <View style={styles.modalContent}>
      <Text>Selected region: {selectedValue}</Text>
      <WheelPicker
        style={styles.modalContent}
        selectedItem={selectedItem}
        data={data}
        onItemSelected={onItemSelected}
        selectedItemTextFontFamily={selectedItemTextFontFamily || ''}
        itemTextFontFamily={itemTextFontFamily || ''}
      />
      <Button title={'Select'} onPress={() => onPress()} />
    </View>
  );
};

export default MyWheelPicker;

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    height: '60%',
  },
});

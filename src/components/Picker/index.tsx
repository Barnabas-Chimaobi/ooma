import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker as PickerSelect} from '@react-native-community/picker'; 

// const checkLabel = (item: {}) => { 
//   let label;
//   if(item.propertyName){
//     return label = item.propertyName
//   }else if(item.propertyUnitType){
//     return label = item.propertyUnitType
//   }else if(item.fullName){
//     return label = item.fullName
//   } else if(item.year){
//     return label =  item.year.toString()
//   } else {
//     return label = item.label
//   };
   
// };

// const checkValue = item =>{
//   let value;
//   if(item._id){
//     return value= item._id
//   }else if(item.year){
//     return value = item.year.toString()
//   } else {
//     return value = item.value
//   }
// }
type items = {
  label: string,
  value: string | number
}
interface Props {
  PickerOptions: items[],
  placeholder?: string,
  topLabel?: string,
  touched?: any;
  errors?: any;
  pickerStyle?: {},
  pickerContainerStyle?: {},
  onValueChange: (e: string) => void ,
  selectedValue: string | number,
}
export const Picker: React.FC<Props> = ({
  PickerOptions,
  placeholder,
  pickerStyle,
  pickerContainerStyle,
  onValueChange,
  selectedValue,
  topLabel,
  touched,
  errors,
  ...otherProps
}) => {  
  const PickerItem = PickerOptions.map((item) => {
    // const label = checkLabel(item)
    // const value = checkValue(item);
    const label = item.label
    const value = item.value;
    return (
    <PickerSelect.Item key={value} label={label && label} value={value && value} />
  )});
  return (
    <View>
    <Text style={{marginBottom: 9, fontSize: 16, color: 'rgba(0, 0, 0, 0.25)'}}>{topLabel}</Text>
    <View style={{...styles.pickerContainerView, ...pickerContainerStyle}}>
      <PickerSelect
        selectedValue={selectedValue}
        style={{...styles.pickerStyle, ...pickerStyle}}
        onValueChange={onValueChange}
        {...otherProps}>
        <PickerSelect.Item label={placeholder || ''} value="" />
        {PickerItem}
      </PickerSelect> 
      {touched && errors && <Text style={styles.errorMessage}>{errors}</Text>}
    </View>
    </View >
  );
};

const styles = StyleSheet.create({
  pickerContainerView: {
    marginBottom: 25, 
    height: 52,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 4,
    paddingHorizontal: 1, 
  },
  pickerStyle: {
    width: '100%',
    borderRadius: 3,
    height: '100%',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
  },
});
 

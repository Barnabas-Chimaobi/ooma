import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';

const PlanSearch = () => {
  const [value, onChangeText] = useState('Diet');
  const [] = useState([]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 7,
        marginTop: 25,
        marginBottom: 25,
      }}>
      <TextInput
        style={{height: 35, width: '90%', borderRadius: 7}}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <TouchableOpacity style={{marginTop: 10, marginRight: 10}}>
        <Image source={require('../../assets/searchIcon.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default PlanSearch;

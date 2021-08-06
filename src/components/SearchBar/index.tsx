import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';

const SearchBarComponent = () => {
  const [state, setState] = useState({value: ''});

  const updateSearch = (search: any) => {
    setState({value: search});
  };

  return (
    <SearchBar
      value={state.value}
      onChangeText={updateSearch}
      containerStyle={{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 45,
        borderRadius: 4,
      }}
      inputContainerStyle={{backgroundColor: 'white', height: 20}}
      searchIcon={false}
    />
  );
};

export default SearchBarComponent;

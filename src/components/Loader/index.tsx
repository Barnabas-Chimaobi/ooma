import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loader = () => {
  //   return null;
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        position: 'relative',
        // top: 0,
        bottom: 0,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

export default Loader;

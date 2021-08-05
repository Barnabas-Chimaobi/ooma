import React, {FC} from 'react';
import {View, Image} from 'react-native';
import S from './styles';

const Rating1 = () => {
  // console.log(rating, 'ratinggggss');
  return (
    <View>
      <Image
        style={{height: 15, width: 15}}
        source={require('../../assets/Images/star.png')}
      />
    </View>
  );
};

export default Rating1;

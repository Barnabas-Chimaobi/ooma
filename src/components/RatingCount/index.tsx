import React from 'react';
import {Text} from 'react-native';
import S from './styles';

const RatingCount = ({ratingCount, ratingStyle}: any) => (
  <Text style={[S.ratingMark, ratingStyle]}>{ratingCount}</Text>
);

export default RatingCount;

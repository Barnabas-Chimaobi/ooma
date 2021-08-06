import React, {FC} from 'react';
import {View, Image} from 'react-native';
import S from './styles';
import {Rating} from 'react-native-elements';

interface IProps {
  rating?: number;
}

const Rate: FC<IProps> = ({rating}) => {
  return (
    <Rating
      fractions={2}
      startingValue={rating ? rating : 0}
      imageSize={15}
      readonly
      ratingBackgroundColor="white"
    />
  );
};

export default Rate;

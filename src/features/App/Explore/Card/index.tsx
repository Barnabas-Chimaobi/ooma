import React, {FC} from 'react';
import {View, Text} from 'react-native';
import S from '../styles';

interface IProps {
  title: string;
}

const Card: FC<IProps> = ({title}) => (
  <View style={{paddingHorizontal: 12}}>
    <Text style={S.cdDescription}>{title}</Text>
    <Text style={{paddingBottom: 13}}>
      Fisherman Okra Soup Is organically prepared, with special edible
      crustaceans; including Periwinkle, shrimps and crayfish.
    </Text>
  </View>
);

export default Card;

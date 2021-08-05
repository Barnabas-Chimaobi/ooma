import React, {FC} from 'react';
import {View, Image, Text} from 'react-native';
import S from './styles';
import shortid from 'shortid';
import {dot, square} from '../../assets';

interface IProps {
  dish1?: string;
  dish2?: string;
  dish3?: string;
  flex?: string;
  categories?: [];
}
const DishTypes: FC<IProps> = ({categories, flex}) => {
  return (
    <>
      <View style={S.main}>
        {categories?.map((category, index) => {
          const img = {uri: category?.ItemCategory?.imageUrl};
          return (
            <View
              style={{flexDirection: 'row', marginTop: 10}}
              key={shortid.generate()}>
              {index == 0 ? (
                <Image
                  source={square}
                  style={{height: 13, width: 13, marginRight: 5}}
                />
              ) : (
                <Image source={dot} style={S.squareImage} />
              )}
              <Text style={S.dishType}>{category?.ItemCategory?.name}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default DishTypes;

import React, {FC, useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {PriceTag} from '../../../../components';
import MoreAction from '../MoreAction';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../colors/index';

interface IProps {
  id: string;
  image: any;
  title: string;
  description: string;
  quantity: number;
  price: any;
  onPress?: () => void;
  itemId: string;
  cartId: string;
  item: any;
  addons: any;
}

const Card: FC<IProps> = ({
  id,
  image,
  title,
  quantity,
  price,
  description,
  onPress,
  itemId,
  cartId,
  item,
  addons,
}) => {
  const [state, setState] = useState({toggle: false});
  const [qunt, setQunt] = useState(quantity);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log(price++, 'pricess');
    console.log(cartId, 'itemidddddddssss');
    // console.log(title, 'itemidddddddssss');
  });

  const toggleView = () => {
    setState({...state, toggle: !state.toggle});
  };

  return (
    <View
      style={{
        width: '95%',
        marginVertical: 10,
        alignSelf: 'center',
      }}>
      <TouchableOpacity onPress={toggleView}>
        <View
          style={{
            flexDirection: 'row',
            borderColor: colors.k,
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
          }}>
          <Image
            style={{
              height: 63,
              width: 74,
              backgroundColor: 'transparent',
              borderRadius: 2,
              borderColor: 'transparent',
            }}
            source={{uri: image}}
          />
          <View style={{width: '70%', paddingLeft: 20}}>
            <Text
              style={{fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16}}>
              {title}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#05944F',
                fontFamily: 'Poppins',
                fontSize: 12,
                lineHeight: 18,
                alignSelf: 'flex-end',
              }}>
              {`(${qunt}x)`}
            </Text>
            <PriceTag price={price} clear={true} />
          </View>
        </View>
      </TouchableOpacity>
      {state.toggle && (
        <View style={{marginTop: 10}}>
          <Text style={{marginVertical: 10}}>{description}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MoreAction
              editItems={item}
              title="Edit Order"
              iconName="pen"
              id={itemId}
              cart={cartId}
              addons={addons}
            />
            {/* <MoreAction title="Add Quantity" iconName="signal" count /> */}
            <MoreAction
              cart={cartId}
              editItems={item}
              title="Delete"
              iconName="trash"
              color="red"
              del
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Card;

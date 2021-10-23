import React, {FC, useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
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
  newMenu: (item: any) => void;
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
  newMenu,
}) => {
  const [state, setState] = useState({toggle: false});
  const [qunt, setQunt] = useState(quantity);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log(price++, 'pricess');
    console.log(cartId, 'itemidddddddssss');
    console.log(addons, 'itemidddddddssss=====');
  });

  const toggleView = () => {
    setState({...state, toggle: !state.toggle});
  };

  const getNew = (item: any) => {
    newMenu(item);
  };

  return (
    <View
      style={{
        width: '95%',
        marginVertical: 10,
        alignSelf: 'center',
        flex: 1,
        // bottom: 50,
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
              height: Dimensions.get('window').height / 6.8,
              width: Dimensions.get('window').width / 3.8,
              backgroundColor: 'transparent',
              borderRadius: 5,
              borderColor: 'transparent',
            }}
            source={{uri: image}}
          />
          <View style={{width: '70%', paddingLeft: 20}}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: 16,
                width: '80%',
              }}>
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
            <View style={{marginRight: '65%', top: 25}}>
              <PriceTag price={Number(price)} clear={true} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {state.toggle && (
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              maxWidth: '100%',
              flexWrap: 'wrap',
              bottom: 10,
              left: 10,
            }}>
            {JSON.parse(addons)?.map((item: any) => {
              console.log(item, 'item===addonssss=======');
              return (
                <View>
                  <Text></Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      marginRight: 5,
                    }}>
                    {item?.name}({item?.quantity}x);
                  </Text>
                </View>
              );
            })}
          </View>

          {/* <Text style={{marginVertical: 10}}>{description}</Text> */}
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
              gottenNewCart={(item) => getNew(item)}
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

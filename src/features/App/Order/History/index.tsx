import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {colors} from '../../../../colors';
import {useNavigation} from '@react-navigation/core';

const RenderItems = ({item}: any) => {
  // console.log(
  // let ones = item?.data?.map((item) => item?.data?.map((item) => item));
  // console.log(ones, 'ones=======');
  //   'item',
  // );
  return (
    <View>
      {/* <Text style={{marginLeft: 10}}>{item?.deliveryTime}</Text> */}
      {item?.data?.map((items) =>
        items?.data?.map((item) => {
          console.log(
            item?.itemData?.menuitemorders?.MenuItemOrderDetails,
            '===========orderlenght=====',
          ),
            console.log(item, 'item===========');
          return (
            item?.itemData?.menuitemorders?.status === 'Delivered' && (
              <OrderCard
                total={item?.itemData?.menuitemorders?.total}
                details={item}
                dateTitle={item?.deliveryTime}
                titlePosition="right"
                children={
                  <>
                    <Total
                      randomTitle="ORDER ID"
                      randomValue={item?.itemData?.orderRef}
                      mainStyle={S.totalStyle}
                      randomStyle={{
                        color: colors.black,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    />
                    {/* {item?.itemData?.menuitemorders?.MenuItemOrderDetails?.map(
                    (items, index) => ( */}
                    <Total
                      randomTitle={'ITEM'}
                      randomValue={
                        item?.itemData?.menuitemorders?.MenuItemOrderDetails
                          ?.length
                      }
                      randomStyle={{
                        color: colors.black,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                      mainStyle={S.totalStyle}
                    />
                    {/* ),
                  )} */}

                    <Total
                      total={Number(item?.itemData?.menuitemorders?.total)}
                      totalTitle="PRICE"
                      mainStyle={S.totalStyle}
                      randomStyle={{
                        color: colors.black,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    />
                    <Total
                      randomTitle="STATUS"
                      randomValue={item?.itemData?.menuitemorders?.status}
                      mainStyle={S.totalStyle}
                      randomStyle={{
                        color: colors.start,
                        // item?.paymentStatus == 'Cancelled'
                        //   ? colors.red
                        //   : item?.paymentStatus == 'NOT-PAID'
                        //   ? colors.primary
                        //   : colors.black,
                      }}
                    />
                  </>
                }
              />
            )
          );
        }),
      )}
    </View>
  );
};

const Current = ({item}) => {
  const navigation = useNavigation();
  // console.log(item, 'consoleditemmm======');
  const data: any = [
    {
      orderId: 'ZS214298',
      time: '5',
      status: 'Delivered',
      price: '4000',
    },
  ];

  return (
    <View style={S.main}>
      {item?.length === 0 ? (
        <EmptyList
          image={require('../../../../assets/Images/emptyCart.png')}
          title="FIND MEAL"
          message="Oops! You don't have any completed order"
          onPress={() => navigation.goBack()}
        />
      ) : (
        <FlatList
          ListHeaderComponent={<>{item.length > 0 && <SortBy />}</>}
          renderItem={({item}) => <RenderItems item={item} />}
          data={item}
          keyExtractor={() => shortid.generate()}
          ListEmptyComponent={
            <EmptyList
              image={emptyCart}
              title="Make Order"
              message="Oops! Your order is empty"
              // onPress={() => navigation.navigate('Explore')}
            />
          }
        />
      )}
    </View>
  );
};

export default Current;

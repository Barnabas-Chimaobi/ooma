import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../colors';

const RenderItems = ({item}: any) => {
  // console.log(
  let ones = item?.data?.map((item) => item?.data?.map((item) => item));
  // console.log(ones, 'ones=======');
  //   'item',
  // );
  return (
    <View style={{backgroundColor: colors.white}}>
      <Text>{item?.deliveryTime}</Text>
      {item?.data?.map((items) =>
        items?.data?.map((item) => {
          // console.log(
          //   item?.itemData?.menuitemorders?.MenuItemOrderDetails,
          //   '===========orderlenght=====',
          // ),
          //   console.log(item, 'item===========');
          return (
            item?.itemData?.menuitemorders?.status !== 'Delivered' && (
              <OrderCard
                total={item?.itemData?.menuitemorders?.total}
                details={item}
                dateTitle={item?.deliveryTime}
                titlePosition="right"
                children={
                  <>
                    <View style={{marginTop: -25}}>
                      <Total
                        itemorder={'itemorder'}
                        randomTitle="Order ID"
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
                        mainStyle={S.totalStyle}
                        randomStyle={{
                          color: colors.black,
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}
                      />
                      {/* ),
                  )} */}

                      <Total
                        orderTotal={Number(
                          item?.itemData?.menuitemorders?.total,
                        )}
                        totalTitle="Price"
                        mainStyle={S.totalStyle}
                        randomStyle={{
                          color: colors.black,
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}
                      />
                      <Total
                        randomTitle="Status"
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
                    </View>
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
  const data = [
    {
      orderId: 'ZS214298',
      time: '1:00 PM',
      item: '4',
      price: '4000',
    },
  ];

  return (
    <View style={S.main}>
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
    </View>
  );
};

export default Current;

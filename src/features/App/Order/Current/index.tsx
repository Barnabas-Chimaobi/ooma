import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../colors';
import {DateFormatter} from '../../../../Utils';

const RenderItems = ({itemss}: any) => {
  // console.log(item, 'ones=======');

  return (
    <View style={{backgroundColor: colors.white}}>
      <Text style={{marginLeft: 10}}>
        {new Date(itemss?.deliveryTime)?.toLocaleDateString()}
      </Text>
      {itemss?.data?.map((items) =>
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
                    <View style={{marginTop: -5}}>
                      <Total
                        randomTitle={'item'}
                        randomTitleStyle={{color: colors.white}}
                        randomValue={DateFormatter.formatAMPM(
                          itemss?.deliveryTime,
                        )}
                        randomStyle={{
                          color: colors.black,
                          fontSize: 12,
                          marginLeft: '60%',
                        }}
                        mainStyle={{
                          paddingVertical: -40,
                          borderBottomWidth: 2,
                          borderColor: colors.grey,
                          marginBottom: 10,
                        }}
                      />

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
  // console.log(item, 'itemmmsss=====');
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
    <View
      style={{
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: colors.white,
      }}>
      <FlatList
        ListHeaderComponent={<>{item.length > 0 && <SortBy />}</>}
        renderItem={({item}) => <RenderItems itemss={item} />}
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

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableHighlight, FlatList} from 'react-native';
import {BaseInput} from '../../../../components';
import {debounce, throttle} from 'throttle-debounce';
import {SearchMenuItemAndMenuPlan} from '../../../../FetchData';
import {Icon} from 'react-native-elements';
import S from '../styles';
import {colors} from '../../../../colors';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchMenuitemandPlan = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [gottenSearch, setGottenSearch] = useState<any>([]);

  const search = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const getSearch = await SearchMenuItemAndMenuPlan(input, newbranch);
    setGottenSearch(getSearch?.data);
    console.log(gottenSearch, 'searchresultsssss');
  };

  const debouncefunc = debounce(500, () => {
    if (input.length >= 3) {
      search();
    }
  });

  const renderItem = (item: any) => {
    console.log(item.item.menuItemType, 'itemssssss');
    return (
      <View style={{marginLeft: 10}}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(255, 255, 255, 0.3)"
          onPress={() =>
            item?.item?.menuItemType == 'MenuPlan'
              ? navigation.navigate('Detail', {
                  planId: item?.item?.id,
                  categoryName: item?.item?.name,
                })
              : navigation.navigate('Dish', {
                  id: item?.item?.id,
                  rating: item?.item?.name,
                })
          }>
          <View>
            <Text style={{fontSize: 14, color: '#000', marginTop: 10}}>
              {item?.item?.name}
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                marginTop: 15,
                marginRight: 10,
              }}></View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
        }}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(255, 255, 255, 0.3)"
          onPress={() => navigation.goBack()}>
          <View style={{marginTop: 5, marginLeft: 5, marginRight: 5}}>
            <Icon name="arrow-back" color={colors.blackGrey} size={18} />
          </View>
        </TouchableHighlight>
        <View style={{height: 50, width: '90%'}}>
          <BaseInput
            inputStyle={{paddingBottom: -2}}
            value={input}
            placeholder="search menu"
            onChangeText={(text) => {
              setInput(text);
              debouncefunc();
            }}
            rightIcon={
              <Icon name="search" color={colors.blackGrey} size={18} />
            }
            style={S.exploreInput}
          />
        </View>
      </View>
      {gottenSearch.length == 0 ? (
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              marginTop: 25,
              color: '#000',
            }}>
            No Results found for your search inputs yet
          </Text>
        </View>
      ) : (
        <FlatList
          // horizontal
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={gottenSearch}
          keyExtractor={(item, index) => {
            // console.log(item.eventId.toString(), 'index');
            return index.toString();
          }}
          // ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={4} // Reduce initial render amount
          maxToRenderPerBatch={4} // Reduce number in each render batch
          updateCellsBatchingPeriod={200} // Increase time between renders
          windowSize={10} // Reduce the window size
        />
      )}
    </View>
  );
};
const styles = {
  exploreInput: {
    backgroundColor: 'white',
    borderColor: colors.blackGrey,
    borderWidth: 1,
    borderRadius: 4,
  },
};

export default SearchMenuitemandPlan;

import React, {useCallback} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
const {width: windowWidth} = Dimensions.get('window');

interface Props {
  onSubmit?: () => void;
}

interface ItemProps {
  data: {};
}

const listItemData = ['Alphabetical', 'Date added', 'My saved location'];

export const BottomSheetList = ({onSubmit}: Props) => {
  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e, idx) => `${e.location}-${idx}`, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth * 0.9,
        offset: index * windowWidth * 0.9,
      }),
      [],
    ),
  };

  return (
    <View style={styles.list}>
      <Text style={styles.headerText}>Order By</Text>

      {listItemData.map((item) => (
        <View style={styles.itemList} key={item}>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.itemListText}>{item}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    width: '100%',
    // padding: 15,
    // height: '100%',
    // backgroundColor: 'red',
  },
  headerText: {fontWeight: 'bold', marginBottom: 20, fontSize: 16, padding: 15},
  itemList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderBottomColor: '#44444435',
    borderBottomWidth: 1,
  },
  itemListText: {marginBottom: 15, marginTop: 15, fontSize: 14, opacity: 0.6},
});

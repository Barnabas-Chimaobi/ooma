import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {getRegion} from '../../../../FetchData';
import {useNavigation, useRoute} from '@react-navigation/native';
import {map, arrow, pin} from '../../../../assets';
import S from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function region() {
  const [region, setRegion] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;

  const handleGetRegion = async () => {
    const allRegion = await getRegion();
    if (allRegion) {
      setRegion(allRegion);
    }
  };

  useEffect(() => {
    handleGetRegion();
  }, []);

  const getBranch = (regionId: any) => {
    navigation.navigate('Branch', {id: regionId, token: params?.newToken});
  };

  const renderItem = (item: any) => {
    // console.log(item.item.name, 'itemssssss');
    return (
      <View style={{marginLeft: 10, marginTop: 40}}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(255, 255, 255, 0.3)"
          onPress={() => {
            AsyncStorage.setItem('regionName', item?.item?.city),
              getBranch(item?.item?.id);
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{marginLeft: 10}}>
                <Image source={pin} style={{height: 20, width: 20}} />
              </View>
              <Text style={{fontSize: 14, color: '#000', marginLeft: 10}}>
                {item?.item?.name}
              </Text>
            </View>

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
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          height: 50,
          paddingTop: 25,
        }}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(255, 255, 255, 0.3)"
          onPress={() => navigation.navigate('Register')}>
          <View style={{marginLeft: 10}}>
            <Image source={arrow} style={{height: 10, width: 20}} />
          </View>
        </TouchableHighlight>
        <Text style={{marginLeft: '30%', fontWeight: 'bold'}}>
          Select Region
        </Text>
      </View>
      <ImageBackground style={S.sdImage} source={map} />

      <View style={S.sdMain}>
        <FlatList
          // horizontal
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={region}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

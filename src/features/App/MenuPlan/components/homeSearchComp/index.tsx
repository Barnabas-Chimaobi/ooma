import React, {forwardRef, useImperativeHandle, useEffect} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {styles} from './styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MenuTab from '../../components/tab';
import {MyPlans} from '../myPlan/index';

const FindPlan = () => (
  <View style={styles.scene}>
    <MenuTab />
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

interface Props {
  getIndex: (index: Number) => void;
}

const SearchTab = forwardRef(({getIndex}: Props, ref) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'findPlan', title: 'Find Plan'},
    {key: 'myPlan', title: 'My Plan'},
  ]);

  const findPlan = (newValue: Number) => setIndex(+newValue);

  const MyPlan = () => (
    <View style={styles.scene}>
      <MyPlans findPlan={findPlan} />
    </View>
  );

  useEffect(() => {
    getIndex(index);
  }, [index]);

  // console.warn({index});

  const renderScene = SceneMap({
    findPlan: FindPlan,
    myPlan: MyPlan,
  });

  return (
    <TabView
      renderTabBar={(routes) => (
        <TabBar
          {...routes}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBar}
          renderLabel={({route}) => (
            <Text style={styles.tabLabel}>{route.title}</Text>
          )}
        />
      )}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
});

export default SearchTab;

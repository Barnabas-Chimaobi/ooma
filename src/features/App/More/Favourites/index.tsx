import  React, {useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {SimpleHeader} from '../../../../components';
import {styles} from './styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Dishes from './Dishes';
import All from '../../MenuPlan/components/tab/all';
import Carousel from '../../Home/Carousel';
const AllRoute = () => (
  <View style={styles.scene}>
    <Dishes />
  </View>
);

const OfficeRoute = () => (
  <View style={styles.scene}>
    <All />
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

const MenuTab = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: 'Dishes'},
    {key: 'office', title: 'Menu Plan'},
  ]);

  const renderScene = SceneMap({
    all: AllRoute,
    office: OfficeRoute,
  });
  const [state, setstate] = useState({gridView: false});
  const {gridView} = state;
  const toggleGrid = () => setstate({gridView: !gridView});
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <SimpleHeader />
      <TabView
        renderTabBar={(routers) => (
          <TabBar
            {...routers}
            indicatorStyle={{
              backgroundColor: 'transparent',
            }}
            style={styles.tabBar}
            renderLabel={({route, focused}) => (
              <View style={focused ? styles.focused : styles.tabLabel}>
                <Text style={focused ? styles.focusedText : styles.tabText}>
                  {route.title}
                </Text>
              </View>
            )}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

export default MenuTab;

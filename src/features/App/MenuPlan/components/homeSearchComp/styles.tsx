import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabView: {
    marginBottom: -220,
  },
  indicatorStyle: {
    backgroundColor: 'green',
    height: 7,
    borderRadius: 5,
    width: 80,
    marginLeft: 40,
  },
  tabBar: {
    // display: "flex",
    justifyContent: 'center',
    // alignItems:"center",
    backgroundColor: 'white',
    height: 40,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 7,
    elevation: 0,
  },
  tabLabel: {
    color: 'black',
    marginBottom: 15,
    width: 70,
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
  active: {
    color: 'green',
  },
});

import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  scene: {
    flex: 1,
    // justifyContent: 'center',
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabBar: {
    // display: "flex",
    justifyContent: 'center',
    // alignItems:"center",
    backgroundColor: 'transparent',
    height: 80,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 7,
    elevation: 0,
    padding: 0
  },
  tabLabel: {
    color: 'black', 
    width: 150,
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10, 
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#303030"
  },
  tabText: {
    color: "#303030", 
    textAlign: 'center'
  },
  focusedText: {
    color: "#fff",
    textAlign: 'center'
  },
  focused: {
    color: 'black', 
    backgroundColor: "#303030",
    width: 150,
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10, 
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#303030" 
  },
});

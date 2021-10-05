import {StyleSheet} from 'react-native';
import {colors} from '../../../../../colors/index';
export const styles = StyleSheet.create({
  scene: {
    // flex: 1,
  },
  tabHeadingStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabStyle: {
    borderBottomColor: 'grey',
    borderBottomWidth: 15,
    elevation: 45,
  },

  activeTabStyle: {
    backgroundColor: colors.lightGrey,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 5,
    borderWidth: 0,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabBar: {
    // display: "flex",
    justifyContent: 'center',
    // alignItems:"center",
    backgroundColor: 'white',
    height: 40,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 7,
    elevation: 0,
  },
  tabLabel: {
    display: 'flex',
    color: 'black',
    marginTop: -3,
    fontSize: 13,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 2,
    textAlign: 'center',
  },
  focused: {
    display: 'flex',
    color: 'white',
    marginTop: -3,
    fontSize: 13,
    backgroundColor: colors.black,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 2,
    textAlign: 'center',
  },
  btn: {
    height: 40,
    width: 150,
    // backgroundColor: '#303030',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 1,
  },
  noData: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerText: {
    color: 'black',
    backgroundColor: colors.grey,
    padding: 5,
    // paddingLeft: 10,
    // paddingRight: 10,
    borderRadius: 50,
  },
});

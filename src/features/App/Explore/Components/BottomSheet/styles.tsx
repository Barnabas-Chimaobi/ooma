import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    paddingHorizontal: 0,
  },
  textStyle: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 25,
  },
  childrenStyle: {
    padding: 10,
    marginTop: 25,
  },
});

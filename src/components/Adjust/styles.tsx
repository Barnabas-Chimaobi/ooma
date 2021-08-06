import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    width: '100%',
  },
  subMainStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '20%',
  },
  buttonStyle: {
    padding: 7,
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  valueStyle: {
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

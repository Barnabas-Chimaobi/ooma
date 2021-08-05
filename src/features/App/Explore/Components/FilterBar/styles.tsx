import {StyleSheet} from 'react-native';
import {colors} from '../../../../../colors';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    width: "100%",
    flexWrap: "wrap",
    marginHorizontal:1
  },
  buttonStyle: {
    backgroundColor: colors.greyShade,
    borderRadius: 20,
    height: 30,
  },
  activeButtonStyle: {
    backgroundColor: colors.black,
  },
  titleStyle: {
    paddingHorizontal: 6,
    color: colors.black,
    fontSize: 13,
  },
  activeTitleStyle: {
    color: colors.white,
    paddingHorizontal: 1.5,
  },
  clearButtonStyle: {
    // backgroundColor: 'white',
    borderRadius: 20,
    height: 30,
  },
  clearTitleStyle: {
    color: '#05944F',
    fontSize: 11,
  },
});

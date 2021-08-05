import {StyleSheet} from 'react-native';
import {colors} from '../../../../colors';

export default StyleSheet.create({
  UnitOrdersmain: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
    elevation: 1,
    borderColor: colors.elevationColor,
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 10,
  },
  main: {
    borderRadius: 10,
    paddingTop: 15,
    borderWidth: 1,
    margin: 10,
    // alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 1,
    borderColor: colors.elevationColor,
  },
  totalStyle: {
    paddingVertical: -10,
  },
  totalHeaderStyle: {
    paddingVertical: -20,
  },
  totalHeadertitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  countStyle: {},
  descriptionStyle: {
    width: '100%',
    fontWeight: 'bold',
  },
});

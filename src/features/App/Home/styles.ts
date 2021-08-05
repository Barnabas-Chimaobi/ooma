import {StyleSheet} from 'react-native';
import {colors} from '../../../colors';

export default StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGrey,
    paddingBottom: 12,
  },
  logoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  notificationBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activenotifications: {
    position: 'relative',
    top: -7,
    right: 10,
    zIndex: 10,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 35,
  },
  categoryTitle: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    marginStart: 10,
  },
  categorySubtitle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: 13,
    marginStart: 10,
    marginEnd: 25,
    color: colors.blackGrey,
  },
  browseButtonStyle: {
    width: 135,
    height: 26,
    padding: 6,
    borderColor: colors.green,
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 30,
  },
  browseTitleStyle: {
    fontSize: 11,
    color: colors.primary,
  },
  backTopButtonStyle: {
    width: 85,
    height: 26,
    padding: 6,
    borderColor: colors.green,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 30,
  },
  backtopTitleStyle: {
    fontSize: 11,
    color: colors.primary,
  },
  viewAllStyle: {
    textAlign: 'right',
    padding: 10,
    paddingTop: -20,
    fontSize: 11,
    color: colors.blackGrey,
  },
  categoryMain: {
    backgroundColor: colors.white,
    marginVertical: 2,
    paddingBottom: 5,
    marginStart: 5
  },
});

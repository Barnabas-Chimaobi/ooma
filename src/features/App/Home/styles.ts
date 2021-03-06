import {StyleSheet} from 'react-native';
import {colors} from '../../../colors';

export default StyleSheet.create({
  main: {
    flex: 1,
    marginTop: -10,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.white,
    // borderBottomWidth: 2,
    // borderBottomColor: colors.lightGrey,
    // paddingBottom: 12,
    flex: 1,
    zIndex: 5
  },
  logoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  notificationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  activenotifications: {
    position: 'relative',
    top: -7,
    right: 10,
    zIndex: 10,
  },
   activeFilter: {
    position: 'relative',
    bottom: -6,
    left: 15,
    zIndex: 10,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    // height: 120,
    borderColor: '#F6F6F6',
    // borderWidth: 1,
    paddingTop: 10,
    elevation: 10,
    marginBottom: 5
    
    // paddingBottom: 15
  },
  categoryTitle: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginBottom: -25,

  },
  categorySubtitle: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    top: 7,
    marginBottom: 7,
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
    padding: 23,
    // paddingTop: -20,
    fontSize: 11,
    color: colors.blackGrey,
  },
  categoryMain: {
    backgroundColor: colors.white,
    marginVertical: 2,
    paddingBottom: 5,
    marginStart: 5
  },
    textStyle: {
    fontWeight: 'normal',
    marginLeft: 30,
  },
  activeTextStyle: {
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 5
  },
  titleStyle: {
    fontSize: 18,
    padding: 15,
    fontWeight: 'bold',
  },
  buttonStyle: {
    width: '90%',
    alignSelf: 'center',
  },
    footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: '#ffffff',
  },
});

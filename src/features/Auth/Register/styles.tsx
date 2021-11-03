import {StyleSheet} from 'react-native';
import {colors} from '../../../colors';

export default StyleSheet.create({
  omaTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Montserrat',
  },
  omaSubTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    margin: 10,
  },
  omaMainStyle: {
    flex: 1,
    alignSelf: 'center',
    margin: 10,
  },
  phoneInput: {
    fontFamily: 'OpenSans',
    fontSize: 10.5,
    color: 'rgba(48, 48, 48, 0.8)',
    paddingBottom: 0,
  },
  phoneContainerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    paddingBottom: 0,
    width: '100%',
    borderRadius: 5,
    elevation: 2,
  },
  codeInputStyle: {
    fontWeight: '800',
    fontSize: 30,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  codeInputContainerStyle: {
    alignItems: 'center',
    margin: 10,
    marginBottom: 40,
    marginTop: -30,
  },
  passwordInputContainerStyle: {
    backgroundColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 5,
  },
  nameInputContainerStyle: {
    backgroundColor: 'rgba(48, 48, 48, 0.3)',
    width: '100%',
    borderRadius: 5,
  },
  nameInputTitleStyle: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    color: '#303030',
    paddingBottom: 8,
    fontWeight: 'bold',
  },
  overStyle: {
    fontSize: 12,
    margin: 10,
    fontFamily: 'Montserrat',
    fontWeight: '900',
  },
  backButtonStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  logoStyle: {
    alignSelf: 'center',
    position: 'absolute',
    // top: 250,
    marginTop: '10%',
    width: 350,
  },
  registerBody: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
    backfaceVisibility: 'visible',
  },
  sdImage: {
    height: 323,
    width: '100%',
  },
  sdMain: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginTop: -20,
    flex: 1,
  },
});

export const factoryStyles = (index: any, currentStep: any) =>
  StyleSheet.create({
    indicatorStyle: {
      width: 10,
      marginHorizontal: 6,
      height: 10,
      borderRadius: 5,
      backgroundColor: index === currentStep ? '#05944F' : '#E8E4E4',
    },
  });

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    marginBottom: 90,
  },
  header: {
    padding: 12,
    backgroundColor: 'white',
  },
  inputContainerStyles: {
    borderRadius: 10,
    backgroundColor: 'rgba(196, 196, 196, 0.15)',
    marginTop: 10,
    width: '85%',
    padding: 10,
    height: 40,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainStyle: {
    padding: 15,
    backgroundColor: 'white',
  },
  bodyStyle: {
    marginTop: 36,
  },
  totalStyle: {
    backgroundColor: 'white',
    marginTop: 5,
    paddingTop: 40,
  },
  buttonStyle: {
    width: '90%',
    alignSelf: 'center',
  },
  footerStyle: {
    // backgroundColor: 'white',
    // paddingVertical: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
});

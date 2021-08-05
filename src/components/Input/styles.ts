import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    borderRadius: 4,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    height: 42,
    width: '100%',
    backgroundColor: 'rgba(48, 48, 48, 0.3)',
  },
  errorMessage: {
    color: 'red',
    paddingBottom: 10,
    fontSize: 11,
  },
  container: {
    height: 42,
    paddingHorizontal: 0,
    borderRadius: 3,
    marginBottom: 8,
    // backgroundColor: 'red'
  },
  mainStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputContainerStyles: {
    width: '95%',
  },
});

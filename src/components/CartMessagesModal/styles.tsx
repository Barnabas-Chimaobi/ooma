import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 15,
  },
  buttonOpen: {
    backgroundColor: '#05944F',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#05944F',
    marginBottom: 200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 200,
    color: '#444',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    flex: 1,
    padding: 6,
    marginBottom: 10,
  },
  counterView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    // borderWidth: 1,
    flex: 1,
    elevation: 1,
  },
  counterMinus: {
    width: '17%',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    borderRadius: 4,
    elevation: 1,
  },

  counterPlus: {
    width: '17%',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    borderRadius: 4,
    elevation: 1,
  },
  countIcon: {
    fontWeight: 'bold',
  },
  countValue: {
    width: '40%',
    textAlign: 'center',
  },
});

import {StyleSheet} from 'react-native';

export const S = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 14
  },
  top: {flex: 1, marginTop: 20},
  rateUs: {flex: 1, fontWeight: 'bold',paddingVertical: 10, fontSize: 17},
  experience: {flex: 1, fontSize: 16,paddingVertical: 10},
  emojiContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojiView: {
    padding: 7,
    borderRadius: 50,
  }
})

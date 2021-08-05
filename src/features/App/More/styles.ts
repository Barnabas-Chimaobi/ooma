import {StyleSheet} from 'react-native';

export const S = StyleSheet.create({
  items: {
    flexDirection: 'row',
     alignItems: 'center', 
     paddingVertical: 20, 
    //  paddingHorizontal: 20
    },
  borderStyle: {
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(48, 48, 48, 0.3)"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center"
  },
})

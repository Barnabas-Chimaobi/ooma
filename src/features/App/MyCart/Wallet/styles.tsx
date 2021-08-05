import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex: 1
  },
  headerOverLay: {
    zIndex: 1, 
    width: "100%",
    height: 257, 
    backgroundColor: "#00000098", 
    borderBottomLeftRadius: 8,
    borderBottomRightRadius:8
  },
  overlayContent: {
    marginTop:50
  },
  greeting: {
    color:"white", 
    marginLeft: 20, 
    fontFamily:"Roboto", 
    fontSize: 17, 
    fontWeight:"bold", 
    marginBottom: 15
  },
  question:{
    color:"white", 
    marginLeft: 20, 
    fontFamily:"Montserrat", 
    fontSize: 14
  },
  fundWalletContainer: {
    position:"absolute",
    marginTop:50,
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "flex-end", 
    padding:4, 
    alignSelf:"flex-end",
  },
  fundWallet: {
    display:"flex", 
    flexDirection: "row"
  },

  fundFromBank: {
    color:"#000",  
    marginBottom: 20, 
    marginTop:10
  },
  buyVoucher: {
    color:"#000",  
    marginBottom: 10, 
  },
  walletBalanceContainer: {
    width:100,
    marginLeft: 40,
    marginTop: 60,
  },
  walletBalance: {
    color:"white", 
    marginLeft: 20,
  },
  walletAmount: {
    color:"white",
    marginLeft: 60,
    marginTop: 10, 
    fontFamily:"Roboto", 
    fontSize: 17, 
    fontWeight:"bold"
  },
  headerBackground: {
    zIndex: 0, 
    position: 'absolute', 
    width: "100%",
    height: 257,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius:8 
  },
  backgroundImage: {
    width: "100%",
    height: 257,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius:8
  },
  transactionDetails: {
    padding:20, 
    borderBottomWidth:1, 
    borderBottomColor:"#00000010", 
    marginBottom:20
  },
  cardContainer: {
    width: "90%", 
    alignSelf: "center", 
    
  },
  cardDateContainer: {
    width: "100%", 
    // marginBottom: 10, 
    
  },
  date: {
    marginLeft: 10,
    fontWeight:"bold"
  },
  card: {
    width: "100%", 
    borderTopRightRadius: 4,
    borderBottomRightRadius:4,
    borderLeftWidth:6,
    elevation: 1,
    borderTopColor: 'rgba(255, 255,255, 1.0)',
    borderBottomColor: 'rgba(255, 255,255, 1.0)',
    borderRightColor: 'rgba(255, 255,255, 1.0)',
    backgroundColor: 'white', 
    padding: 10,
  },
  time: {
    position:"absolute",
    color: "#05944F", 
    padding:4, 
    marginTop:15,
    alignSelf:"flex-end",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 13,
  },
  title: {
      marginBottom: 10
  }
});

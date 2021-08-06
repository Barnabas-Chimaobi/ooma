import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from "./styles"
import TransactionCard from "./walletCard"

interface IProps {
  title: string;
  iconName: string;
  color?: string;
  onPress?: () => void;
}



const Transactions = [{
  title: "Meal Order(QA165990)",
  date: "21/4/2020",
  amount: "-7,000.00 NGN",
  time: "8:00 AM",
},
{
  title: "Voucher Purchase(Office Pack)",
  date: "14/3/2020",
  amount: "20,000.00 NGN",
  time: "11:45 AM",
},
{
  title: "Subscription(Fad Diet Plan)",
  date: "24/1/2020",
  amount: "45,250.00 NGN",
  time: "12:00 PM",
},
{
  title: "Subscription(Fad Diet Plan)",
  date: "24/1/2020",
  amount: "45,250.00 NGN",
  time: "12:00 PM",
}
]



const Wallet: FC<IProps> = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  return (

    <View style={styles.container}>

      <View >
        <View style={styles.headerOverLay} >
          <View style={styles.overlayContent}>
            <Text style={styles.greeting}>Hello, Harriet Morrison</Text>
            <Text style={styles.question}>Have you eaten today?</Text>
            <View style={{
              ...styles.fundWalletContainer,
              backgroundColor: expanded ? "white" : "red",
              width: expanded ? 150 : 100,
              borderBottomLeftRadius: expanded ? 0 : 20,
              borderTopStartRadius: expanded ? 0 : 20
            }}>

              <TouchableOpacity onPress={() => handlePress()} style={styles.fundWallet}>
                <Image source={require("../../../../assets/Images/fundWallet.png")} style={{ margin: 5, display: expanded ? "none" : "flex", }} />
                <Text style={{
                  color: "white", display: expanded ? "none" : "flex",
                }}>Fund Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress()}>
                <Text style={{ ...styles.fundFromBank, display: expanded ? "flex" : "none" }}>Fund From My Bank</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress()}>
                <Text style={{ ...styles.buyVoucher, display: expanded ? "flex" : "none" }}>Buy Voucher</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.walletBalanceContainer}>
              <Text style={styles.walletBalance}>Wallet Balance</Text>
            </View>
            <Text style={styles.walletAmount}>0.00 NGN</Text>
          </View>
        </View>
        <View style={styles.headerBackground} >
          <Image source={require("../../../../assets/Images/authBG.png")} style={styles.backgroundImage} />
        </View>
      </View>

      <View >
        <View style={styles.transactionDetails}>
          <Text>Transaction Details</Text>
        </View>
          
        </View>
        {/* <TransactionCard/> */}
        <FlatList
            data={Transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TransactionCard 
                index={index}
                title={item.title}
                date={item.date}
                amount={item.amount}
                time={item.time}
              />
            )}
          />
    </View>

  );
};

export default Wallet;

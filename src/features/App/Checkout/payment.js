import React, {useState, useEffect, useRef, Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {color, colors} from '../../../colors';
import {paystack, flutter, forward, arrow} from '../../../assets';
import {PayWithFlutterwave} from 'flutterwave-react-native';
// import Paystack from 'react-native-paystack-webview';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {verifyPayment, generatePaymentRef} from '../../../FetchData';
import {ref} from 'yup';
import {
  HeaderBar,
  OmaCard,
  InputPrimary,
  Total,
  ButtonType,
  Button,
  ShowMessage,
  type,
} from '../../../components';

// const navigation = useNavigation();
// const route = useRoute();
export class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pubkey: '',
      refdata: '',
      amount: this.props.route.params?.amount,
      branch: this.props.route.params?.branchId,
      order: this.props.route.params?.orderId,
      paymentMethod: this.props.route.params?.paymentMethod,
    };
    this.paystackWebViewRef = React.createRef(null);
  }
  genrateRef = async (method, openStack) => {
    // const {amount, branchId, orderId, paymentMethod} = this.props.route.params;
    let body = {
      amount: this.state.amount,
      branchId: this.state.branch,
      orderId: this.state.order,
      paymentMethod: this.state.paymentMethod,
      gateWayType: method,
    };

    const genRef = await generatePaymentRef(body);
    this.setState({
      pubkey: genRef?.data?.publicKey,
      refdata: genRef?.data?.paymentRef,
    });
    if (genRef?.data?.statusCode === 201) {
      // setTimeout(() => {
      //   paystackWebViewRef.current.startTransaction();
      // }, 3000);
    }
    console.log(genRef?.data?.publicKey, 'genrefernce======');
    setTimeout(() => {
      this.paystackWebViewRef.current.startTransaction();
    }, 2000);
    console.log(this.state.refdata, '======refdata');
    // verifyRef();
  };

  verifyRef = async () => {
    const verify = await verifyPayment(this.state.refdata);
    if (verify?.data.status === 'success') {
      ShowMessage(type.DONE, 'Payment was Successful');
      this.props.navigation.navigate('HomeNav');
    } else {
      ShowMessage(type.ERROR, 'Failed Transaction. please retry');
    }
    console.log(verify, 'paymentverify======');
  };

  componentDidMount() {
    console.log(this.props.route.params, 'params=========');
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          onPress={() => this.props.navigation.goBack()}
          underlayColor="">
          <Image style={styles.backArrow} source={arrow} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor=""
          onPress={() => this.genrateRef('PAYSTACK')}>
          <View style={styles.container}>
            <View>
              <Image
                style={styles.image}
                source={paystack}
                resizeMode="contain"
              />
              <Text style={styles.paymentStack}>Make Payment via Paystack</Text>
              <Text style={styles.details}>Enter card details</Text>
            </View>
            <View>
              <Image
                style={styles.image1}
                source={forward}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableHighlight>
        {/* <View>{showStack === true ? paysts : null}</View> */}
        {/* <View>{showWave === true ? flutterwave : null}</View> */}
        <TouchableHighlight underlayColor="" underlayColor="">
          <View style={styles.container}>
            <View>
              <Image style={styles.image} source={flutter} />
              <Text style={styles.paymentStack}>
                Make Payment via Flutterwave
              </Text>
              <Text style={styles.details}>Enter card details</Text>
            </View>
            <View>
              <Image
                style={styles.image1}
                source={forward}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableHighlight>

        <Paystack
          paystackKey={this.state.pubkey}
          billingEmail="paystackwebview@something.com"
          amount={this.state.amount}
          onCancel={(e) => {
            console.log(
              e,
              JSON.stringify(this.state.refdata),
              'errrooofromstack========',
            );
            // handle response here
          }}
          onSuccess={(res) => {
            console.log(res, 'responsefromstack========');
            this.verifyRef();
            // handle response here
          }}
          ref={this.paystackWebViewRef}
          refNumber={this.state.refdata}
        />
        {/* <TouchableHighlight
        onPress={() => paystackWebViewRef.current.startTransaction()}>
        <Text>Pay Now</Text>
      </TouchableHighlight> */}
      </View>
    );
  }
}

export default State;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    elevation: 5,
    flexDirection: 'row',
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  image: {
    height: 40,
    width: 200,
  },
  paymentStack: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  image1: {
    height: 20,
    width: 25,
    marginTop: 15,
  },
  details: {
    marginTop: 10,
  },
  mainContainer: {
    padding: 10,
  },
  backArrow: {
    width: 25,
    height: 25,
    marginLeft: 3,
    marginBottom: 15,
  },
});

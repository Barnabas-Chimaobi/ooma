import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {color, colors} from '../../../colors';
import {paystack, flutter, forward, arrow} from '../../../assets';
import {PayWithFlutterwave} from 'flutterwave-react-native';
// import Paystack from 'react-native-paystack-webview';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {verifyPayment, generatePaymentRef} from '../../../FetchData';

const Paystacks = () => {
  return (
    <View style={{flex: 1}}>
      <PaystackWebView
        buttonText="Pay Now"
        paystackKey="sk_test_d4e507bfdb9f591b68cac8a9686b97e0b4d03384"
        amount={120000}
        billingEmail="ayoshokz@gmail.com"
        billingMobile="08101274387"
        billingName="Oluwatobi Shokunbi"
        ActivityIndicatorColor="green"
        onSuccess={(tranRef) => {
          console.log(tranRef);
        }}
        onCancel={() => {
          console.log('something went wrong');
        }}
      />
      {/* <PaystackWebView
        btnStyles={{
          color: '#fff',
          alignSelf: 'center',
          backgroundColor: '#fff',
          padding: 5,
          fontFamily: 'Poppins-SemiBold',
          marginTop: 10,
          borderRadius: 8,
        }}
        buttonText="Proceed to make Payment"
        showPayButton={true}
        paystackKey="pk_test_4342d59b37810ec82593dbdb2dc3a6149aac2b83"
        paystackSecretkey="sk_test_d4e507bfdb9f591b68cac8a9686b97e0b4d03384"
        billingEmail="ayoshokz@gmail.com"
        billingMobile="08101274387"
        billingName="Oluwatobi Shokunbi"
        amount={120000}
        // amount={amountInput * getAmount?.amount}
        // billingEmail={params.person.username || params.person.email}
        billingMobile="09787377462"
        // billingName={
        //    params.person.fullName ||
        //    `${params.person.firstName} ${params.person.lastName}`
        // }
        ActivityIndicatorColor="#CA3434"
        SafeAreaViewContainer={{marginTop: 5}}
        SafeAreaViewContainerModal={{marginTop: 5}}
        // refNumber={refNumber?.invoiceNumber}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          console.log(res?.data?.transactionRef?.reference, 'follow');
          // setPaymentResponse(res?.data?.transactionRef?.reference);
          // setAmountInput('');
          // handle response here
        }}
        autoStart={false}
      /> */}
    </View>
  );
};

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showStack, setStack] = useState(false);
  const [showWave, setWave] = useState(false);
  const [refdata, setRefData] = useState('');
  const togglestack = () => setStack((prev) => !prev);
  const toggleWave = () => setWave((prev) => !prev);
  let {amount, branchId, orderId, paymentMethod} = route.params;

  let data = '';
  const genrateRef = async (method, openStack) => {
    let body = {
      amount: amount,
      branchId: branchId,
      orderId: orderId,
      paymentMethod: paymentMethod,
      gateWayType: method,
    };

    const genRef = await generatePaymentRef(body);
    data = genRef?.data?.publicKey;
    if (genRef?.data?.statusCode === 201) {
      setRefData(genRef?.data?.publicKey);
      // setTimeout(() => {
      //   paystackWebViewRef.current.startTransaction();
      // }, 3000);
    }
    console.log(genRef?.data?.publicKey, 'genrefernce======');
    console.log(data, '======refdata');
    setTimeout(() => {
      paystackWebViewRef.current.startTransaction();
    }, 3000);
    verifyRef();
  };

  const verifyRef = async () => {
    console.log(refdata, 'dataaaaaaa');
    const verify = await verifyPayment();
    console.log(verify, 'paymentverify======');
  };

  useEffect(() => {
    console.log(route.params, 'params========');
  }, [data]);

  const flutterwave = (
    <PayWithFlutterwave
      // onRedirect={handleOnRedirect}
      options={{
        tx_ref: 'hjjdjhjdshjhjsj',
        authorization: '[merchant public key]',
        customer: {
          email: 'customer-email@example.com',
        },
        amount: 2000,
        currency: 'NGN',
        payment_options: 'card',
      }}
      customButton={(props) => (
        <TouchableHighlight
          style={styles.paymentButton}
          onPress={props.onPress}
          isBusy={props.isInitializing}
          disabled={props.disabled}>
          <Text style={styles.paymentButtonText}>Pay $500</Text>
        </TouchableHighlight>
      )}
    />
  );

  const paystackWebViewRef = useRef();
  let key = data;
  return (
    <View style={styles.mainContainer}>
      <TouchableHighlight onPress={() => navigation.goBack()} underlayColor="">
        <Image style={styles.backArrow} source={arrow} />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor=""
        onPress={() => genrateRef('PAYSTACK')}>
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
      <TouchableHighlight
        underlayColor=""
        underlayColor=""
        onPress={() => toggleWave()}>
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
        paystackKey={key}
        billingEmail="paystackwebview@something.com"
        amount={amount}
        onCancel={(e) => {
          console.log(e, JSON.stringify(data), 'errrooofromstack========');
          // handle response here
        }}
        onSuccess={(res) => {
          console.log(res, 'responsefromstack========');
          // handle response here
        }}
        ref={paystackWebViewRef}
      />
      {/* <TouchableHighlight
        onPress={() => paystackWebViewRef.current.startTransaction()}>
        <Text>Pay Now</Text>
      </TouchableHighlight> */}
    </View>
  );
};

export default Payment;

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
  },
});

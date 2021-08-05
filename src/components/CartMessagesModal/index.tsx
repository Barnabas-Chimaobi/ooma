import React, {FC, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

interface Props {
  message?: string;
  openButtonTitle: string;
  closeButtonTitle: string;
  route: string;
  btnStyles?: any;
  children?: any;
  otherCardViewStyle?: any;
  otherModalViewStyle?: any;
  btnClose?: any;
  total: any;
  cartParams: any;
  onpress?: any;
}

const MessageModal: FC<Props> = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{...styles.centeredView, ...props.otherCardViewStyle}}>
          <View style={{...styles.modalView, ...props.otherModalViewStyle}}>
            {props.children || (
              <Text style={styles.modalText}>{props.message}</Text>
            )}
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                props.btnStyles,
                props.btnClose,
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate(props.route);
              }}>
              <Text style={styles.textStyle}>{props.closeButtonTitle}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, props.btnStyles]}
        // onPress={() => {
        //   navigation.navigate('Checkout', {
        //     params: props.cartParams,
        //     subTotal: props.total,
        //     planOrder: 'planOrder',
        //   });
        //   // setModalVisible(true);
        // }}
        onPress={props.onpress}>
        <Text style={styles.textStyle}>{props.openButtonTitle}</Text>
      </Pressable>
    </View>
  );
};

export default MessageModal;

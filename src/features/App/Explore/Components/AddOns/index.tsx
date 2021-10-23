import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {CheckBox, PriceTag, Overlay} from '../../../../../components';
import {Icon, Divider} from 'react-native-elements';
import S from './styles';

interface TProps {
  title: string;
  price?: number;
  noBorder?: boolean;
  onPress?: () => void;
}

const T = ({title, price, noBorder, onPress}: TProps) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={S.Tmain}>
        <Text>{title}</Text>
        {price ? (
          <PriceTag price={Number(price)} clear />
        ) : (
          <Icon name="chevron-right" color="#05944F" />
        )}
      </TouchableOpacity>
      {!noBorder && <Divider />}
    </>
  );
};

const CheckBoxWithPrice = ({price, title, noBorder}: TProps) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <CheckBox title={title} />
        <PriceTag price={Number(price)} clear />
      </View>
      {!noBorder && <Divider />}
    </>
  );
};

const AddOns = () => {
  const [state, setstate] = useState({visible: false});

  const toggleVisible = () => {
    setstate({visible: !visible});
  };

  const {visible} = state;

  return (
    <>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleVisible}
        child={
          <>
            <CheckBoxWithPrice title="Eba" price={100} />
            <CheckBoxWithPrice title="Fufu" price={100} />
            <CheckBoxWithPrice title="Semo" price={100} />
            <CheckBoxWithPrice title="Pounded Yam" price={100} noBorder />
          </>
        }
      />
      <View style={S.addOns}>
        <T title="Extra soup" price={150} />
        <T title="Swallow" onPress={toggleVisible} />
        <T title="Meat" onPress={toggleVisible} />
        <T title="Others" noBorder onPress={toggleVisible} />
      </View>
    </>
  );
};

export default AddOns;

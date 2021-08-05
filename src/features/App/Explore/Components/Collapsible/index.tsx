import React, {useState, FC} from 'react';
import {View, Text} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Button, ButtonType, Adjust, CheckBox} from '../../../../../components';
import {Divider} from 'react-native-elements';
import S from './styles';
import AddOns from '../../Components/AddOns';

interface IProps {
  title: string;
  addOns?: {}[];
  itemPreferences?: [];
}

const CollapsibleView: FC<IProps> = ({title, addOns, itemPreferences}) => {
  const [state, setState] = useState({visible: false, checked: false});
  const {visible} = state;
  console.log(itemPreferences, 'preferencesss');
  return (
    <View style={{paddingHorizontal: 12, width: '100%'}}>
      <Button
        type={ButtonType.solid}
        title={title}
        iconRight={true}
        iconName={!visible ? 'plus' : 'minus'}
        iconColor="rgba(48, 48, 48, 0.85)"
        iconSize={16}
        buttonStyle={S.buttonStyle}
        titleStyle={S.titleStyle}
        onPress={() => setState({...state, visible: !state.visible})}
      />
      <Collapsible collapsed={!visible} style={{width: '100%'}}>
        {title == 'Add-Ons' ? (
          <>
            {!addOns ? (
              <>
                <Adjust
                  mainStyle={{paddingVertical: 10}}
                  title="Ponmo"
                  price={100}
                  titleStyle={S.adjustTitleStyle}
                />
                <Adjust
                  mainStyle={{paddingVertical: 10}}
                  title="Shrimps"
                  price={250}
                  titleStyle={S.adjustTitleStyle}
                />
                <AddOns />
              </>
            ) : (
              addOns.map((addon: any) => {
                return (
                  <View key={addon?.id}>
                    <Adjust
                      mainStyle={{paddingVertical: 10}}
                      title={
                        addon?.isExtra == true
                          ? `Extra ${addon?.Inventory?.itemName} `
                          : addon?.Inventory?.itemName
                      }
                      price={addon?.price}
                      titleStyle={S.adjustTitleStyle}
                    />
                    {/* <AddOns /> */}
                  </View>
                );
              })
            )}
          </>
        ) : (
          <>
            {!itemPreferences
              ? null
              : // <>
                //   <CheckBox title="Less Salt" />
                //   <CheckBox title="More Salt" />
                //   <CheckBox title="Less Pepper" />
                //   <CheckBox title="More Pepper" />
                //   <CheckBox title="Less Onions" />
                //   <CheckBox title="More Onions" />
                // </>
                itemPreferences.map((preference: any) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <CheckBox
                      key={preference?.Preference?.id}
                      title={preference?.Preference?.name}
                    />
                    <Text style={{paddingTop: 20}}>
                      {preference?.Preference?.unitPrice}
                    </Text>
                  </View>
                ))}
          </>
        )}
      </Collapsible>
      <Divider />
    </View>
  );
};

export default CollapsibleView;

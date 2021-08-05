import {Button, ButtonType, Overlay} from '../../../../../components';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import S from './styles';
import {colors} from '../../../../../colors';

const SortBy = () => {
  const [state, setstate] = useState({visible: false});
  const {visible} = state;

  const toggleVisible = () => {
    setstate({visible: !visible});
  };

  return (
    <View style={S.main}>
      <Text style={{fontSize: 16, color: colors.blackFade}}>Sort by</Text>
      <Button
        title="Date Range"
        iconName="chevron-down"
        iconRight
        iconColor={colors.blackFade}
        iconSize={14}
        type={ButtonType.outline}
        buttonStyle={{borderColor: colors.blackFade}}
        titleStyle={{paddingRight: 20, color: colors.blackFade}}
        onPress={toggleVisible}
      />
      <Button
        iconName="search"
        type={ButtonType.clear}
        iconColor={colors.blackFade}
        iconSize={16}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleVisible}
        child={
          <>
            <Button
              title="Oldest - Newest"
              titleStyle={{color: colors.pureBlack}}
              onPress={toggleVisible}
              type={ButtonType.clear}
            />
            <Button
              title="Newest - Oldest"
              titleStyle={{color: colors.pureBlack}}
              onPress={toggleVisible}
              type={ButtonType.clear}
            />
          </>
        }
      />
    </View>
  );
};

export default SortBy;

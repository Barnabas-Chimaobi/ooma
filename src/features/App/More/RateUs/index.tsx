import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Emoji from 'react-native-emoji';
import {
  SimpleHeader,
  CheckBox,
  Button,
  ButtonType,
} from '../../../../components';
import {S} from './styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  navigation: any;
}
interface emojis {
  name: string;
  emoji: string;
}
const emojis: emojis[] = [
  {
    name: 'Horrible',
    emoji: 'nauseated_face',
  },
  {
    name: 'Bad',
    emoji: 'persevere',
  },
  {
    name: 'Good',
    emoji: 'slightly_smiling_face',
  },
  {
    name: 'Wonderful',
    emoji: 'yum',
  },
];
// horrible=nauseated_face, sad=persevere,good=slightly_smiling_face, wonderful=yum;
// the names of the emoji are gotten from https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
const RateUs: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView style={S.container}>
        <SimpleHeader />
        <View style={S.top}>
          <Text style={S.rateUs}>Rate Us</Text>
          <Text style={S.experience}>How's your experience so far?</Text>
          <View style={S.emojiContainer}>
            {emojis.map(({name, emoji}, idx) => (
              <TouchableOpacity
                key={idx}
                style={{flex: 1, alignItems: 'center'}}>
                <View
                  style={[
                    S.emojiView,
                    {
                      backgroundColor:
                        name === 'Bad'
                          ? 'rgba(11, 102, 35, 0.6)'
                          : 'rgba(196, 196, 196, 0.15)',
                    },
                  ]}>
                  <Emoji name={emoji} />
                </View>

                <Text>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{flex: 3, marginTop: 40, paddingVertical: 3}}>
          <Text style={{fontWeight: 'bold'}}>
            Would you like to make a suggestion on
          </Text>
          <View>
            <CheckBox
              title="Food"
              containerStyle={{backgroundColor: 'transparent'}}
            />
            <CheckBox
              title="Delivery"
              containerStyle={{backgroundColor: 'transparent'}}
            />
            <CheckBox
              title="App"
              containerStyle={{backgroundColor: 'transparent'}}
            />
            <CheckBox
              title="Others"
              containerStyle={{backgroundColor: 'transparent'}}
            />
          </View>
          <TextInput
            style={{
              // ...styles.input,
              borderWidth: 1,
              borderColor: 'rgba(196, 196, 196, 0.9)',
              borderRadius: 6,
              height: 90,
              justifyContent: 'flex-start',
              textAlign: 'center',
            }}
            textAlign="left"
            underlineColorAndroid="transparent"
            placeholder="Comment"
            placeholderTextColor={'#979797'}
            numberOfLines={20}
            multiline={true}
            onChangeText={() => {}}
          />
          <Button
            onPress={() => navigation.navigate('HomeNav')}
            title="Send"
            type={ButtonType.clear}
            titleStyle={{color: '#fff'}}
            containerStyle={{backgroundColor: '#303030'}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default RateUs;

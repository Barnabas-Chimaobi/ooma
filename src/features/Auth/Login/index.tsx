import React, {useRef, useState} from 'react';
import {SafeAreaView, Button, View, Text, ImageBackground} from 'react-native';
import Wizard from 'react-native-wizard';
import {Logo} from '../../../components';

const Login = () => {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const stepList = [
    {
      content: (
        <View style={{width: 100, height: 100, backgroundColor: '#000'}} />
      ),
    },
    {
      content: (
        <View style={{width: 100, height: 100, backgroundColor: '#e04851'}} />
      ),
    },
    {
      content: (
        <View style={{width: 100, height: 500, backgroundColor: '#9be07d'}} />
      ),
    },
    {
      content: (
        <View style={{width: 100, height: 100, backgroundColor: '#2634e0'}} />
      ),
    },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/Images/AuthImage.png')}
      style={{flex: 1}}>
      {/* <SafeAreaView style={{backgroundColor: '#FFF'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#FFF',
            borderBottomColor: '#dedede',
            borderBottomWidth: 1,
          }}>
          <Button
            disabled={isFirstStep}
            title="Prev"
            onPress={() => wizard.current.prev()}
          />
          <Text>{currentStep + 1}. Step</Text>
          <Button
            disabled={isLastStep}
            title="Next"
            onPress={() => wizard.current.next()}
          />
        </View>
      </SafeAreaView> */}
      <Logo />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={(val) => setIsFirstStep(val)}
          isLastStep={(val) => setIsLastStep(val)}
          onNext={() => {
            console.log('Next Step Called');
          }}
          onPrev={() => {
            console.log('Previous Step Called');
          }}
          currentStep={({currentStep, isLastStep, isFirstStep}) => {
            setCurrentStep(currentStep);
          }}
        />
        <View style={{flexDirection: 'row', margin: 18}}>
          {stepList.map((val, index) => (
            <View
              key={'step-indicator-' + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? '#05944F' : '#E8E4E4',
              }}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

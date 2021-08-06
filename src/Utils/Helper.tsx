import moment from 'moment';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import _ from 'lodash';

const isEmpty = (obj:any) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const isObjectEmpty = (obj:any) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const cleanUrl = (sentence:any) => {
    return sentence.replace(/ /g, "-").replace(/\//g, "-");
}


const capCase = (str:any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const  shuffleArray = (array:[]) => {
     return _.shuffle(array) ;
 }



const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;



export {
    isObjectEmpty, capCase,shuffleArray
};
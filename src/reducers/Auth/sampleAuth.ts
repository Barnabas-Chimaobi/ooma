
import {
  START_LOADING, STOP_LOADING, SELECTED_FIAT_CURRENCY, FIAT_CURRENCY, CRYPTO_CURRENCY, SELECTED_CRYPTO_CURRENCY, CURRENCY_RATE
} from "../Actions/Types";


let INITIAL_STATE = {
  token: false,
  isLoading: true,
  number: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
  code: '',
  hash: '',
};



export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SELECTED_CRYPTO_CURRENCY:
      return { ...state, selectedCryptoCurrency: action.payLoad };
    case SELECTED_FIAT_CURRENCY:
      return { ...state, selectedFiatCurrency: action.payLoad };
    case CRYPTO_CURRENCY:
      return { ...state, cryptoCurrencies: action.payLoad };
    case FIAT_CURRENCY:
      return { ...state, fiatCurrencies: action.payLoad };
    case CURRENCY_RATE:
      return { ...state, currencyRate: action.payLoad };

    default: return state
  }
}

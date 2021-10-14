import axios from 'axios';
import { Promise } from "es6-promise";



const axiosFilter=(instance,token)=>{
l
instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;

}, function (error) {
global.dd("=======error occured before making request=====",{error})
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {

  return response;

}, (error) => {

  let url = error.config.url;

  if (checkIfUrlIsExemptedAuthErrorAction(url)) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
  if (error.response && error.response.status == 401) {
    return getNewToken()
      .then((token) => {
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${token}`;
        return new Promise((resolve, reject) => {
          axios.request(config).then(response => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          })
        });

      })
      .catch((error) => {
        Promise.reject(error);
      });
  }


  return Promise.reject(error);
});

}

const getNewToken = () => {
     //get user info;
  let user = getLoggedInUserFromReducer();
  return new Promise((resolve, reject) => {
     
   let data = {
      userId: user.id,
      refreshToken: user.refreshToken,
    }
    //
    if (!user.refreshToken) {
        //navigate to login page using reset stack
      return;
    }
    axios.post( `/users/refreshToken`,data)
      .then(res => {
       //login action ..save to async and other places
        resolve(res.data.data.accessToken);

      })
      .catch(err => {
        reject(err)
      })
  })
};


const checkIfUrlIsExemptedAuthErrorAction = (url) => {
    const array = ["users/create", "users/verifyOtp","users/exist","users/login"];
    for (let x = 0; x < array.length; x++) {
        if (url.includes(array[x])) {
            return true;
        }
    }
    return false;
}


export { axiosFilter};
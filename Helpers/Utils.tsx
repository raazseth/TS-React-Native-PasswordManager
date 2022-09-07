import CryptoJS from 'react-native-crypto-js';

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), 'SomePass').toString();
};

export const decryptData = (data: any) => {
  const decrypt = CryptoJS.AES.decrypt(data, 'SomePass');
  const decryptedData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const optionalConfigObject = {
  title: 'Authentication Required',
  imageColor: '#e00606',
  imageErrorColor: '#ff0000',
  sensorDescription: 'Touch sensor',
  sensorErrorDescription: 'Failed',
  cancelText: 'Cancel',
  fallbackLabel: 'Show Passcode',
  unifiedErrors: false,
  passcodeFallback: false,
  backgroundMode: false,
};

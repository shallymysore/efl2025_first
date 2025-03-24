/*
import CryptoJS from 'crypto-js';

const secretKey = 'G0d1$w@tch1ng'; 

// Encrypt data
export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
};

// Decrypt data
export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};*/

import CryptoJS from 'crypto-js';

const secretKey = 'G0d1$w@tch1ng';

// Encrypt data
export const encryptData = (data) => {
  if (data === null || data === undefined || data === '') {
    return '';
  }
  /*
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
  */
  return btoa(data)
};

// Decrypt data
export const decryptData = (ciphertext) => {
  if (!ciphertext) {
    return '';
  }
  try {
    /*
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
    */
    return atob(ciphertext)
  } catch (error) {
    console.error('Error decrypting data:', error);
    return '';
  }
};


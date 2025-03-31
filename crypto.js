import CryptoJS from "crypto-js";

export const encryptKey = (privateKey, password) => {
    return CryptoJS.AES.encrypt(privateKey, password).toString();
};

export const decryptKey = (encryptedKey, password) => {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, password);
    return bytes.toString(CryptoJS.enc.Utf8);
};

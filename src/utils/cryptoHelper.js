import CryptoJS from "crypto-js";

// Secret key (must be the same for all clients)
const SECRET_KEY = "12345678901234567890123456789012";

export function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return encrypted;
}

export function decrypt(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

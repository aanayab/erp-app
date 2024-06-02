import * as CryptoJS from 'crypto-js';

export class EncryptionService {

  // private secretKey = 'your-secret-key'; // Usa una clave secreta segura y compártela con el backend

  encrypt(data: string,secretKey:string): string {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt(data: string,secretKey:string): string {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

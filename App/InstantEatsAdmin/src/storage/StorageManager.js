import EncryptedStorage from 'react-native-encrypted-storage';

export default class StorageManager {
  static put = async (storageKey, value) => {
    try {
      await EncryptedStorage.setItem(storageKey, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  static get = async storageKey => {
    try {
      const value = await EncryptedStorage.getItem(storageKey);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  static clearStore = async () => {
    await EncryptedStorage.clear();
  };
}

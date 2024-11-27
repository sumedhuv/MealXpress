import API, {ENDPOINTS} from '../../api/apiService';
import shorthash from 'shorthash';
import StorageManager from '../../storage/StorageManager';
import {USER} from '../../storage/StorageKeys';

export const getProfile = async (isVendor, callback) => {
  try {
    let res = await API.get(
      isVendor ? ENDPOINTS.VENDOR_GET_CURRENT_USER : ENDPOINTS.GET_CURRENT_USER,
      true,
    );
    callback(res);
  } catch (e) {
    console.log(e);
  }
};

export const updateProfile = async (isVendor, callback, body) => {
  try {
    let res = await API.put(
      isVendor ? ENDPOINTS.UPDATE_VENDOR : ENDPOINTS.UPDATE_USER,
      body,
      true,
    );
    callback(res);
    await StorageManager.put(USER, JSON.stringify(res));
  } catch (e) {
    console.log(e);
  }
};

export const getActiveOrder = async (isVendor, callback) => {
  try {
    let res = await API.get(
      isVendor
        ? ENDPOINTS.GET_VENDOR_ACTIVE_ORDERS
        : ENDPOINTS.GET_ACTIVE_ORDERS,
      true,
    );
    if (res.success)
      callback(
        res.data.sort((a, b) => new Date(a.orderedAt) - new Date(b.orderedAt)),
      );
  } catch (e) {
    console.log(e);
  }
};

export const getFinishedOrder = async (isVendor, callback) => {
  try {
    let res = await API.get(
      isVendor
        ? ENDPOINTS.GET_VENDOR_FINISHED_ORDERS
        : ENDPOINTS.GET_FINISHED_ORDERS,
      true,
    );
    if (res.success)
      callback(
        res.data.sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt)),
      );
  } catch (e) {
    console.log(e);
  }
};

export const uploadPic = async imgURI => {
  let body = new FormData();
  body.append('file', {
    uri: imgURI,
    type: 'image/jpeg',
    name: `${shorthash.unique(imgURI)}.jpg`,
  });
  try {
    let upload = await API.uploadFile(ENDPOINTS.UPLOAD_PIC, body, true);
    if (upload.success) {
      return upload.url;
    }
  } catch (e) {
    console.log('Error in uploading Image');
    return null;
  }
};

export const deletePic = async url => {
  try {
    let delImage = await API.deleteResourceWithBody(
      ENDPOINTS.DELETE_PIC,
      {
        url,
      },
      true,
    );
    console.log('Deleted');
  } catch (e) {
    console.log(e);
  }
};

export const sendNotificationToAll = async body => {
  try {
    let notified = await API.post(ENDPOINTS.SEND_NOTIFICATIONS, body, true);
    return notified;
  } catch (e) {
    console.log(e);
    return;
  }
};

export function groupBy(objectArray, property, subproperty, subsubproperty) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property][subproperty][subsubproperty];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

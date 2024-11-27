import axios from 'axios';
import StorageManager from '../storage/StorageManager';
import {API_TOKEN} from '../storage/StorageKeys';
import {baseUrl} from '../Constants';

const req = async (config, isTokenNeeded = true, customHeaders) => {
  var headers = {
    'Content-Type': 'application/json',
  };
  var authToken = null;
  if (customHeaders) {
    headers = customHeaders;
  }
  if (isTokenNeeded) {
    authToken = await StorageManager.get(API_TOKEN);
    headers = {
      ...headers,
      Authorization: `Bearer ${authToken}`,
    };
  }
  const client = axios.create({
    baseURL: baseUrl,
    headers: headers,
  });

  const onSuccess = data => {
    return data.data;
  };

  const onFailure = error => {
    console.debug('Request Failed:- ' + error);
    return Promise.reject(error);
  };

  return client(config).then(onSuccess).catch(onFailure);
};

export default req;

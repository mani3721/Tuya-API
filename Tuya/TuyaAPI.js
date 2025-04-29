import * as qs from 'qs';
import * as crypto from 'crypto';
import { default as axios } from 'axios';

const httpClient = axios.create({
  baseURL: 'https://openapi.tuyain.com',
  timeout: 5 * 1e3,
});


export const getToken = async (clientId, secretKey) => {
    const method = 'GET';
    const timestamp = Date.now().toString();
    const signUrl = '/v1.0/token?grant_type=1';
    const contentHash = crypto.createHash('sha256').update('').digest('hex');
    const stringToSign = [method, contentHash, '', signUrl].join('\n');
    const signStr = clientId + timestamp + stringToSign;
  
    const headers = {
      t: timestamp,
      sign_method: 'HMAC-SHA256',
      client_id: clientId,
      sign: await encryptStr(signStr, secretKey),
    };
    
    try {
      const { data: login } = await httpClient.get('/v1.0/token?grant_type=1', { headers });
      if (!login || !login.success) {
        throw Error(`fetch failed: ${login.msg}`);
      }
  
      return login.result.access_token;
    } catch (error) {
      throw Error(`Token fetch error: ${error.message}`);
    }
  }

  /**
 * HMAC-SHA256 crypto function
 */
async function encryptStr(str, secret) {
    return crypto.createHmac('sha256', secret).update(str, 'utf8').digest('hex').toUpperCase();
  }
  

  /**
 * request sign, save headers 
 */
async function getRequestSign(
  path,
  method,
  headers = {},
  query = {},
  body = {},
  accessToken,
  clientId,
  secretKey
) {
  const t = Date.now().toString();
  const [uri, pathQuery] = path.split('?');
  const queryMerged = Object.assign(query, qs.parse(pathQuery));
  const sortedQuery = {};
  Object.keys(queryMerged)
    .sort()
    .forEach((i) => (sortedQuery[i] = query[i]));

  const querystring = decodeURIComponent(qs.stringify(sortedQuery));
  const url = querystring ? `${uri}?${querystring}` : uri;
  const contentHash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const stringToSign = [method, contentHash, '', url].join('\n');
  const signStr = clientId + accessToken + t + stringToSign;
  
  return {
    t,
    path: url,
    client_id: clientId,
    sign: await encryptStr(signStr, secretKey),
    sign_method: 'HMAC-SHA256',
    access_token: accessToken,
  };
}

export const getDeviceInfo= async (clientId, secretKey, path) => {
  const query = {};
  const method = 'GET';
  const url = path;

  const accessToken = await getToken(clientId, secretKey);
  const reqHeaders = await getRequestSign(url, method, {}, query, {}, accessToken, clientId, secretKey);

  try {
    const { data } = await httpClient.request({
      method,
      data: {},
      params: {},
      headers: reqHeaders,
      url: reqHeaders.path,
    });
    
    if (!data || !data.success) {
      throw Error(`request api failed: ${data.msg}`);
    }
    
    return data;
  } catch (error) {
    throw Error(`Device info fetch error: ${error.message}`);
  }
}

export const deviceCommand =  async (clientId, secretKey, path, body) => {
  const query = {};
  const method = 'POST';
  const url = path;

  const accessToken = await getToken(clientId, secretKey);
  const reqHeaders = await getRequestSign(url, method, {}, query, body, accessToken, clientId, secretKey);

 try {

  const { data } = await httpClient.request({
    method,
    data: body,
    params: {},
    headers: reqHeaders,
    url: reqHeaders.path,
  });

  if (!data || !data.success) {
    throw Error(`request api failed: ${data.msg}`);
  }

  return data;
  
 } catch (error) {
  throw Error(`Device info fetch error: ${error.message}`);

 }
}


export const deleteDevice= async (clientId, secretKey, path) => {
  const query = {};
  const method = 'DELETE';
  const url = path;

  const accessToken = await getToken(clientId, secretKey);
  const reqHeaders = await getRequestSign(url, method, {}, query, {}, accessToken, clientId, secretKey);

  try {
    const { data } = await httpClient.request({
      method,
      data: {},
      params: {},
      headers: reqHeaders,
      url: reqHeaders.path,
    });
    
    if (!data || !data.success) {
      throw Error(`request api failed: ${data.msg}`);
    }
    
    return data;
  } catch (error) {
    throw Error(`Device info fetch error: ${error.message}`);
  }
}

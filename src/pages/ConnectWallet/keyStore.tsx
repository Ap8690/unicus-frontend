import * as nearAPI from 'near-api-js';

const { keyStores } = nearAPI;

export const keyStore = new keyStores.BrowserLocalStorageKeyStore();
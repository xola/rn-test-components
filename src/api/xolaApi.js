import axios from 'axios';
import _ from 'lodash';
import pkg from '../../package.json';
import { XOLA_API_URL } from '../constants/apiConstants';
import { XOLA_API_VERSION } from '@env';

const USER_AGENT = `${pkg.name}/${pkg.version} (${pkg.description})`;

const xolaApi = axios.create({
    headers: { 'X-API-VERSION': XOLA_API_VERSION, 'User-Agent': USER_AGENT },
});

let store;

xolaApi.interceptors.request.use(config => {
    if (store) {
        const { auth, bootstrap } = store.getState();

        if (bootstrap.environment) {
            config.baseURL = XOLA_API_URL[bootstrap.environment];
        }

        if (config.params && config.params.authenticate) {
            config.headers['X-API-KEY'] = auth.apiKey;
            delete config.params.authenticate;
        }

        if (auth.seller.id && config.method === 'get') {
            if (config.params) {
                config.params.seller = auth.seller.id;
            } else {
                config.params = { seller: auth.seller.id };
            }
        }

        return config;
    }

    return config;
});

xolaApi.setStore = reduxStore => {
    store = reduxStore;
};

xolaApi.xolaUrl = uri => {
    const { bootstrap } = store.getState();

    if (bootstrap.environment) {
        const url = XOLA_API_URL[bootstrap.environment];
        return url + '/' + _.trimStart(uri, '/');
    }
};

export default xolaApi;

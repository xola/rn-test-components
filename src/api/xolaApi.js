import axios from 'axios';
import _ from 'lodash';
import pkg from '../../package.json';
import { XOLA_API_URL } from '../constants/apiConstants';

const XOLA_API_VERSION = '2020-01-15'
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

xolaApi.pluginUrl = uri => {
    const { bootstrap } = store.getState();

    let url = ""
    if (bootstrap.environment === "production") {
        url = "https://elrond.xola.com"
    } else if (bootstrap.environment === "sandbox") {
        url = "https://elrond.sandbox.xola.com"
    } else if (bootstrap.environment === "staging") {
        url = "https://elrond.staging.xola.com"
    } else if (bootstrap.environment === "preprod") {
        url = "https://elrond.preprod.xola.com"
    }

    return url + '/' + _.trimStart(uri, '/');
};

export default xolaApi;

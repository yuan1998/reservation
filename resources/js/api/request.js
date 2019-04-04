import axios from 'axios';
import Vue   from '../app'

import { getAuthToken, setAuthToken, clearAuth } from '../utils/assets';
import { refreshToken }                          from './methods/auth'

const { MIX_API_URL: baseURL } = process.env;

let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN'    : window.Laravel.csrfToken,
};

let instance = axios.create({
    baseURL,
    headers,
});


const serialize = (obj, prefix) => {
    let str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[ p ];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};

export const request = async (options) => {
    if (typeof options === 'stirng') {
        options = {
            url: options
        }
    }

    if (options.method === 'GET' && options.data) {
        let param   = serialize(options.data);
        options.url = `${options.url}?${param}`;
    }

    let response;
    try {
        response = await instance(options);
    } catch (e) {
        if (e.response) {
            response = e.response;
            console.log('response :', response);
        } else {
            throw new Error(e);
        }
    }

    if (options.status) {
        response.result = (options.status === response.status);
    }

    return response;
};

let firstLogin = false;

export const getToken = async () => {
    let auth = getAuthToken();
    let now  = new Date().getTime();

    let token = null;

    if (auth) {
        let twentyMin = 30 * 60 * 1000;
        let less      = auth.at - twentyMin;

        if (now > less || firstLogin) {
            firstLogin && (firstLogin = false);
            let tokenResponse = await refreshToken(auth.token);

            if (tokenResponse.status === 200) {
                let data = tokenResponse.data.data;
                token    = data.access_token;
                setAuthToken(data);
            } else {
                clearAuth();
            }
        }
        else {
            token = auth.token;
        }
    }
    else {
        clearAuth();
    }

    return token;
};


let timeout = null;

export const authRequest = async (options) => {
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }

    let token = await getToken();

    if (!token) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            Vue.$notify.error({
                title   : '错误',
                message : '登录超时.请重新登录.',
                duration: 1000,
            });
            Vue.$store.commit('Auth/clearUser');
            Vue.$router.push('/login');
        }, 250);
        return false;
    }

    let headers           = options.headers || {};
    headers.Authorization = 'Bearer ' + token;
    options.headers       = headers;

    return await request(options);
};

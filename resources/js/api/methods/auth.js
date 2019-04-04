import { setAuthToken, clearAuth, mergeApi } from '../../utils/assets';
import { request, authRequest }              from "../request";

export const login = async (params = {}, success = undefined, fail = undefined) => {
    let options = mergeApi('LOGIN', params);

    let authResponse = await request(options);

    if (authResponse.status === options.status) {
        setAuthToken(authResponse.data.data.access);

        (typeof success === 'function') && success(authResponse);
    }
    else {
        (typeof fail === 'function') && fail(authResponse);
    }

    return authResponse;
};

export const refreshToken = async (accessToken) => {
    let options = mergeApi('REFRESH_TOKEN', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    let refreshResponse = await request(options);

    if (refreshResponse.status === options.status) {
        setAuthToken(refreshResponse.data);
    }

    return refreshResponse;
};

export const logout = async () => {
    clearAuth();


};

export const current = async () => {
    let options = mergeApi('ME_INFO');
    return await authRequest(options);
};

export const signup = async (data) => {
    let res = await request({
        method: 'POST',
        data,
        url   : 'user',
    });

    if (res.status === 201) {
        setAuthToken(res.data.meta);
    }

    return res;
};

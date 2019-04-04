import moment from 'moment';

import Storage from './storage';
import API     from '../api/api';
import store   from '../store';
import app     from '../app';

const { MIX_TOKEN_NAME, MIX_TOKEN_EXPIRED_AT } = process.env;

export const oneOf = (val, arr) => {
    return arr.includes(val);
};

export const cloneOf = (val) => {
    return JSON.parse(JSON.stringify(val));
};

export const getAuthToken = () => {
    let token = Storage.getItem(MIX_TOKEN_NAME);
    let at    = Storage.getItem(MIX_TOKEN_EXPIRED_AT);

    if (!token || !at) {
        return false;
    }

    return {
        token,
        at,
    }
};

export const setAuthToken = (data) => {
    Storage.setItem(MIX_TOKEN_NAME, data.access_token);
    Storage.setItem(MIX_TOKEN_EXPIRED_AT, new Date().getTime() + (data.expires_in * 1000));
};

export const clearAuth = () => {
    Storage.removeItem(MIX_TOKEN_NAME);
    Storage.removeItem(MIX_TOKEN_EXPIRED_AT);

};

export const mergeApi = (api, obj = {}) => {
    let data = API[ api ];
    if (!data) {
        throw 'API NOT EXISTS';
    }
    return Object.assign({}, data, obj);
}

export const mergeOf = (...arg) => {
    return Object.assign({}, ...arg);
}

export const hasPermission = (perm) => {
    if (!perm || !perm.length) {
        return true;
    }

    let permission = store.getters && store.getters[ 'Auth/permission' ];

    let vali = [ 'all' ].concat(perm);

    return permission.some((item) => {
        return oneOf(item, vali);
    })
};

export const pluckOf = (arr, key) => {
    return (arr || []).map((item) => {
        return item[ key ] || null;
    }).filter((item) => {
        return item !== null;
    })
};

const defaultNotify = {
    title                   : '成功',
    message                 : '操作成功',
    type                    : 'success',
    duration                : 1000,
    dangerouslyUseHTMLString: true,
};

const valiabeName = {
    'avatar': '头像',
};

export const responseNotify = (res, success = {}) => {
    let { data, result } = res;
    if (result) {
        app.$notify(mergeOf(defaultNotify, success));
    }
    else if (data) {
        let message = filterResponseMessage(data.message);

        if (data.code === 0 || data.code === 400) {
            app.$notify.error(message);
        }
        else {
            app.$notify.error(message);
        }
    }
};

export const filterResponseMessage = (message, title = '错误') => {
    let type = typeof message;
    if (type === 'string') {
        message = [ message ];
    }
    else if (type === 'object') {
        message = flattenDeep(Object.values(message || {}));
    }

    let len = message.length;

    return mergeOf(defaultNotify, {
        title,
        message : message.join('<br/>'),
        duration: len ? len * 1000 : 1000,
    })
};

export const flattenDeep = (arr1) => {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

export const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export const idToArray = (ids) => {
    let arr = [];

    if (isNumeric(ids)) {
        arr = [ parseInt(ids) ];
    }
    else if (typeof ids === 'string') {
        arr = ids.split(',').map((each) => parseInt(each));
    }
    return arr;
};

export const dateTimeToTime = (date) => {
    if (!date) {
        throw new Error('[dateTimeToTime] date is undefined');
    }
    return moment(moment(date).format('HH:mm'), 'HH:mm');
};

const format         = 'HH:mm';
export const hasTime = (time) => {
    let timelines = store.state.Timeline.timelines;
    time          = dateTimeToTime(time);
    return timelines.find((each) => {
        let bt = moment(each.beginTime, format);
        let et = moment(each.endTime, format);
        return time.isBefore(et) && (time.isSameOrAfter(bt));
    });
};


export const fitlerObjectOfArray = (obj, arr) => {
    obj = cloneOf(obj);

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!oneOf(key, arr)) {
                delete obj[ key ];
            }
        }
    }
    return obj;
};

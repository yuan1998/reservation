import { mergeApi, setAuthToken, clearAuth } from "../../utils/assets";
import {  authRequest, request }    from "../../api/request";

export default {
    namespaced: true,
    state     : {
        userInfo   : null,
        permissions: null,
        roles      : null,
    },
    getters   : {
        permission(state) {
            return !state.userInfo ? [] : state.userInfo.permission.map((item) => {
                return item.name;
            })
        },
        rolesName(state) {
            return state.roles ? state.roles.map(e => e.name) : [];
        }
    },
    mutations : {
        userInfo(state, data) {
            state.userInfo    = data;
            state.roles       = data.role;
            state.permissions = data.permission;
        },
        clearUser(state) {
            state.userInfo    = null;
            state.permissions = null;
            state.roles       = null;
        }
    },
    actions   : {
        logout({ commit }) {
            commit('clearUser');
            clearAuth();
        },
        async login(_, data) {
            let options = mergeApi('LOGIN', { data });
            let res     = await request(options);

            if (res.result) {
                setAuthToken(res.data.data);
                // commit('userInfo', data.data.userInfo)
            }
            else {
                console.log('res :', res);
            }

            return res.data;
        },
        async me({ commit }) {
            let options = mergeApi('ME_INFO');

            let res = await authRequest(options);

            if (res.result) {
                commit('userInfo', res.data);
            }
            else {
                console.log('res :', res);
            }

            return res;
        },
        async userExists({ getters, state, dispatch }) {
            let token = await getters.token;
            if (token) {
                !state.userInfo && await dispatch('me');
                return true;
            }
            return false;
        },
    }
}

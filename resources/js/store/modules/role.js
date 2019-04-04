import { authRequest }                from "../../api/request";
import { idToArray, mergeApi, oneOf } from "../../utils/assets";
import app                            from "../../app";

export default {
    namespaced: true,
    state     : {
        roles: null,
    },
    mutations : {
        roles(state, roles) {
            state.roles = roles;
        },
        changeRoleOfId(state, data) {
            state.roles = (state.roles || []).map((item) => {
                if (item.id === data.id) {
                    return data;
                }
                return item;
            })
        },
        addRole(state, data) {
            if (!state.roles) {
                state.roles = [];
            }

            state.roles.push(data);
        },
        removeRole(state, ids) {
            let arr = idToArray(ids);

            state.roles = state.roles.filter((item) => {
                return !oneOf(item.id, arr);
            })
        }
    },
    actions   : {
        async getRoles({ dispatch, state },struct = false) {
            if (!state.roles || struct) {
                let res = await dispatch('roles');
            }
            return state.roles || [];
        },
        async roles({ commit }) {
            let options = mergeApi('ROLE_INDEX');
            let res     = await authRequest(options);

            if (res.result) {
                commit('roles', res.data);
            }

            return res;
        },
        async updateRole({ commit }, data) {

            let options = mergeApi('ROLE_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('changeRoleOfId', res.data);
            }

            return res;
        },
        async createRole({ commit }, data) {
            let options = mergeApi('ROLE_CREATE', { data });
            let res     = await authRequest(options);

            if (res.status === options.status) {
                commit('addRole', res.data);
            }

            return res;
        },
        async deleteRole({ commit }, id) {
            let options = mergeApi('ROLE_DELETE');
            options.url = `${options.url}${id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('removeRole', id);
            }

            return res;
        }
    }
}

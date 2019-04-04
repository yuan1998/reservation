import app                   from '../../app'
import { authRequest }       from "../../api/request";
import { mergeApi, mergeOf } from "../../utils/assets";

const defaultValue = {
    deleteModelShow   : false,
    deleteModelLoading: false,
};

export default {
    namespaced: true,
    state     : {
        users    : null,
        page     : 1,
        pageIndex: 15,
        total    : 0,
        data     : null,
        lastPage : 0,
    },
    mutations : {
        users(state, data) {
            state.users = data.map((item) => mergeOf(defaultValue, item));
        },
        meta(state, data) {
            state.page     = data.current_page;
            state.total    = data.total;
            state.lastPage = data.last_page;
        },
        page(state, page) {
            state.page = page;
        },
        pageIndex(state, value) {
            state.pageIndex = value;
        },
        changeUserForIndex(state, data) {
            if (!state.users) {
                return;
            }
            let index = state.users.findIndex((item) => item.id === data.id);

            if (~index) {
                state.users.splice(index, 1, mergeOf(defaultValue, data));
            }
        }
    },
    actions   : {
        async getUsers({ commit, state }) {
            let options = mergeApi('USER_INDEX');

            options.url = `${options.url}?page=${state.page}&pageindex=${state.pageIndex}`;

            let res = await authRequest(options);

            if (res.result) {
                let data = res.data;
                let meta = data.meta;
                commit('users', data.data || []);
                commit('meta', meta);
            }

            return res;
        },
        async createUser({ commit }, data) {
            let options = mergeApi('USER_CREATE', { data });
            let res     = await authRequest(options);

            if (res.result) {


            }
            console.log('res :', res);

            return res;
        },
        async updateUser({ commit }, data) {
            let options = mergeApi('USER_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                let user = res.data;
                commit('changeUserForIndex', user);
            }

            return res;
        },
        async deleteUser({ commit }, ids) {
            let options = mergeApi('USER_DELETE');
            options.url = `${options.url}${ids}`;
            return await authRequest(options);

        }
    }
}

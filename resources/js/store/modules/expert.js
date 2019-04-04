import { fitlerObjectOfArray, mergeApi, mergeOf } from "../../utils/assets";
import app                                        from "../../app";
import { authRequest }                            from "../../api/request";


const defaultValue = {
    deleteModelShow   : false,
    deleteModelLoading: false,
};

const fields = [
    'description', 'id', 'name', 'project'
];

export default {
    namespaced: true,
    state     : {
        experts   : null,
        page      : 1,
        pageIndex : 15,
        total     : 0,
        data      : null,
        lastPage  : 0,
        allExperts: null,
    },
    getters   : {
        allExpertOfId({ allExperts }) {
            if (allExperts.length === 0) {
                return null;
            }
            return (id) => {
                return allExperts.find((item) => item.id === id);
            }
        }
    },
    mutations : {
        allExperts(state, data) {
            state.allExperts = data;
        },
        experts(state, data) {
            state.experts = data.map(item => mergeOf(defaultValue, item));
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
        changeExpertOfIndex(state, data) {

            let index = state.experts.findIndex(item => item.id === data.id);
            if (~index) {
                data = mergeOf(defaultValue, data);
                state.experts.splice(index, 1, data);
            }
        }
    },
    actions   : {
        async getAllExperts({ state, dispatch }, struct = false) {
            if (!state.allExperts || struct) {
                await dispatch('allExperts');
            }
            return state.allExperts;
        },
        async getExperts({ commit, state }) {
            let options = mergeApi('EXPERT_INDEX');

            options.url = `${options.url}?page=${state.page}&pageindex=${state.pageIndex}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('experts', res.data.data);
                commit('meta', res.data.meta);
            }

            return res;
        },
        async allExperts({ commit }) {
            let options = mergeApi('EXPERT_ALL');
            let res     = await authRequest(options);

            if (res.result) {
                commit('allExperts', res.data);
            }

            return res;
        },
        async createExpert({ commit }, data) {
            data = fitlerObjectOfArray(data, fields);

            let options = mergeApi('EXPERT_CREATE', { data });
            let res     = await authRequest(options);

            if (res.result) {

            }
            console.log('res :', res);

            return res;
        },
        async updateExpert({ commit }, data) {
            data = fitlerObjectOfArray(data, fields);

            let options = mergeApi('EXPERT_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                console.log('res.data :', res.data);
                commit('changeExpertOfIndex', res.data);
            }
            console.log('res :', res);

            return res;
        },
        async deleteExpert({ commit }, ids) {
            let options = mergeApi('EXPERT_DELETE');
            options.url = `${options.url}${ids}`;
            let res     = await authRequest(options);
            return res;
        }
    }
}

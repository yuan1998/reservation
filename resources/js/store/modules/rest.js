import Vue                            from 'vue';
import { idToArray, mergeApi, oneOf } from "../../utils/assets";
import { authRequest }                from "../../api/request";
import moment                         from "moment/moment";

const defaultValue = {
    switchLoading     : false,
    deleteModelShow   : false,
    deleteModelLoading: false,
};

const parseItem = (item) => {
    return {
        ...defaultValue,
        ...item,
    }
};

const formtDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
}

export default {
    namespaced: true,
    state     : {
        restsDateTime    : '',
        rests            : null,
        formRestsDateTime: '',
        formRests        : [],
        restDate         : {},
        restData         : {},
    },
    mutations : {
        restDataAdd(state, { data, date }) {
            Vue.set(state.restData, date, data);
        },
        restsDateTime(state, data) {
            state.restDateTime = data;
        },
        rests(state, data) {
            state.rests = data.map((item) => {
                return parseItem(item);
            });
        },
        formRestsDateTime(state, data) {
            state.formRestsDateTime = data;
        },
        formRests(state, data) {
            state.formRests = data.map((item) => {
                return parseItem(item);
            });
        },

        restData(state, { date, data }) {
            data = data.map((item) => {
                return parseItem(item);
            });
            Vue.set(state.restData, date, data);

        },
        changeRestOfId(state, data) {
            let index = state.rests.findIndex((item) => item.id === data.id);
            if (~index) {
                state.rests.splice(index, 1, parseItem(data));
            }
        },
        addRest(state, data) {
            let date = moment(data.date).format('YYYY-MM-DD');
            if (!state.restData[ date ]) {
                return;
            }

            state.restData[ date ].push(parseItem(data));
        },
        removeRest(state, { id, date }) {
            let item = state.restData[ date ];
            if (!item || !id) {
                return;
            }
            state.restData[ date ] = item.filter((e) => e.id !== id);
        }
    },
    getters   : {
        restDate({ rests }) {
            let result = {};
            (rests || []).forEach((item) => {
                let date = item.formatDate;
                if (!result[ date ]) {
                    result[ date ] = [];
                }
                result[ date ].push(item);
            });
            return result;
        },
        displayRest({ rests }) {

            return (rests || []).filter(item => item.display);
        },
    },
    actions   : {
        async getRestOfData({ dispatch, state }, { date, strict }) {
            date     = moment(date).format("YYYY-MM-DD");
            let data = state.restData[ date ];
            if (!data || strict) {
                await dispatch('restData', date);
                data = state.restData[ date ];
            }

            return data;
        },
        async restData({ commit }, date) {
            let data    = { date };
            let options = mergeApi('REST_INDEX', { data });
            let res     = await authRequest(options);

            if (res.result) {
                commit('restDataAdd', {
                    data: res.data,
                    date,
                })
            }
            return res;
        },


        async rests({ commit }, { type, data }) {
            let options = mergeApi('REST_INDEX', { data });
            let res     = await authRequest(options);

            if (res.result) {
                console.log('type :', type);
                commit(`${type}DateTime`, data.date);
                commit(type, res.data);
            }

            return res;
        },
        async updateRest({ commit }, data) {

            let options = mergeApi('REST_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                let d = {
                    ...res.data,
                    formatDate: formtDate(data.date),
                };
                commit('changeRestOfId', d);
            }

            return res;
        },
        async createRest({ commit }, data) {
            let options = mergeApi('REST_CREATE', { data });
            let res     = await authRequest(options);

            if (res.result) {
                let d = {
                    ...res.data,
                    formatDate: formtDate(data.date),
                };
                commit('addRest', d);
            }

            return res;
        },
        async deleteRest({ commit }, { id, date }) {
            let options = mergeApi('REST_DELETE');
            options.url = `${options.url}${id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('removeRest', { id, date });
            }

            return res;
        },
    }
}

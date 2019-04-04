import moment                                              from 'moment'
import { idToArray, mergeApi, oneOf, fitlerObjectOfArray } from "../../utils/assets";
import { authRequest }                                     from "../../api/request";

const defaultValue = {
    switchLoading     : false,
    deleteModelShow   : false,
    deleteModelLoading: false,
};

const format = "YYYY-MM-DD";

const parseItem = (item) => {
    return {
        ...defaultValue,
        ...item,
    }
};

const fields = [
    'age', 'date', 'description', 'expert_id', 'id', 'name', 'phone', 'project_id', 'timeline_id',
];

export default {
    namespaced: true,
    state     : {
        reservations: null,
        tableData   : [],
        dateData    : {},
    },
    mutations : {
        tableData(state, data) {
            state.tableData = data;
        },
        reservations(state, data) {
            state.reservations = data.map((item) => {
                return parseItem(item);
            });
        },
        changeReservationOfId(state, data) {
            let date = moment(data.date).format(format);
            if (!state.dateData[ date ]) {
                return;
            }
            let index = state.dateData[ date ].findIndex((item) => item.id === data.id);
            if (~index) {
                state.dateData[ date ].splice(index, 1, parseItem(data));
            }
        },
        removeReservation(state, { id, date }) {
            date      = moment(date).format(format);
            let items = state.dateData[ date ];
            if (!items) {
                return;
            }

            state.dateData[ date ] = items.filter((item) => {
                return id !== item.id;
            })
        },
        reservationDate(state, { date, data }) {
            state.dateData[ date ] = data;
        },
        addDateReservation(state, data) {
            let date = moment(data.date).format(format);
            if (!state.dateData[ date ]) {
                return;
            }
            state.dateData[ date ].push(parseItem(data));
        }
    },
    getters   : {
        displayReservation({ reservations }) {

            return (reservations || []).filter(item => item.display);
        }
    },
    actions   : {
        async reservationDateData({ state, dispatch }, { date, strict }) {
            date     = moment(date).format(format);
            let data = state.dateData[ date ];

            if (!data || strict) {
                await dispatch('reservationDate', date);
                data = state.dateData[ date ];
            }

            return data || [];
        },
        async reservationDate({ commit }, date) {
            let data    = { date };
            let options = mergeApi('RESERVATION_INDEX', { data });
            let res     = await authRequest(options);
            if (res.result) {
                commit('reservationDate', {
                    date,
                    data: res.data
                });
            }

            return res;
        },
        async reservations({ commit }, data) {
            let options = mergeApi('RESERVATION_INDEX', { data });
            let res     = await authRequest(options);

            if (res.result) {
                commit('reservations', res.data);
            }

            return res;
        },
        async updateReservation({ commit }, data) {
            data        = fitlerObjectOfArray(data, fields);
            let options = mergeApi('RESERVATION_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('changeReservationOfId', res.data);
            }

            return res;
        },
        async addDateReservation({ commit }, data) {
            data        = fitlerObjectOfArray(data, fields);
            let options = mergeApi('RESERVATION_CREATE', { data });
            let res     = await authRequest(options);

            if (res.result) {
                commit('addDateReservation', res.data);
            }

            return res;
        },

        async deleteReservation({ commit }, { id, date }) {
            let options = mergeApi('RESERVATION_DELETE');
            options.url = `${options.url}${id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('removeReservation', { id, date });
            }

            return res;
        },
        async getCount(_, date = null) {
            let options = mergeApi('RESERVATION_COUNT');
            if (date) {
                options.url = `${options.url}?date=${date}`;
            }
            let res = await authRequest(options);

            return res;

        }
    }
}

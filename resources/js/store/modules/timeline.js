import moment                                                                                from 'moment';
import { authRequest }                                                                       from "../../api/request";
import { dateTimeToTime, fitlerObjectOfArray, idToArray, mergeApi, mergeOf, oneOf, pluckOf } from "../../utils/assets";
import app                                                                                   from "../../app";

const defaultValue = {
    switchLoading     : false,
    deleteModelShow   : false,
    deleteModelLoading: false,
};
const format       = 'HH:mm';


const parseItem = (item) => {
    return {
        ...defaultValue,
        ...item,
        beginTime: moment(item.begin_time, 'YYYY-MM-DD HH:mm:ss').format(format),
        endTime  : moment(item.end_time, 'YYYY-MM-DD HH:mm:ss').format(format),
    }
};

const fields = [
    'begin_time' , 'end_time', 'id'
];

export default {
    namespaced: true,
    state     : {
        timelines: null,
    },
    mutations : {
        timelines(state, data) {
            state.timelines = data.map((item) => {
                return parseItem(item);
            });
        },
        changeTimelineOfId(state, data) {
            let index = state.timelines.findIndex((item) => item.id === data.id);
            if (~index) {
                state.timelines.splice(index, 1, parseItem(data));
            }
        },
        addTimeline(state, data) {
            if (!state.timelines) {
                state.timelines = [];
            }

            state.timelines.push(parseItem(data));
        },
        removeTimeline(state, ids) {
            let arr         = idToArray(ids);
            state.timelines = state.timelines.filter((item) => {
                return !oneOf(item.id, arr);
            })
        },
        hasTime({timelines} , time) {
            time      = dateTimeToTime(time);
            let index = timelines.findIndex((each) => {
                let bt = moment(each.beginTime, format);
                let et = moment(each.endTime, format);
                return time.isBefore(et) && (time.isSame(bt) || time.isAfter(bt));
            });

            console.log('index :', ~index ? timelines[ index ] : null);
            return ~index ? timelines[ index ] : null;
        }
    },
    getters   : {
        displayTimeline({ timelines }) {
            return (timelines || []).filter(item => item.display);
        }
    },
    actions   : {
        async getTimelines({ state, dispatch }, struct = false) {
            if (!state.timelines || struct) {
                await dispatch('timelines');
            }
            return state.timelines;
        },
        async timelines({ commit }, data) {
            let options = mergeApi('TIMELINE_INDEX', { data });
            let res     = await authRequest(options);

            if (res.result) {
                commit('timelines', res.data);
            }

            return res;
        },
        async updateTimeline({ commit }, data) {
            data = fitlerObjectOfArray(data, fields);

            let options = mergeApi('TIMELINE_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('changeTimelineOfId', res.data);
            }

            return res;
        },
        async createTimeline({ commit }, data) {
            data = fitlerObjectOfArray(data, fields);

            let options = mergeApi('TIMELINE_CREATE', { data });
            let res     = await authRequest(options);

            if (res.result) {
                commit('addTimeline', res.data);
            }

            return res;
        },
        async deleteTimeline({ commit }, id) {
            let options = mergeApi('TIMELINE_DELETE');
            options.url = `${options.url}${id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('removeTimeline', id);
            }

            return res;
        },
        async saveOrder({ state }) {
            let data    = {
                data: pluckOf(state.timelines, 'id')
            };
            let options = mergeApi('TIMELINE_ORDER', { data });
            let res     = await authRequest(options);

            if (res.result) {

            }
            return res;
        },

    }
}

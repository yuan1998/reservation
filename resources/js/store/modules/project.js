import { authRequest }                                                       from "../../api/request";
import { fitlerObjectOfArray, idToArray, mergeApi, oneOf, pluckOf } from "../../utils/assets";

const defaultValue = {
    switchLoading     : false,
    deleteModelShow   : false,
    deleteModelLoading: false,
};

const editFields = [
    'id' , 'display' , 'name'
];

export default {
    namespaced: true,
    state     : {
        projects: null,
    },
    mutations : {
        projects(state, data) {
            state.projects = data.map((item) => {
                return { ...defaultValue, ...item };
            });
        },
        changeProjectOfId(state, data) {
            let index = state.projects.findIndex((item) => item.id === data.id);
            if (~index) {
                data = { ...defaultValue, ...data };
                state.projects.splice(index, 1, data);
            }
        },
        addProject(state, data) {
            if (!state.projects) {
                state.projects = [];
            }

            state.projects.push({ ...defaultValue, ...data });
        },
        removeProject(state, ids) {
            let arr = idToArray(ids);

            state.projects = state.projects.filter((item) => {
                return !oneOf(item.id, arr);
            })
        }
    },
    getters   : {
        displayProject({ projects }) {
            return (projects || []).filter(item => item.display);
        },
        idOfName({ projects }) {
            let result = {};
            (projects || []).forEach((item) => {
                result[ item.id ] = item.name;
            });
            return result;
        }
    },
    actions   : {
        async getProject({ dispatch, state }, struct = false) {
            if (!state.projects || struct) {
                await dispatch('projects');
            }
            return state.projects;
        },
        async projects({ commit }) {
            let options = mergeApi('PROJECT_INDEX');
            let res     = await authRequest(options);

            if (res.result) {
                commit('projects', res.data);
            }

            return res;
        },
        async updateProject({ commit }, data) {
            data = fitlerObjectOfArray(data , editFields);
            let options = mergeApi('PROJECT_UPDATE', { data });
            options.url = `${options.url}${data.id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('changeProjectOfId', res.data);
            }

            return res;
        },
        async createProject({ commit }, data) {
            data = fitlerObjectOfArray(data , editFields);

            let options = mergeApi('PROJECT_CREATE', { data });
            let res     = await authRequest(options);

            if (res.result) {
                commit('addProject', res.data);
            }

            return res;
        },
        async deleteProject({ commit }, id) {
            let options = mergeApi('PROJECT_DELETE');
            options.url = `${options.url}${id}`;
            let res     = await authRequest(options);

            if (res.result) {
                commit('removeProject', id);
            }

            return res;
        },
        async saveOrder({ state }) {
            let data    = {
                data: pluckOf(state.projects, 'id')
            };
            let options = mergeApi('PROJECT_ORDER', { data });
            let res     = await authRequest(options);

            if (res.result) {

            }
            return res;
        },
    }
}

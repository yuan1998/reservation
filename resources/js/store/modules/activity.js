import { mergeApi }    from "../../utils/assets";
import { authRequest } from "../../api/request";

const activity = {
    namespaced: true,
    state     : {
        total      : 0,
        activities : null,
        meta       : null,
        currentPage: 1,
        pageIndex  : 15,
    },
    mutations : {
        activities(state, { data, meta }) {
            state.activities  = data;
            state.meta        = meta;

        },
        currentPage(state , page) {
            state.currentPage=page;
        }
    },
    actions   : {
        async getActivity({ commit,state }) {
            let options = mergeApi('ACTIVITY_INDEX');
            options.url = `${options.url}?page=${state.currentPage}&pageindex=${state.pageIndex}`;
            let res = await authRequest(options);

            if (res.result) {
                commit('activities' , res.data);
            }

            return res;

        }
    }
}
export default activity;

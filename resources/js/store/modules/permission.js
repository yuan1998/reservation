import { mergeApi }                    from "../../utils/assets";
import { authRequest }                 from "../../api/request";
import { asyncRoutes, constantRoutes } from '../../routes'

/**
 * 通过meta.permission判断是否与当前用户权限匹配
 * @param roles
 * @param permissions
 * @param route
 */
function hasPermission(roles, permissions, route) {
    if (route.meta) {
        let ps = route.meta.permissions;
        let rs = route.meta.roles;

        if (ps && !permissions.some(permission => ps.includes(permission))) return false;
        if (rs && !roles.some(role => rs.includes(role))) return false;

    }
    return true;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 * @param permissions
 */
export function filterAsyncRoutes(routes, roles, permissions) {
    const res = [];

    routes.forEach(route => {
        const tmp = { ...route };

        if (hasPermission(routes, permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles, permissions)
                if (!tmp.children || tmp.children.length === 0) return;
            }
            res.push(tmp)
        }
    });

    return res
}


export default {
    namespaced: true,
    state     : {
        permissions: null,
        routes     : [],
        addRoutes  : []
    },
    mutations : {
        permissions(state, val) {
            state.permissions = val;
        },
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes;
            state.routes    = constantRoutes.concat(routes)
        }
    },
    getters   : {
        routes: state => state.routes,
    },
    actions   : {
        async getPermissions({ dispatch, state } , struct = false) {
            if (!state.permissions || struct) {
                let res = await dispatch('permissions');
            }

            return state.permissions || [];
        },
        async permissions({ commit }) {
            let options = mergeApi('PERMISSION_INDEX');

            let res = await authRequest(options);

            if (res.status === options.status) {
                commit('permissions', res.data.data);
            }

            return res;
        },
        GenerateRoutes({ commit }, { roles = [], permissions = [] }) {
            roles       = roles.map(e => e.name);
            permissions = permissions.map(e => e.name);
            return new Promise(resolve => {
                let accessedRoutes;
                if (roles.includes('admin') || permissions.includes('all')) {
                    accessedRoutes = asyncRoutes
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, permissions)
                }
                commit('SET_ROUTES', accessedRoutes);
                resolve(accessedRoutes);
            })
        }
    }

};

import router            from './routes'
import store             from './store'
import { Message }       from 'element-ui'
import { getToken }      from "./api/request";
import { clearAuth }     from "./utils/assets";
import { hasPermission } from "./utils/validate";


const whiteList = [ '/login', '/404', '/401' ]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    let token = await getToken();

    if (token) {

        // determine if there has token
        /* has token*/
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (!store.state.Auth.userInfo) {
                // 判断当前用户是否已拉取完user_info信息

                let res = await store.dispatch('Auth/me');

                if (res.result) {
                    // 拉取user_info
                    const roles       = res.data.role; // note: roles must be a object array! such as: [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
                    const permissions = res.data.permission;
                    store.dispatch('Permission/GenerateRoutes', { roles, permissions }).then(accessRoutes => {
                        // 根据roles权限生成可访问的路由表\
                        router.addRoutes(accessRoutes); // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                }
                else {
                    clearAuth();
                    let err = res.data.message;
                    Message.error(err);
                    next({ path: '/' });
                }
            } else {
                next();
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                // if (hasPermission(store.getters[ 'Auth/rolesName' ], to.meta.roles, 'admin') ||
                //     hasPermission(store.getters[ 'Auth/permission' ], to.meta.permissions)) {
                // } else {
                //     next({ path: '/401', replace: true, query: { noGoBack: true } });
                // }
                // 可删 ↑
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
});

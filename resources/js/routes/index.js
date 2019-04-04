import Vue    from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Layout            from '../pages/Layout/index';
import expertRouter      from './modules/expert'
import timelineRouter    from './modules/timeline'
import projectRouter     from './modules/project'
import reservationRouter from './modules/reservation'
import activityRouter    from './modules/logs'

export const constantRoutes = [
    {
        path     : '/redirect',
        component: Layout,
        hidden   : true,
        children : [
            {
                path     : '/redirect/:path*',
                component: () => import('../pages/redirect/index' ),
            }
        ]
    },
    {
        path     : '/login',
        component: () => import('../pages/login/index' ),
        hidden   : true
    },
    {
        path     : '/404',
        component: () => import('../pages/errorPage/404' ),
        hidden   : true
    },
    {
        path     : '/401',
        component: () => import('../pages/errorPage/401' ),
        hidden   : true
    },
    {
        path     : '',
        component: Layout,
        redirect : 'dashboard',
        children : [
            {
                path     : 'dashboard',
                component: () => import('../components/admin/home' ),
                name     : 'dashboard',
                meta     : { title: '首页', icon: 'my-home', noCache: true, affix: true }
            }
        ]
    },
]

export default new Router({
    mode          : 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes        : constantRoutes
});


export const asyncRoutes = [
    reservationRouter,
    projectRouter,
    expertRouter,
    timelineRouter,
    {
        path      : '/permission',
        component : Layout,
        redirect  : '/permission/role',
        alwaysShow: true, // will always show the root menu
        meta      : {
            title: '权限',
            icon : 'my-suo',
        },
        children  : [
            {
                path     : 'role',
                name     : 'role',
                component: () => import('../components/admin/role/index' ),
                meta     : {
                    title      : '角色管理',
                    icon       : 'my-jiaose',
                    permissions: [ 'permission:manager' ],
                }
            },
            {
                path     : 'user',
                name     : 'user',
                component: () => import('../components/admin/user/index' ),
                meta     : {
                    title      : '用户管理',
                    icon       : 'my-yonghu',
                    permissions: [ 'permission:manager' ],
                }
            },
        ]
    },
    activityRouter,
    { path: '*', redirect: '/404', hidden: true }
];

import { hasPermission } from "../../utils/assets";

const validate = (menus, child = false) => {
    let result = true;
    menus.map((item) => {
        if (item.children && item.children.length) {
            item.hidden = validate(item.children, true);
        }
        else if (item.permission) {
            item.hidden = !hasPermission(item.permission);
        }

        (!item.hidden && result) && (result = false);
    });
    return child ? result : menus
};

const menus = [
    {
        name      : '首页',
        index     : '/admin/',
        icon      : 'my-home',
        permission: [],
    },
    {
        name      : '预约管理',
        icon: 'my-yuyue',
        index     : '/admin/reservation/',
        permission: [ 'reservation:table' ],
    },
    {
        name      : '医生管理',
        icon: 'my-yisheng',
        index     : '/admin/expert/',
        permission: [ 'expert:index' ],
    },
    {
        name      : '项目管理',
        icon: 'my-xiangmu',
        index     : '/admin/project/',
        permission: [ 'project:index' ],
    },
    {
        name      : '时间段管理',
        icon: 'my-shijian',
        index     : '/admin/timeline/',
        permission: [ 'timeline:index' ],
    },
    {
        name    : '权限控制',
        index   : 'permission-controller',
        icon: 'my-permission',
        hidden  : false,
        children: [
            {
                name      : '用户管理',
                icon: 'my-yonghu',
                index     : '/admin/user/',
                permission: [ 'user:index' ],
            },
            {
                name      : '角色管理',
                icon: 'my-jiaose',
                index     : '/admin/role/',
                permission: [ 'role:index' ],
            }
        ]
    },
];

export default {
    namespaced: true,
    state     : {
        menus: null
    },
    mutations : {
        menus(state, data) {
            state.menus = data;
        }
    },
    actions   : {
        getMenus({ commit }) {
            let data = validate(menus);
            console.log('data :', data);
            commit('menus', data);
        }
    }
}


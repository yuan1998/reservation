/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue       from 'vue'
import ElementUI from 'element-ui';


import App               from './app.vue'
import router            from './routes'
import store             from './store'
import Bus               from './utils/bus'
import { oneOf }         from "./utils/assets";
import { hasPermission } from "./utils/validate";
import './permission';


Vue.config.productionTip = false;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.use(ElementUI);
Bus(Vue);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.prototype.$hasPermission = (permission = '') => {

    let permissionsName = store.getters[ 'Auth/permission' ];
    if (!permissionsName || !permissionsName.length) return false;
    permission = [].concat(permission);

    return hasPermission(permissionsName, permission);
};

Vue.prototype.$hasRole = (role = '') => {

    let rolesName = store.getters[ 'Auth/rolesName' ];

    if (!rolesName || !rolesName.length) return false;

    role = [].concat(role);

    return hasPermission(rolesName, role, 'admin');
};

const app = new Vue({
    el    : '#app',
    router,
    store,
    render: h => h(App)
});

export default app;



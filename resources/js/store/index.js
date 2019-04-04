import Vue  from 'vue'
import Vuex from 'vuex'

import Menu        from './modules/menu';
import Auth        from './modules/auth';
import User        from './modules/user';
import Role        from './modules/role';
import Permission  from './modules/permission';
import Expert      from './modules/expert';
import Project     from './modules/project';
import Timeline    from './modules/timeline';
import Rest        from './modules/rest';
import Reservation from './modules/reservation';
import app         from './modules/app';
import tagView     from './modules/tagView';
import Activity    from './modules/activity';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        Activity,
        tagView,
        app,
        Menu,
        Auth,
        User,
        Role,
        Permission,
        Expert,
        Project,
        Timeline,
        Rest,
        Reservation
    }
});

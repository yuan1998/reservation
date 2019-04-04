import Layout from '../../pages/Layout';

const activityRouter = {
    path     : '/logs',
    component: Layout,
    redirect : '/logs/activity',
    meta     : {
        title: '日志',
        icon : 'my-yuyue',
    },
    children : [
        {
            path     : 'activity',
            component: () => import('../../pages/Activity/activity'),
            name     : 'activities',
            meta     : {
                title: '操作日志',
                icon : 'my-yuyue',
                permissions: [ 'activity:index' ],
            }
        },
    ]
};

export default activityRouter;

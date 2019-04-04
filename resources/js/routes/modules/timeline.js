import Layout from '../../pages/Layout/index';

const timelineRouter = {
    path     : '/timeline',
    component: Layout,
    children : [
        {
            path     : '',
            component: () => import('../../pages/timeline'),
            name     : 'timeline',
            meta     : { title: '时间段管理', icon: 'my-shijian',permissions: ['timeline:index'] }
        },
    ]
};

export default timelineRouter;

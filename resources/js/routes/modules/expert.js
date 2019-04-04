import Layout from '../../pages/Layout/index';

const expertRouter = {
    path     : '/expert',
    component: Layout,
    children : [
        {
            path     : '',
            component: () => import('../../pages/expert' ),
            name     : 'expert',
            meta     : { title: '医生管理', icon: 'my-yisheng' , permissions: ['expert:index'] }
        },
    ]
};

export default expertRouter;

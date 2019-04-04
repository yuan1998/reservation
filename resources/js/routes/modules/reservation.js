import Layout from '../../pages/Layout';

const reservationRouter = {
    path     : '/reservation',
    component: Layout,
    redirect : '/reservation/table',
    meta     : { title: '预约', icon: 'my-yuyue'},
    children : [
        {
            path     : 'table',
            component:  () => import('../../pages/rest'),
            name     : 'reservation',
            meta     : { title: '预约表格', icon: 'my-yuyue' , permissions: ['reservation:table']}
        },
    ]
};

export default reservationRouter;

import Layout from '../../pages/Layout/index';

const projectRouter = {
    path     : '/project',
    component: Layout,
    children : [
        {
            path     : '',
            component: () => import('../../pages/project' ),
            name     : 'project',
            meta     : { title: '项目管理', icon: 'my-xiangmu' ,permissions: ['project:index'] }
        },
    ]
};

export default projectRouter;

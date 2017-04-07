import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [{
        path: '/login',
        component: resolve => {
            require(['../components/Login'], resolve)
        },
        meta: { requiresAuth: false, title: '登陆' },
    },
    {
        path: '/',
        component: resolve => {
            require(['../components/Index'], resolve)
        },
        meta: { requiresAuth: true },
        children: [{
                path: 'account',
                component: resolve => {
                    require(['../components/Account'], resolve)
                },
                meta: { requiresAuth: true, title: '账户管理' },
            },
            {
                path: 'setting',
                component: resolve => {
                    require(['../components/Setting'], resolve)
                },
                meta: { requiresAuth: true, title: '个人设置' },
            }
        ]
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})


export default router;
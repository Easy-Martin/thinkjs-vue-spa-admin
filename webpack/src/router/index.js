import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
    {
        path: '/login',
        component: resolve => {
            require(['../components/Login'], resolve)
        }
    },
    {
        path: '/',
        component: resolve => {
            require(['../components/Index'], resolve)
        },
        meta: { requiresAuth: true },
        children: [
            {
                path: 'account',
                component: resolve => {
                    require(['../components/Account'], resolve)
                },
                meta: { requiresAuth: true },
            },
            {
                path: 'setting',
                component: resolve => {
                    require(['../components/Setting'], resolve)
                },
                meta: { requiresAuth: true },
            }
        ]
    }
];

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router;
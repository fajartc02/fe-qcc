import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [{
        path: '/',
        name: 'Home',
        component: DefaultLayout,
        redirect: '/',
        children: [{
            path: '/',
            name: 'Dashboard',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('@/views/Dashboard.vue'),
        }, {
            path: '/qcc/activity',
            name: 'QccActivity',
            component: () =>
                import ('@/views/qcc/QccActivity.vue'),
        }, {
            path: '/qcc/activity/add',
            name: 'FormQccActivity',
            component: () =>
                import ('@/views/qcc/FormQccActivity.vue'),
        }, {
            path: '/qcc/group/add',
            name: 'FormQccGroup',
            component: () =>
                import ('@/views/qcc/FormQccGroup.vue'),
        }, {
            path: '/qcc/group',
            name: 'QccGroup',
            component: () =>
                import ('@/views/qcc/QccGroup.vue'),
        }, {
            path: '/qcc/group/activity',
            name: 'QccGroupActivity',
            component: () =>
                import ('@/views/qcc/QccGroupActivity.vue'),
        }, {
            path: '/master/shop',
            name: 'Shop',
            component: () =>
                import ('@/views/master/Shops/Shops.vue'),
        }, {
            path: '/master/shop/form',
            name: 'FormShop',
            component: () =>
                import ('@/views/master/Shops/FormShop.vue'),
        }, {
            path: '/master/plant',
            name: 'Plants',
            component: () =>
                import ('@/views/master/Plants/Plants.vue'),
        }, {
            path: '/master/user',
            name: 'Users',
            component: () =>
                import ('@/views/master/Users/Users.vue'),
        }, {
            path: '/master/user/form',
            name: 'FormUser',
            component: () =>
                import ('@/views/master/Users/FormUser.vue'),
        }, {
            path: '/master/company',
            name: 'Company',
            component: () =>
                import ('@/views/master/Company/Company.vue'),
        }, {
            path: '/master/line',
            name: 'Lines',
            component: () =>
                import ('@/views/master/Lines/Lines.vue'),
        }, {
            path: '/master/line/form',
            name: 'FormLine',
            component: () =>
                import ('@/views/master/Lines/FormLine.vue'),
        }, {
            path: '/master/machine',
            name: 'Machine',
            component: () =>
                import ('@/views/master/Machine/Machine.vue'),
        }, {
            path: '/master/machine/form',
            name: 'FormMachine',
            component: () =>
                import ('@/views/master/Machine/FormMachine.vue'),
        }],
    },

    {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render() {
                return h(resolveComponent('router-view'))
            },
        },
        children: [{
                path: '404',
                name: 'Page404',
                component: () =>
                    import ('@/views/pages/Page404'),
            },
            {
                path: '500',
                name: 'Page500',
                component: () =>
                    import ('@/views/pages/Page500'),
            },
            {
                path: 'login',
                name: 'Login',
                component: () =>
                    import ('@/views/pages/Login'),
            },
            {
                path: 'register',
                name: 'Register',
                component: () =>
                    import ('@/views/pages/Register'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '@/views/auth/Login'),
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
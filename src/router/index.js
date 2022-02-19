import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

import menu_items from "@/data/menu_items"

import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

if (menu_items.length > 0) {
    menu_items.forEach(({ isActive, path, name, props, component, requiresAuth }) => {
        if(isActive) {
            routes.push({
                path,
                name,
                props,
                meta: {
                    requiresAuth : requiresAuth || false,
                },
                component: () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)
            })
        }
    })
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from) => {

    const auth = store.getters['auth/auth'];

    if(to.name === 'Login' && to.name === 'Login' && auth) {
        router.push({ name: 'Home' });
    }
    if(to.meta.requiresAuth) {
        if(!auth) {
            router.push({
                name: 'Home',
            })
        }
    }
    
    return true
})

export default router

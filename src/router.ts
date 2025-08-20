import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Dashboard from './pages/Dashboard.vue';
import { store } from './store';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login, name: 'login' },
        { path: '/', component: Dashboard, name: 'dashboard' },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
});

router.beforeEach((to) => {
    if (!store.user.loggedIn && to.name !== 'login') {
        return { name: 'login' };
    }
    if (store.user.loggedIn && to.name === 'login') {
        return { name: 'dashboard' };
    }
    return true;
});

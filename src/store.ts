import { reactive, ref } from 'vue';
import type { UserState, WorkOrder } from './types';
import { initialOrders } from './mock';

const user = reactive<UserState>({
    username: null,
    role: null,
    loggedIn: false,
});

const orders = ref<WorkOrder[]>([...initialOrders]);

function login(username: string) {
    user.username = username;
    user.role = username === 'admin' ? 'admin' : 'user';
    user.loggedIn = true;
}

function logout() {
    user.username = null;
    user.role = null;
    user.loggedIn = false;
}

function deleteOrderById(id: string) {
    orders.value = orders.value.filter(o => o.id !== id);
}

function isAdmin(): boolean {
    return user.role === 'admin';
}

export const store = {
    user,
    orders,
    login,
    logout,
    deleteOrderById,
    isAdmin,
};

import store from "@/store";

export default {
    getMenuItems( state, ) {
        const auth = !!store.getters['auth/auth'];
        return state.menu.items.filter(({ requiresAuth }) => requiresAuth == auth)
    },
    isOpenSideBar( state, ) {
        return state.isOpenSideBar
    },
    isOpenNavBar( state, ) {
        return state.isOpenNavBar
    },
}
import store from "@/store";

export default {
    getMenuItems( state, ) {
        const auth = store.getters['auth/auth'];
        let items = state.menu.items
            .filter(({ requiresAuth }) => requiresAuth == !!auth);
        if ( !!auth ) {
            items = items.filter(item => item.roles.includes(auth.role));
        }
        return items;
    },
    isOpenSideBar( state, ) {
        return state.isOpenSideBar
    },
    isOpenNavBar( state, ) {
        return state.isOpenNavBar
    },
}
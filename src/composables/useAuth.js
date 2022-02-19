import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const module = 'auth';

    const store = useStore();

    return {
        signInFetchingData: computed(() => store.getters[`${module}/signInFetchingData`] ),
        signInErrors: computed(() => store.getters[`${module}/signInErrors`] ),
        signInData: computed(() => store.getters[`${module}/signInData`] ),

        auth: computed(() => store.getters[`${module}/auth`] ),

        signIn: ( e ) => store.dispatch(`${module}/signIn`, e ),
        signOut: ( e ) => store.dispatch(`${module}/signOut`, e ),
        verify: ( e ) => store.dispatch(`${module}/verify`, e ),
    }
}
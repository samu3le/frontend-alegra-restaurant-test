import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const module = 'auth';

    const store = useStore();

    return {
        signInFetchingData: computed(() => store.getters[`${module}/signInFetchingData`] ),
        signInErrors: computed(() => store.getters[`${module}/signInErrors`] ),
        signInData: computed(() => store.getters[`${module}/signInData`] ),

        signUpFetchingData: computed(() => store.getters[`${module}/signUpFetchingData`] ),
        signUpErrors: computed(() => store.getters[`${module}/signUpErrors`] ),
        signUpData: computed(() => store.getters[`${module}/signUpData`] ),

        auth: computed(() => store.getters[`${module}/auth`] ),

        signIn: ( e ) => store.dispatch(`${module}/signIn`, e ),
        signUp: ( e ) => store.dispatch(`${module}/signUp`, e ),
        signOut: () => store.dispatch(`${module}/signOut`),
        
        verify: ( e ) => store.dispatch(`${module}/verify`, e ),
    }
}
import { createStore, createLogger } from 'vuex'

import config from './config'
import ingredient from './ingredient'

import { debug } from '@/helpers/getVars.js'

export default createStore({
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    modules: {
        config,
        ingredient,
    },
})

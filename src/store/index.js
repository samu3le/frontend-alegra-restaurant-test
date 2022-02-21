import { createStore, createLogger } from "vuex";

import config from "./config";
import ingredient from "./ingredient";
import product from "./product";
import order from "./order";
import warehouse from "./warehouse";
import auth from "./auth";
import user from "./user";

import { debug } from "@/helpers/getVars.js";

export default createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    config,
    ingredient,
    product,
    order,
    warehouse,
    auth,
    user,
  },
});

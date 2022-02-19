export default [
  {
    name: "Login",
    path: "/login",
    text: "Login",
    component: "auth/SignIn",
    // divider: true,
    isActive: true,
    hiddenInTheSidebar: true,
  },
  {
    name: "Register",
    path: "/register",
    text: "Register",
    component: "auth/SignUp",
    // divider: true,
    isActive: true,
    hiddenInTheSidebar: true,
  },
  {
    name: "Ingredients",
    path: "/ingredients",
    text: "Ingredientes",
    component: "ingredient/Management",
    // divider: true,
    isActive: true,
    requiresAuth: true,
    // hiddenInTheSidebar: true,
    roles: ["kitchen", "manager"],
  },
  {
    name: "Products",
    path: "/products",
    text: "Productos",
    component: "product/Management",
    // divider: true,
    isActive: true,
    requiresAuth: true,
    // hiddenInTheSidebar: true,
    roles: ["warehouse", "manager"],
  },
  {
    name: "Orders",
    path: "/orders",
    text: "Pedidos",
    component: "order/Management",
    // divider: true,
    isActive: true,
    requiresAuth: true,
    // hiddenInTheSidebar: true,
    roles: ["kitchen", "manager"],
  },
];

/**
 * @typedef {Object} Roles
 * @property {string} manager
 * @property {string} kitchen
 * @property {string} warehouse
 * @property {string} guest
 */
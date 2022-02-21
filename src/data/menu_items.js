export default [
  {
    name: "Login",
    path: "/login",
    text: "Login",
    component: "auth/SignIn",
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
    isActive: true,
    requiresAuth: true,
  },
  {
    name: "Warehouse",
    path: "/warehouse",
    text: "Bodega",
    component: "warehouse/Management",
    isActive: true,
    requiresAuth: true,
    // hiddenInTheSidebar: true,
    roles: ["kitchen", "manager"],
  },
  {
    name: "shopping",
    path: "/shopping",
    text: "Bodega",
    component: "warehouse/Shopping",
    isActive: true,
    requiresAuth: true,
    roles: ["warehouse", "manager"],
    hiddenInTheSidebar: true,
  },
  {
    name: "Cocina",
    path: "/order_list",
    text: "Kitchen",
    component: "order/OrderList",
    isActive: true,
    requiresAuth: true,
    roles: ["kitchen", "manager"],
    hiddenInTheSidebar: false,
  },
  {
    name: "user",
    path: "/user",
    text: "User",
    component: "user/Management",
    isActive: true,
    requiresAuth: true,
    roles: ["manager"],
  },
];

/**
 * @typedef {Object} Roles
 * @property {string} manager
 * @property {string} kitchen
 * @property {string} warehouse
 * @property {string} guest
 */

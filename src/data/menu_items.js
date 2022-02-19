export default [
  {
    name: "Login",
    path: "/login",
    text: "Login",
    component: "auth/SignIn",
    isActive: true,
  },
  {
    name: "Ingredients",
    path: "/ingredients",
    text: "Ingredientes",
    component: "ingredient/Management",
    isActive: true,
  },
  {
    name: "Products",
    path: "/products",
    text: "Productos",
    component: "product/Management",
    isActive: true,
  },
  {
    name: "Orders",
    path: "/orders",
    text: "Pedidos",
    component: "order/Management",
    isActive: true,
  },
  {
    name: "Warehouse",
    path: "/warehouse",
    text: "Bodega",
    component: "warehouse/Management",
    isActive: true,
  },
];

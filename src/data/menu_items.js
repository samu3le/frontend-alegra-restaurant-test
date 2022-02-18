export default [
  {
    name: "Login",
    path: "/auth",
    text: "Login",
    component: "auth/SignIn",
    // divider: true,
    isActive: true,
    // hiddenInTheSidebar: true,
  },
  {
    name: "Ingredients",
    path: "/ingredients",
    text: "Ingredientes",
    component: "ingredient/Management",
    // divider: true,
    isActive: true,
    // hiddenInTheSidebar: true,
  },
  {
    name: "Products",
    path: "/products",
    text: "Productos",
    component: "Product/Management",
    // divider: true,
    isActive: true,
    // hiddenInTheSidebar: true,
  },
];

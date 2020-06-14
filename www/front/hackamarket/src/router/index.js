import Vue from "vue";
import VueRouter from "vue-router";
//Importamos las funciones de autenticación de usuario
import { isLoggedIn, checkAdmin } from "../api/utils";
import Swal from "sweetalert2";

Vue.use(VueRouter);

const routes = [
  {
    path: "/clientes",
    name: "Clientes",
    component: () => import("../views/Clientes.vue"),
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/productos",
    name: "Productos",
    component: () => import("../views/Productos.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/add-client",
    name: "AddClient",
    component: () => import("../views/AddClient.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    //Esta ruta, además de ser privada, está restringida a administradores
    beforeEnter: (to, from, next) => {
      //Si la ruta es para administradores y el usuario no lo es...
      if (to.meta.allowNoAdmin === false && checkAdmin() === false) {
        next({
          //...lo redirigimos a la página de clientes
          path: "/productos",
          query: { redirect: to.fullPath },
        });
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Lo sentimos. Esta ruta es sólo para administradores : /",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

// COMPROBAMOS LAS URLS Y ANALIZAMOS EL USUARIO
router.beforeEach((to, from, next) => {
  //Si la ruta no es pública y el usuario no está logueado...
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      //Lo redirigimos a la página de login
      path: "/login",
      query: { redirect: to.fullPath },
    });
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Lo sentimos. Esta ruta es sólo para usuarios : /",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    next();
  }
});

export default router;

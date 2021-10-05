import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Produto from "../views/Produto.vue";
import Login from "../views/Login.vue";
import Usuario from "../views/usuario/Usuario.vue";
import UsuarioProdutos from "../views/usuario/usuarioProdutos/UsuarioProdutos.vue";
import UsuarioVendas from "../views/usuario/usuarioVendas/UsuarioVendas.vue";
import UsuarioCompras from "../views/usuario/usuarioCompras/UsuarioCompras.vue";
import UsuarioEditar from "../views/usuario/usuarioEditar/UsuarioEditar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/produto/:id",
    name: "Produto",
    component: Produto,
    //permite passar o :id como uma propriedade
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/usuario",
    component: Usuario,
    meta: {
      login: true,
    },
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutos,
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioCompras,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendas,
      },
      {
        path: "editar",
        name: "usuario-editar",
        component: UsuarioEditar,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  //mover a tela pra cima toda vez q a rota mudar
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

//saferoutes
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

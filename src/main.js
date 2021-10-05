import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PaginaCarregando from "@/components/paginaCarregando/PaginaCarregando.vue";
import ErroNotificacao from "@/components/erroNotificacao/ErroNotificacao.vue";

Vue.config.productionTip = false;

//registrando um component globalmente
Vue.component("PaginaCarregando", PaginaCarregando);
Vue.component("ErroNotificacao", ErroNotificacao);

Vue.filter("numeroPreco", (valor) => {
  valor = Number(valor);
  if (!isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "";
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

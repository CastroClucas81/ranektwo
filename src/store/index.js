import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

//vuex: criar estados globais
//nao vale a penar criar subníveis de array no vuex pois dificulta
export default new Vuex.Store({
  //strict impede q o usuário altere os states por "fora"
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null,
  },
  //é o q muda o usuário
  mutations: {
    //sempre passa o state e o q eu vou mandar
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      //combinando objetos com assign
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      //manda pro início do array
      state.usuario_produtos.unshift(payload);
    },
  },
  actions: {
    getUsuarioProdutos(context) {
      return api
        .get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then((response) => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        });
    },
    getUsuario(context) {
      return api.get(`/usuario`).then((response) => {
        //logo o usuário
        context.commit("UPDATE_USUARIO", response.data);
        //mudo o status do login pra true
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", {
        id: payload.email,
      });
      return api.post(`/usuario`, payload);
    },
    logarUsuario(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha,
        })
        .then((response) => {
          window.localStorage.token = `Bearer ${response.data.token}`;
        });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
  },
  modules: {},
});

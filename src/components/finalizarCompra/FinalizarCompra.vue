<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErroNotificacao :erros="erros" />
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/usuarioForm/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      erros: []
    }
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario() {
      //pegar erro em funcao assincrona
      try {
        //cria usuário
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        //pega os dados criados lá no store
        await this.$store.dispatch("getUsuario");
        //executa a transacao
        await this.criarTransacao();
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
    finalizarCompra() {
      this.erros = [];
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
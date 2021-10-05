<template>
  <section>
    <h2>Crie a sua conta</h2>
    <ErroNotificacao :erros="erros" />
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar conta
      </button>
      <UsuarioForm v-else>
        <button class="btn btnForm" @click.prevent="criarUsuario">
          Criar Usuário
        </button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/usuarioForm/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      criar: false,
      erros: [],
    };
  },
  methods: {
    async criarUsuario() {
      this.erros = [];
      //pegar erro em funcao assincrona
      try {
        //dispatch é uam acao
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        this.$router.push({ name: "usuario" });
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btnForm {
  max-width: 100%;
}
</style>
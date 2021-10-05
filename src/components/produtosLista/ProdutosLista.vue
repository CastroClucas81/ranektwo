<template>
  <section class="produtos-container">
    <!-- transtion é a transicao global
        quando temos mais de um elemento, precisamos usar uma key pra transicao
     -->
    <transition mode="out-in">
      <div
        v-if="produtos && produtos.length > 0"
        class="produtos"
        key="produtos"
      >
        <div class="produto" v-for="(produto, index) in produtos" :key="index">
          <!-- passando um id para a rota produto-->
          <router-link :to="{ name: 'Produto', params: { id: produto.id } }">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ produto.preco | numeroPreco }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
        <p class="sem-resultados">
          Busca sem resultados. Tente buscar outro termo.
        </p>
      </div>
      <div v-else key="carregando">
        <PaginaCarregando />
      </div>
    </transition>
  </section>
</template>

<script>
import ProdutosPaginar from "@/components/produtosPaginar/ProdutosPaginar.vue";
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";

export default {
  name: "ProdutosLista",
  data() {
    return {
      produtos: null,
      produtosPorPagina: 6,
      produtosTotal: 0,
    };
  },
  components: {
    ProdutosPaginar,
  },
  computed: {
    //vamos fazer um mecanismo de busca por url
    url() {
      const query = serialize(this.$route.query);

      //limit pra paginacao
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    },
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      api.get(this.url).then((response) => {
        //pegando o total de elementos de um json q fica no x-total-count
        this.produtosTotal = Number(response.headers["x-total-count"]);
        this.produtos = response.data;
      });
    },
  },
  //toda vez q a funcao mudar o watch vai ativar
  watch: {
    //toda vez q url mudar...
    url() {
      this.getProdutos();
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}

@media screen and (max-width: 500px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}
</style>
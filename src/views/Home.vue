<template>
  <section>
    <h1>Compre ou Venda</h1>

    <ProdutosBuscar />
    <ProdutosLista />
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/produtosBuscar/ProdutosBuscar.vue";
import ProdutosLista from "@/components/produtosLista/ProdutosLista.vue";

export default {
  name: "Home",
  components: {
    ProdutosBuscar,
    ProdutosLista,
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #87f;
  text-align: center;
  
}
</style>

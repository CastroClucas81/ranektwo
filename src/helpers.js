//são funcoes genéricas q eu posso usar em outros lugares do site
export function serialize(obj) {
  let queryString = "";
  //pra cada chave dentro de query
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`;
  }

  return queryString;
}

//evitar o get e set de todos os campos do form
export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      },
    };
  }
  return object;
}

//services são servicos externos

import axios from "axios";

//criando nova instancia de axios
const axiosInstance = axios.create({
  baseURL: "http://ranekapilocal.local/wp-json/api",
});

//toda vez q o axios fizer um request ele vai tentar colocar o token na autorizacao
axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(url) {
    return axiosInstance.get(url);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    return axios.post(
      "http://ranekapilocal.local/wp-json/jwt-auth/v1/token",
      body
    );
  },
  validateToken() {
    return axiosInstance.post(
      "http://ranekapilocal.local/wp-json/jwt-auth/v1/token/validate"
    );
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

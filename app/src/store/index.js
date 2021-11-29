import Auth from './modules/auth';
import Rating from './modules/rating';
import spelling from './modules/spelling';

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_SOCIAL_HOST}/`;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
    if(error.response.status === 401) {
      sessionStorage.removeItem('auth');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
    }
  return Promise.reject(error);
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Rating,
    spelling,
  }
})

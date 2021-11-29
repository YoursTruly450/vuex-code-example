import '@webcomponents/custom-elements';
import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: false
});

new Vue({
  metaInfo: {
    title: 'Vuex-code-example',
  },
  computed: {},
  data:() => ({}),
  watch: {},
  methods: {},
  mounted() {},
  store,
  render: h => h(App)
}).$mount('#app')

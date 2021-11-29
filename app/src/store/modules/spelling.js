import axios from 'axios';

export default ({
  state: {
    spelling: null,
  },
  getters: {
    spelling(state) {
      return state.spelling;
    },
  },
  mutations: {
    updateSpelling(state, spelling) {
      state.spelling = spelling;
    },
  },
  actions: {
    fetchSpelling(ctx, data) {
      let formData = new FormData();
      formData.append('text', data.text);
      formData.append('lang', data.lang);
      formData.append('options', 14);
      formData.append('format', 'plain');
      return axios({
        method: 'POST',
        url: 'https://speller.yandex.net/services/spellservice.json/checkText',
        data: formData
      })
        .then((response) => {
          const spelling = response.data;
          ctx.commit('updateSpelling', spelling);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }
})

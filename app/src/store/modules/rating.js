import axios from 'axios';

export default ({
  state: {
    levels: [],
    rating: {}
  },
  getters: {
    levels(state) {
      return state.levels;
    },

    rating(state) {
      return state.rating;
    },
  },
  mutations: {
    updateLevels(state, levels) {
      state.levels = levels;
    },

    updateRating(state, rating) {
      state.rating = rating;
    },
  },
  actions: {
    getAllLevels(ctx) {
      return axios({
        method: 'GET',
        url: 'api/url/'
      })
        .then((response) => {
          const levels = response.data;
          ctx.commit('updateLevels', levels);
        })
        .catch((error) => {
          console.error(error);
        });
  },

    getRating(ctx, data) {
      let url = `api/url/?page_size=${data.page_size}&page=${data.page}`;
      if (data.level_slug && data.level_slug.length > 0) {
        url += `&level_slug=${data.level_slug}`;
      }
      if (data.search && data.search.length > 0) {
        url += `&search=${data.search}`;
      }
      return axios({
        method: 'GET',
        url: url,
      })
        .then((response) => {
          const rating = response.data;
          ctx.commit('updateRating', rating);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
})

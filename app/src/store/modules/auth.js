import axios from 'axios';

export default ({
  state: {
    passwordStatus: {},
  },
  getters: {
    passwordStatus(state) {
      return state.passwordStatus;
    },
  },
  mutations: {
    updatePasswordStatus(state, passwordStatus) {
      state.passwordStatus = passwordStatus;
    },
  },
  actions: {

    autorization(ctx, { userData, mode }) {
      const fd = new FormData();
      if ( mode === 'email' ) {
        fd.append('email', userData.email);
      } else {
        fd.append('username', userData.email);
      }
      fd.append('password', userData.pass);

      return axios({
        method: 'POST',
        url: 'api/url/',
        data: fd,
        headers: {Authorization: ''}
      })
        .then((response) => {
          const status = response.data.status;
          if (status >= 400) {
            const result = response.data;
            return result;
          }
          const result = response.data;
          sessionStorage.setItem('auth', result.status);
          localStorage.setItem('token', result.token);
          axios.defaults.headers.common.Authorization = `Bearer ${result.token}`;
          return result;
        })
        .catch((error) => {
          sessionStorage.removeItem('auth');
          localStorage.removeItem('token');
          delete axios.defaults.headers.common.Authorization;
          console.error(error);
          return error.response.data;
        });
    },

    restorePassword(ctx, { userData, mode }) {
      const fd = new FormData();
      fd.append(mode, userData);

      return axios({
        method: 'POST',
        url: `api/url/${mode}/`,
        data: fd,
        headers: {Authorization: ''}
      })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return error.response.data;
        })
    },

    checkUser(ctx, {email}) {
      const fd = new FormData();
      fd.append('email', email);
      return axios({
        method: 'POST',
        url: 'api/url/username',
        data: fd
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error.response.data;
      })
    },

    changeEasyPassword(ctx, {password, token}) {
      const fd = new FormData();
      fd.append('password', password);
      let myHeaders = token ? { Authorization: 'Bearer ' + token } : {};

      return axios({
        method: 'POST',
        url: 'api/url/password',
        data: fd,
        headers: myHeaders
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error.response.data;
      })
    },

    addIDSocial(ctx, dataObj) {
      const fd = new FormData();
      fd.append('username', dataObj.userData);
      let myHeaders = dataObj.session_token ? { Authorization: 'Bearer ' + dataObj.session_token } : {};

      return axios({
        method: 'POST',
        url: 'api/url/',
        data: fd,
        headers: myHeaders
      })
        .then((response) => {
          const result = response.data;
          sessionStorage.setItem('auth', result.status);
          localStorage.setItem('token', result.token);
          axios.defaults.headers.common.Authorization = `Bearer ${result.token}`;
          return response.data;
        })
        .catch((error) => {
          sessionStorage.removeItem('auth');
          localStorage.removeItem('token');
          delete axios.defaults.headers.common.Authorization;
          console.error(error);
          return error.response.data;
        });
    },

    changePassword(ctx, data) {
      return axios({
        method: 'POST',
        url: 'api/url/',
        data: data
      })
        .then((response) => {
          const result = response.data;
          if(result.status === 'success') {
            sessionStorage.setItem('auth', result.status);
            localStorage.setItem('token', result.token);
            axios.defaults.headers.common.Authorization = `Bearer ${result.token}`;
          }
          ctx.commit('updatePasswordStatus', result);
        })
        .catch((error) => {
          console.error(error);
          const result = error.response.data;
          ctx.commit('updatePasswordStatus', result);
        });
    },
  },
})

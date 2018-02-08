module.exports = {
  error(state, cause) {
    state.apiState.error = cause;
  },

  clearError(state, cause) {
    state.apiState.error = null;
  },

  loading(state, status) {
    state.apiState.loading = status;
  },

  news(state, news) {
    state.news = news.reverse();
  },
  name(state, val) {
    state.auth.name = val;
  },
  pw(state, val) {
    state.auth.pw = val;
  },
  token(state, val) {
    state.auth.token = val;
    state.auth.isLoggedIn = true;
  },
  cookie(state, obj) {
    if (obj.token && obj.name) {
      state.auth.token = obj.token;
      state.auth.name = obj.name;
      state.auth.isLoggedIn = true;
    } else {
      state.auth.token = null;
      state.auth.name = "testuser"; //null
      state.auth.isLoggedIn = false;
    }
  },
  body(state, val) {
    state.newPost.body = val;
  },
  title(state, val) {
    state.newPost.title = val;
  }
};

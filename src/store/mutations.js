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
    state.news = news;
  }
};

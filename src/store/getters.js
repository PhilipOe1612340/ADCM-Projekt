export default {
  getError: state => {
    return state.apiState.error;
  },
  getLoading: state => {
    return state.apiState.loading;
  },
  getNews: state => {
    return state.news;
  },
};

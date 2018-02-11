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
  isLoggedIn: state => {
    return state.auth.token && state.auth.name;
  },
  pw: state => {
    return state.auth.pw;
  },
  name: state => {
    return state.auth.name;
  },
  body: state => {
    return state.newPost.body;
  },
  title: state => {
    return state.newPost.title;
  },
  editBody: state => {
    return state.edit.body
  },
  editTitle: state => {
    return state.edit.title;
  },
  editId: state => {
    return state.edit.id;
  },
};

export default {
  getError: state => {
    return state.apiState.error;
  },
  getLoading: state => {
    return state.apiState.loading;
  },
  getSuccess: state => {
    return state.apiState.success;
  },
  getNews: state => {
    var news = state.news;
    if (state.route.path !== "/admin") {
      news = news.filter(n => state.route.path === "/" + n.type);
    }
    return news;
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
  getType: state => {
    return state.newPost.type;
  },
  editBody: state => {
    return state.edit.body;
  },
  editTitle: state => {
    return state.edit.title;
  },
  editId: state => {
    return state.edit.id;
  }
};

export default {
  apiState: {
    error: null,
    loading: false
  },
  news: [],
  settings: {
    serverIp: "http://localhost:3000"
  },
  auth: {
    isLoggedIn: false,
    pw: null,
    name: null,
    token: null
  },
  newPost: {
    title: null,
    body: null
  },
  edit: {
    title: null,
    body: null,
    id: null
  }
};

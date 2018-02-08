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
    pw: "test",
    name: "testuser",
    token: null,
  },
  newPost:{
    title: null,
    body: null
  }
};

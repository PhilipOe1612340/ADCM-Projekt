export default {
  apiState: {
    error: null,
    loading: false
  },
  news: [],
  settings: {
    serverIp: "http://18.219.21.98:3000" //13.59.172.69
  },
  auth: {
    isLoggedIn: false,
    pw: null,
    name: null,
    token: null
  },
  newPost: {
    title: null,
    body: null,
    type: null,
  },
  edit: {
    title: null,
    body: null,
    id: null
  },
  general: {
    theme: false
  }
};

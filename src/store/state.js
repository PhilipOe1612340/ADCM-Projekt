export default {
  apiState: {
    error: null,
    loading: false,
    success: "",
    sendable: true,
  },
  news: [],
  settings: {
    serverIp: "http://localhost:3000" //13.59.172.69
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

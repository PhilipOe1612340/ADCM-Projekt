export default {
  apiState: {
    error: null,
    loading: false,
    success: "",
    sendable: true,
  },
  news: [],
  settings: {
    serverIp: "http://13.59.241.105:3000"
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

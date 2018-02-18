var axios = require("axios");

export default {
  getNews({
    commit,
    state
  }) {
    console.log("news abrufen");
    commit("loading", true);
    commit("clearError");
    return new Promise((resolve, reject) => {
      axios
        .get(state.settings.serverIp + "/news")
        .then(function (response) {
          commit("loading", false);
          commit("news", response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim abrufen: " + error);
        });
    });
  },

  login({
    dispatch,
    commit,
    state
  }) {
    if (!state.auth.name || !state.auth.pw) {
      commit("error", "One of the field was empty");
      return;
    }
    let a = {
      un: state.auth.name,
      pw: state.auth.pw
    };
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .post(state.settings.serverIp + "/login", a)
        .then(function (response) {
          commit("token", response.data.token);
          commit("loading", false);
          resolve(response.data.token);
        })
        .catch(function (error) {
          commit("loading", false);
          commit("error", "Fehler beim anmelden");
          reject(error);
        });
    });
  },

  delete({
    dispatch,
    commit,
    state
  }, id) {
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get(state.settings.serverIp + "/delete/" + id, {
          headers: {
            token: state.auth.token,
            user: state.auth.name
          }
        })
        .then(function (response) {
          commit("loading", false);
          dispatch("getNews");
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },
  new({
    dispatch,
    commit,
    state
  }) {
    if (!state.newPost.title || !state.auth.name) {
      commit("error", "One of the field was empty");
      return;
    }
    let a = {
      title: state.newPost.title,
      body: state.newPost.body,
      type: state.newPost.type
    };
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .post(state.settings.serverIp + "/neu", a, {
          headers: {
            token: state.auth.token,
            user: state.auth.name
          }
        })
        .then(function (response) {
          commit("loading", false);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },
  edit({
    dispatch,
    commit,
    state
  }, id) {
    if (!state.edit.title || !state.edit.body) {
      commit("error", "One of the field was empty");
      return;
    }
    let a = {
      title: state.edit.title,
      body: state.edit.body
    };
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .post(state.settings.serverIp + "/edit/" + id, a, {
          headers: {
            token: state.auth.token,
            user: state.auth.name
          }
        })
        .then(function (response) {
          commit("loading", false);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },

  postImage({
    dispatch,
    commit,
    state
  }, obj) {
    if (!obj.file || !obj.file.name) {
      return new Promise((resolve) => {
        resolve()
      })
    }
    let data = new FormData();
    data.append("image", obj.file, obj.file.name);
    console.log(data.getAll, "error")
    const config = {
      headers: {
        token: state.auth.token,
        user: state.auth.name
      }
    };
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      return axios
        .post(state.settings.serverIp + "/image/" + obj.id, data, config)
        .then(function (response) {
          commit("loading", false);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },

  success({
    commit
  }, message) {
    commit("success", message);
    setTimeout(() => {
      commit("clearSuccess");
    }, 4500);
  }
};

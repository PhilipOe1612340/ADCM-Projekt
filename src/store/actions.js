var axios = require("axios");

export default {
  getNews({ commit, state }) {
    console.log("news abrufen");
    commit("loading", true);
    commit("clearError");
    return new Promise((resolve, reject) => {
      axios
        .get(state.settings.serverIp + "/news")
        .then(function(response) {
          commit("loading", false);
          commit("news", response.data);
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim abrufen: " + error);
        });
    });
  },

  login({ dispatch, commit, state }) {
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
        .then(function(response) {
          commit("token", response.data.token);
          commit("loading", false);
          resolve(response.data.token);
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },

  delete({ dispatch, commit, state }, id) {
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .delete(state.settings.serverIp + "/article/" + id, {
          headers: { token: state.auth.token, user: state.auth.name }
        })
        .then(function(response) {
          commit("loading", false);
          dispatch("getNews")
          resolve();
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },
  new({ dispatch, commit, state }) {
    if (!state.newPost.title || !state.auth.name) {
      commit("error", "One of the field was empty");
      return;
    }
    let a = { title: state.newPost.title, body: state.newPost.body };
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .post(state.settings.serverIp + "/neu", a, {
          headers: { token: state.auth.token, user: state.auth.name }
        })
        .then(function(response) {
          commit("loading", false);
          resolve();
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },

  success({ commit }, message) {
    commit("success", message);
    setTimeout(() => {
      commit("clearSuccess");
    }, 4500);
  }
};

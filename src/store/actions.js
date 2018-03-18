var axios = require("axios");

export default {
  getNews({ dispatch, commit, state }) {
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
          commit("loading", false);
          commit("error", "Fehler beim anmelden");
          reject(error);
        });
    });
  },

  delete({ dispatch, commit, state }, id) {
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
        .then(function(response) {
          commit("loading", false);
          dispatch("getNews");
          resolve(response);
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
        .then(function(response) {
          commit("loading", false);
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },
  edit({ dispatch, commit, state }, id) {
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
        .then(function(response) {
          commit("loading", false);
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },

  postImage({ dispatch, commit, state }, obj) {
    if (!obj.files) {
      return new Promise.resolve();
    }
    let data = new FormData();
    for (let idx = 0; idx < obj.files.length; idx++) {
      const file = obj.files[idx];
      data.append("image", file, file.name);
    }
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
        .then(function(response) {
          commit("loading", false);
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
          commit("loading", false);
          commit("error", "Fehler beim Speichern: " + error);
        });
    });
  },
  postMessageForm({ dispatch, commit, state }, obj) {
    if (
      !state.apiState.sendable ||
      !obj.email ||
      !obj.betreff ||
      !obj.name ||
      !obj.text
    ) {
      return;
    } else {
      commit("sendable", false);
    }
    commit("clearError");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      return axios
        .post(state.settings.serverIp + "/contact", obj)
        .then(function(response) {
          dispatch("success", "Nachricht abgesendet");
          commit("loading", false);
          resolve(response);
        })
        .catch(function(error) {
          commit("loading", false);
          commit(
            "error",
            "Fehler: möglicherweise zu viele Nachrichten gesendet!"
          );
          reject(error, "bitte kein Spam!");
        });
    });
  },

  success({ commit }, message) {
    commit("success", message);
    setTimeout(() => {
      commit("sendable", true);
      console.log("reset");
      commit("clearSuccess");
    }, 4500);
  }
};

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

  /**
   * Function to create a new Bot
   * @param {*} param0 commit searched store for mutations || state includes all data
   */
  postNewBot({ dispatch, commit, state }) {
    console.log("neuer Bot beantragt...");
    if (!state.configBot.name || !state.configBot.type) {
      commit("error", "One of the field was empty");
      return;
    }
    let a = {
      name: state.configBot.name,
      type: state.configBot.type,
      user: state.logindata.loginname,
      chips: state.configBot.chips
    };
    commit("clearError");
    commit("clearSuccess");
    commit("loading", true);
    return new Promise((resolve, reject) => {
      axios
        .post(state.settings.serverIp + "/newbot", a)
        .then(function(response) {
          commit("loading", false);
          dispatch("success", "Bot abgeschickt");
          commit("addBot", response.data);
          resolve(response);
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

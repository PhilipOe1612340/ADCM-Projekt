/**
 * Mutations change Data in State (Setter)
 * every function should be self explaining
 */
module.exports = {
  /**
   * creates a green succes card to notify the user
   */
  error(state, cause) {
    state.apiState.error = cause;
  },

}

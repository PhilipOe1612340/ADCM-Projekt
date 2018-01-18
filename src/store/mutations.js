/**
 * Mutations change Data in State (Setter)
 * every function should be self explaining
 */
module.exports = {
  /**
   * creates a green succes card to notify the user
   */
  success(state, cause) {
    state.apiState.success = cause;
  },

}

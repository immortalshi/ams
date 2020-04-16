const state = {
  searchText: ''
}
const getters = {
  searchText: state => {
    return state.searchText
  }
}
const actions = {
  setSearchText ({ commit }, params) {
    commit('setStateSearchText', params)
  }
}
const mutations = {
  setStateSearchText (state, data) {
    state.searchText = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

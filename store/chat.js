import { make } from 'vuex-pathify'

const state = () => {
  return {
    messages: [],
    message: '',
    username: 'Utilisateur',
  }
}

const getters = {}

const actions = {
  ...make.actions(state),
  initSocket({ dispatch, commit }) {
    this._vm.$socket.$subscribe('chatMessage', (msg, cb) => {
      commit('pushMessages', msg)
    })
  },
  sendMessage({ state, dispatch }) {
    this._vm.$socket.client.emit('chatMessage', {
      id: this._vm.$socket.client.id,
      message: state.message,
      username: state.username,
    })
    dispatch('setMessage', '')
  },
}

const mutations = {
  ...make.mutations(state),
  pushMessages(state, msg) {
    state.messages.push(msg)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}

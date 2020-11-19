import { make } from 'vuex-pathify'

const state = () => {
  return {
    messages: [],
    message: '',
    username: 'Utilisateur',
    user: ''
  }
}

const getters = {}

const actions = {
  ...make.actions(state),
  initSocket ({ dispatch, commit }) {
    this._vm.$socket.$subscribe('chatMessage', (msg, cb) => {
      commit('pushMessages', msg)
    })
    this.$axios.$get('user/' + localStorage.id).then((data) => {
      dispatch('setUser', data)
      dispatch('setUsername', data.login)
      this._vm.$socket.client.emit('setUser', {
        id: this._vm.$socket.client.id,
        user: data.id
      })
    })

    this.$axios.$get('cards_list/' + localStorage.id).then((cards) => {
      const promises = []
      cards.forEach(card =>
        promises.push(
          new Promise(resolve =>
            this.$axios.$get('card/' + card).then((data) => {
              data.currentHp = data.hp
              data.currentEnergy = data.energy
              resolve(data)
            })
          )
        )
      )

      Promise.all(promises).then((cards) => {
        this._vm.$socket.client.emit('setCards', {
          id: this._vm.$socket.client.id,
          cards
        })
      })
    })
  },
  sendMessage ({ state, dispatch }) {
    this._vm.$socket.client.emit('chatMessage', {
      id: this._vm.$socket.client.id,
      message: state.message,
      username: state.username
    })
    dispatch('setMessage', '')
  }
}

const mutations = {
  ...make.mutations(state),
  pushMessages (state, msg) {
    state.messages.push(msg)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

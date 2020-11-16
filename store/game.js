import { make, Payload } from 'vuex-pathify'

const state = () => {
  return {
    room: {
      user1: {},
      user2: {},
    },
    selectedCards: {
      user1: {},
      user2: {},
    },
    me: '',
  }
}

const getters = {
  selectedCard: (state) => (id) =>
    state.selectedCards[state.room.user1.id === id ? 'user1' : 'user2'],
  isMyTurn: (state) => state.me === state.room.current,
}

const actions = {
  ...make.actions(state),
  initSocket({ dispatch, state }) {
    this._vm.$socket.$subscribe('setRoom', (room, cb) => {
      const toInit1 = typeof state.room.user1.id === 'undefined'
      const toInit2 =
        typeof state.room.user2.id === 'undefined' &&
        typeof room.user2.id !== 'undefined'

      dispatch('setRoom', room)

      if (toInit2) {
        dispatch('selectCard', { id: room.user2.id, card: room.user2.cards[0] })
      }
      if (toInit1) {
        dispatch('selectCard', { id: room.user1.id, card: room.user1.cards[0] })
        dispatch('setMe', toInit1 && toInit2 ? 'user2' : 'user1')
      }
    })
  },
  selectCard({ dispatch, state }, { id, card }) {
    const user = state.room.user1.id === id ? 'user1' : 'user2'
    dispatch('setSelectedCards', new Payload('SET_SELECTED_CARDS', user, card))
  },
  endTurn() {
    this._vm.$socket.client.emit('endTurn', { id: this._vm.$socket.client.id })
  },
}

const mutations = {
  ...make.mutations(state),
}

export default {
  state,
  mutations,
  actions,
  getters,
}

import { make, Payload } from 'vuex-pathify'

const state = () => {
  return {
    room: {
      user1: {},
      user2: {}
    },
    selectedCards: {
      user1: {},
      user2: {}
    },
    me: '',
    end: '',
    endDialog: false
  }
}

const getters = {
  selectedCard: state => id =>
    state.selectedCards[state.room.user1.id === id ? 'user1' : 'user2'] ?? {},
  totalEnergy: state => id =>
    state.room[state.current].id === id ? state.room[state.room.current] : -1,
  isMyTurn: state => state.me === state.room.current,
  canAttack: state =>
    state.room[state.me].cards.find(
      card => card.id === state.selectedCards[state.me].id
    ).currentEnergy > 0,
  name: state => id =>
    state.me ? (state.room[state.me].id === id ? 'Moi' : 'Adversaire') : 'temp',
  winner: state => state.end === state.me
}

const actions = {
  ...make.actions(state),
  initSocket ({ dispatch, state }) {
    this._vm.$socket.$subscribe('setRoom', (room, cb) => {
      const toInit1 = typeof state.room.user1.id === 'undefined'
      const toInit2 =
        typeof state.room.user2.id === 'undefined' &&
        typeof room.user2.id !== 'undefined'

      dispatch('setRoom', room)

      if (!toInit1 && !toInit2) {
        dispatch(
          'setSelectedCards',
          new Payload(
            'SET_SELECTED_CARDS',
            'user1',
            state.room.user1.cards?.find(
              card => card.id === state.selectedCards.user1.id
            ) ?? state.room.user1.cards[0]
          )
        )

        dispatch(
          'setSelectedCards',
          new Payload(
            'SET_SELECTED_CARDS',
            'user2',
            state.room.user2.cards?.find(
              card => card.id === state.selectedCards.user2.id
            ) ?? state.room.user2.cards[0]
          )
        )
      }

      if (toInit2) {
        dispatch('selectCard', { id: room.user2.id, card: room.user2.cards[0] })
      }
      if (toInit1) {
        dispatch('selectCard', { id: room.user1.id, card: room.user1.cards[0] })
        dispatch('setMe', toInit1 && toInit2 ? 'user2' : 'user1')
      }
    })
  },
  selectCard ({ dispatch, state }, { id, card }) {
    const user = state.room.user1.id === id ? 'user1' : 'user2'
    dispatch('setSelectedCards', new Payload('SET_SELECTED_CARDS', user, card))
  },
  endTurn () {
    this._vm.$socket.client.emit('endTurn', { id: this._vm.$socket.client.id })
  },
  end ({ dispatch }) {
    this._vm.$socket.$subscribe('end', (user, cb) => {
      dispatch('setEnd', user)
      dispatch('setEndDialog', true)
    })
  },
  attack ({ state }) {
    this._vm.$socket.client.emit('attack', {
      id: this._vm.$socket.client.id,
      from: state.selectedCards[state.room.current].id,
      to:
        state.selectedCards[state.room.current === 'user1' ? 'user2' : 'user1']
          .id
    })
  }
}

const mutations = {
  ...make.mutations(state)
}

export default {
  state,
  mutations,
  actions,
  getters
}

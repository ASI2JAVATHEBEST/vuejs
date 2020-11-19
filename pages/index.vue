<template>
  <v-row>
    <v-col cols="4">
      <v-card class="d-flex flex-column" height="100%">
        <v-card-title>
          <v-row no-gutters>
            <v-col cols="6"> Chat </v-col>
            <v-col cols="5">
              {{ username }}
            </v-col>
            <v-col cols="1" align-self="center">
              <v-icon class="pl-2">fa-user</v-icon>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="flex-grow-1">
          <v-list two-line>
            <template v-for="(message, index) in messages">
              <v-list-item
                :key="index"
                :class="{ 'text-right': $socket.client.id === message.id }"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ message.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ message.message }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters>
            <v-col cols="9">
              <v-textarea
                v-model="message"
                class="rounded-r"
                rounded
                outlined
                no-resize
                hide-details
                height="4"
              />
            </v-col>
            <v-col cols="3">
              <v-btn
                height="100%"
                rounded
                class="rounded-l"
                block
                @click="sendMessage"
                >Send</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-row no-gutters>
        <v-col cols="12">
          <game-board :user="room.user2" />
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-btn block :loading="!isMyTurn" color="error" @click="endTurn">
                End Turn
              </v-btn>
            </v-col>
            <v-col cols="7"></v-col>
            <v-col cols="3">
              <v-btn
                block
                :loading="!isMyTurn"
                color="success"
                :disabled="isMyTurn && !canAttack"
                @click="attack"
              >
                Attack
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <game-board :user="room.user1" />
        </v-col>
      </v-row>
    </v-col>
    <card-dialog />
  </v-row>
</template>

<script>
import { get, call, sync } from 'vuex-pathify'
export default {
  computed: {
    ...get('chat/', ['messages']),
    ...get('game/', ['room', 'isMyTurn', 'canAttack']),
    ...sync('chat/', ['message', 'username']),
  },
  mounted() {
    this.$store.dispatch('chat/initSocket')
    this.$store.dispatch('game/initSocket')
    this.$store.dispatch('game/end')
  },
  methods: {
    ...call('chat/', ['sendMessage']),
    ...call('game/', ['endTurn', 'attack']),
  },
}
</script>

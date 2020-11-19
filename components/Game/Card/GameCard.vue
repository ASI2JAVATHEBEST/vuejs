<template>
  <v-card @click="selectCard({ id: user, card })">
    <v-card-title>
      <v-spacer />
      {{ card.name }}
      <v-spacer />
    </v-card-title>
    <v-card-text class="pa-0">
      <v-img :src="card.img_url" height="100px" contain />
    </v-card-text>
    <v-card-actions>
      {{ card.currentHp }}
      <v-spacer />
      {{ card.currentEnergy }}
    </v-card-actions>
  </v-card>
</template>

<script>
import { call } from 'vuex-pathify'
export default {
  props: {
    card: {
      type: Object,
      default: () => {
        return {}
      }
    },
    user: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    ...call('game/', ['selectCard'])
  }
}
</script>

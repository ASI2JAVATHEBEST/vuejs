<template>
  <v-card>
    <v-card-title>
      <v-badge inline right :content="selectedCard(user).currentHp">
        <v-icon>fa-heartbeat</v-icon>
      </v-badge>
      <v-spacer />
      {{ selectedCard(user).cardReference ? selectedCard(user).cardReference.name : '' }}
      <v-spacer />
      <v-badge left inline :content="selectedCard(user).currentEnergy" overlap>
        <v-icon>fa-bolt</v-icon>
      </v-badge>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-img :src="selectedCard(user).cardReference ? selectedCard(user).cardReference.imgUrl : ''" height="200px" contain />
    </v-card-text>
    <v-card-text>
      <v-row>
        <game-card-details-specif
          icon="fa-gavel"
          :value="selectedCard(user).attack"
        />
        <game-card-details-specif
          icon="fa-heartbeat"
          :value="selectedCard(user).hp"
        />
        <game-card-details-specif
          icon="fas fa-shield-alt"
          :value="selectedCard(user).defence"
        />
        <game-card-details-specif
          icon="fa-bolt"
          :value="selectedCard(user).energy"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { get } from 'vuex-pathify'
export default {
  props: {
    user: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...get('game/', ['selectedCard'])
  }
}
</script>

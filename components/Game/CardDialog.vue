<template>
  <v-dialog v-model="endDialog" persistent width="300">
    <v-card color="primary">
      <v-card-text>
        {{ winner ? 'bravo tu é tré for' : 'nullos' }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { sync, get } from 'vuex-pathify'
export default {
  computed: {
    ...sync('game/', ['endDialog']),
    ...get('game/', ['winner']),
  },
}
</script>

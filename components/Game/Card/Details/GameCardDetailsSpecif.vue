<template>
  <v-col cols="6">
    <v-row no-gutters>
      <v-col cols="4" offset="1">
        <v-icon>{{ icon }}</v-icon>
      </v-col>
      <v-col align-self="center" cols="7" class="h4"> {{ value }} </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => 'fa-user',
    },
    value: {
      type: Number,
      default: () => 0,
    },
  },
}
</script>

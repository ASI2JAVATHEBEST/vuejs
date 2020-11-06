<template>
  <v-card>
    <v-card-title>
      <v-icon>fa-user</v-icon>
      <v-spacer />
      CARTE
      <v-spacer />
      <v-icon>fa-user</v-icon>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        src="https://picsum.photos/id/11/500/300"
      />
    </v-card-text>
    <v-card-text>
      <v-row>
        <game-card-details-specif />
        <game-card-details-specif />
        <game-card-details-specif />
        <game-card-details-specif />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script></script>

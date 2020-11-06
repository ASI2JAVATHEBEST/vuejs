<template>
  <v-row>
    <v-col cols="2" align-self="center">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="12" class="text-center">
              <v-icon>fa-user</v-icon>
            </v-col>
            <v-col cols="12" class="text-center">Stephane</v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="pt-5">
          <v-progress-linear indeterminate rounded height="10" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="7" style="border: solid 1px">
      <v-row>
        <v-col cols="4">
          <game-card />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3">
      <game-card-details />
    </v-col>
  </v-row>
</template>

<script></script>

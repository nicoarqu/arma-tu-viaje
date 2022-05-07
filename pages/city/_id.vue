<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="8">
        <v-card elevation="2" shaped>
          <v-img
            :src="city.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="city.name"></v-card-title>
            <v-card-subtitle>País: {{ city.country }}</v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col v-for="plan in plans" :key="plan.id" :cols="6">
        <v-card>
          <v-img
            :src="plan.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="plan.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({}),
  async fetch() {
    const cityId = this.$route.params.id
    await this.fetchCity(cityId)
  },
  computed: {
    ...mapState('city', ['city', 'plans']),
  },
  methods: {
    ...mapActions('city', ['fetchCity']),
  },
}
</script>

<style scoped></style>
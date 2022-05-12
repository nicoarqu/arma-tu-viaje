<template>
  <v-container>
    <div class="title">
      <h2>Ciudades</h2>
    </div>
    <div class="cities p-3">
      <v-card
        v-for="city in allCities"
        :key="city.id"
        class="city my-4"
        elevation="4"
        shaped
      >
        <v-img
          :src="city.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title>{{ city.name }}</v-card-title>
          <v-card-subtitle>País: {{ city.country }}</v-card-subtitle>
        </v-img>
        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="viewCity(city)">
            Ver planes
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'CitiesHome',
  data: () => ({}),
  computed: {
    ...mapGetters('cities', ['allCities']),
    ...mapState('user', ['afterLogin']),
  },
  created() {
    this.fetchCities()
  },
  methods: {
    ...mapActions('cities', ['fetchCities']),
    viewCity(city) {
      this.$router.push({
        name: 'city-id',
        // preserve current path and remove the first char to avoid the target URL starting with `//`
        params: { id: city.id },
      })
    },
  },
}
</script>

<style scoped></style>
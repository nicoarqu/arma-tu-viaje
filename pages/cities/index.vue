<template>
  <v-container>
    <div class="title">
      <h2>Ciudades</h2>
    </div>
    <div class="cities">
      <v-card
        v-for="city in allCities"
        :key="city.id"
        class="city my-2"
        elevation="4"
        shaped
      >
        <v-card-title>{{ city.name }}</v-card-title>
        <v-card-subtitle>País: {{ city.country }}</v-card-subtitle>
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
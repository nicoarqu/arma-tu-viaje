<template>
  <v-container>
    <div class="title">
      <h2>Ciudad</h2>
    </div>
    <div class="cities">
      <v-card
        class="city my-2"
        elevation="4"
        shaped
      >
        <v-card-title>{{ city.name }}</v-card-title>
        <v-card-subtitle>País: {{ city.country }}</v-card-subtitle>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({}),
  async fetch() {
    const cityId = this.$route.params.id;
    await this.fetchCity(cityId);
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
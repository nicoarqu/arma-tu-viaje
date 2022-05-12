<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="12">
        <v-card elevation="2" shaped>
          <v-img
            :src="city.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="230px"
          >
            <v-card-title v-text="city.name"></v-card-title>
            <v-card-subtitle>País: {{ city.country }}</v-card-subtitle>
          </v-img>
          <v-divider class="mx-3 my-4"></v-divider>
          <new-plan class="my-2"></new-plan>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col v-for="plan in plans" :key="plan.id" :cols="6">
        <plan-card :plan="plan"> </plan-card>
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
    ...mapActions('user', ['getUserName']),
  },
  created() {
    this.getUserName()
  },
}
</script>

<style scoped></style>
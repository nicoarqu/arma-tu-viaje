<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="10">
        <v-card elevation="2" shaped>
          <v-img
            :src="plan.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="plan.title"></v-card-title>
          </v-img>
          <v-card-subtitle>Por: {{ plan.author }}</v-card-subtitle>
          <v-card-subtitle>{{ plan.city }}</v-card-subtitle>
          <v-chip-group class="tags" active-class="primary--text" column>
            <v-chip v-for="tag in plan.tags" :key="tag">{{ tag }}</v-chip>
          </v-chip-group>
          <suggestion-list :suggestions="suggestions"></suggestion-list>
          <new-suggestion></new-suggestion>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NewSuggestion from '../../components/NewSuggestion.vue'
import SuggestionList from '../../components/SuggestionList.vue'
export default {
  components: { SuggestionList, NewSuggestion },
  data: () => ({}),
  computed: {
    ...mapState('plan', ['plan', 'suggestions']),
  },
  created() {
    const planId = this.plan.id || this.$route.params.id
    this.fetchSuggestions(planId)
  },
  methods: {
    ...mapActions('plan', ['fetchSuggestions']),
  },
}
</script>

<style scoped></style>
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
          <v-card-subtitle
            ><v-icon>mdi-thumb-up</v-icon>{{ plan.likes }}</v-card-subtitle
          >
          <v-card-text>{{ plan.description }}</v-card-text>
          <v-chip-group class="tags" active-class="primary--text" column>
            <v-chip v-for="tag in plan.tags" :key="tag">{{ tag }}</v-chip>
          </v-chip-group>
          <v-card-actions>
            <v-btn icon color="blue" @click="addCount(1)">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="addCount(-1)">
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
          </v-card-actions>
          <suggestion-list :suggestions="suggestions"></suggestion-list>
          <new-suggestion></new-suggestion>
        </v-card>
      </v-col>
    </v-row>
    <review-suggestions
      v-if="isAuthor"
      :pending="pending"
      :rejected="rejected"
    ></review-suggestions>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import NewSuggestion from '../../components/NewSuggestion.vue'
import ReviewSuggestions from '../../components/ReviewSuggestions.vue'
import SuggestionList from '../../components/SuggestionList.vue'
export default {
  components: { SuggestionList, NewSuggestion, ReviewSuggestions },
  middleware: 'autenticado', // poner en todas las páginas que requieran autenticación
  data: () => ({}),
  computed: {
    ...mapState('plan', ['plan', 'suggestions', 'rejected', 'pending']),
    ...mapGetters('plan', ['isAuthor']),
  },
  created() {
    const planId = this.plan.id || this.$route.params.id
    this.fetchSuggestions(planId)
  },
  methods: {
    ...mapActions('plan', ['fetchSuggestions', 'likePlan']),
    addCount(count) {
      this.likePlan(count)
    },
  },
}
</script>

<style scoped></style>
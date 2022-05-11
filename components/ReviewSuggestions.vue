<template>
  <v-list>
    <v-list-group v-for="sug in suggestions" :key="sug.id" no-action>
      <template #activator>
        <v-list-item-content>
          <v-list-item-title v-text="sug.title"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item>
        <v-list-item-content>
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4" v-text="sug.attraction"></div>
                <v-list-item-title class="text-h5 mb-1" v-text="sug.title">
                </v-list-item-title>
                <v-list-item-subtitle v-text="sug.text"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                :src="sug.src"
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn outlined rounded text> Añadir a favoritos </v-btn>
            </v-card-actions>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'
// tabs in 2 rows pending/rejected--pending
export default {
  name: 'SuggestionList',
  props: {
    suggestions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({}),
  methods: {
    ...mapActions('plan', ['selectPlan']),
    approve() {
      // approve suggestion
    },
    reject() {
      // reject suggestion
    },
  },
}
</script>

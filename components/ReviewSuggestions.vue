<template>
  <v-row>
    <v-col :cols="10">
      <v-card>
        <v-card-title>Sugerencias de otras personas</v-card-title>
        <v-tabs v-model="tab" fixed-tabs dark>
          <v-tabs-slider color="white"></v-tabs-slider>
          <v-tab key="pending"> Pendientes </v-tab>
          <v-tab key="rejected"> Rechazados </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="pending">
            <v-list>
              <v-list-group v-for="sug in pending" :key="sug.id" no-action>
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
                          <div
                            class="text-overline mb-4"
                            v-text="sug.attraction"
                          ></div>
                          <v-list-item-title
                            class="text-h5 mb-1"
                            v-text="sug.title"
                          >
                          </v-list-item-title>
                          <v-list-item-subtitle
                            v-text="sug.text"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                          tile
                          size="80"
                          :src="sug.src"
                        ></v-list-item-avatar>
                      </v-list-item>

                      <v-card-actions>
                        <v-btn outlined rounded text>
                          Añadir a favoritos
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list> </v-tab-item
          ><!-- pending suggestions-->

          <v-tab-item key="rejected">
            <v-list>
              <v-list-group v-for="sug in rejected" :key="sug.id" no-action>
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
                          <div
                            class="text-overline mb-4"
                            v-text="sug.attraction"
                          ></div>
                          <v-list-item-title
                            class="text-h5 mb-1"
                            v-text="sug.title"
                          >
                          </v-list-item-title>
                          <v-list-item-subtitle
                            v-text="sug.text"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                          tile
                          size="80"
                          :src="sug.src"
                        ></v-list-item-avatar>
                      </v-list-item>

                      <v-card-actions>
                        <v-btn outlined rounded text>
                          Añadir a favoritos
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list> </v-tab-item
          ><!-- rejected suggestions-->
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
// tabs in 2 rows pending/rejected--pending
export default {
  name: 'ReviewSuggestions',
  props: {
    pending: {
      type: Array,
      default: () => [],
    },
    rejected: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    tab: null,
  }),
  methods: {
    ...mapActions('plan', ['resolveSuggestion']),
    approve() {
      // approve suggestion
    },
    reject() {
      // reject suggestion
    },
  },
}
</script>

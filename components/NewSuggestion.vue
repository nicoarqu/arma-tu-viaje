<template>
  <div>
    <v-card-actions>
      <v-btn @click="show = !show">
        <v-icon>mdi-plus</v-icon> Nueva sugerencia
      </v-btn>
    </v-card-actions>
    <v-container v-show="show" fluid>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            :counter="60"
            label="Título de sugerencia"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12">
          <v-text-field
            v-model="description"
            :counter="180"
            label="Descripción"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-select
            v-model="attraction"
            :items="attractions"
            item-text="name"
            chips
            label="Atracciones turísticas"
            return-object
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn @click="createSuggestion"> Agregar sugerencia </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    show: false,
    title: '',
    description: '',
    attraction: {
      src: '',
      name: '',
      id: '',
    },
    titleRules: [
      (v) => !!v || 'Se requiere un título',
      (v) => v.length <= 60 || 'No puede tener más de 60 caracteres',
    ],
  }),
  computed: {
    ...mapState('user', ['user', 'logged']),
    ...mapState('city', ['city', 'attractions']),
    ...mapState('plan', ['plan']),
  },
  methods: {
    ...mapActions('plan', ['addSuggestion']),
    async createSuggestion() {
      const sug = {
        title: this.title,
        description: this.description,
        author: this.user.displayName,
        authorId: this.user.uid,
        attraction: {
          src: this.attraction.src,
          name: this.attraction.name,
          id: this.attraction.id,
        },
        city: this.city.name,
        cityId: this.city.id,
        planId: this.plan.id,
        status: 'pending',
      }
      const newSugId = await this.addSuggestion(sug)
      if (newSugId) this.show = false
    },
  },
}
</script>
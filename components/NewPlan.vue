<template>
  <div>
    <v-card-actions>
      <v-btn @click="show = !show">
        <v-icon>mdi-plus</v-icon> Nuevo plan
      </v-btn>
    </v-card-actions>
    <v-container v-show="show" fluid>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            :counter="60"
            label="Título del plan"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="srcPlan" label="Link de imagen"></v-text-field>
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
            v-model="valuePeople"
            :items="itemsPeople"
            attach
            chips
            label="Personas"
            multiple
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="valuePlaces"
            :items="itemsPlaces"
            filled
            chips
            label="Lugares"
            multiple
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="valueOthers"
            :items="itemsOthers"
            filled
            chips
            label="Otros"
            multiple
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn @click="createPlan"> Agregar plan </v-btn>
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
    srcPlan: '',
    description: '',
    itemsPeople: ['Familia', 'Pareja', 'Amigos'],
    valuePeople: [],
    itemsPlaces: ['Naturaleza', 'Reliquias', 'Arquitectura'],
    valuePlaces: [],
    itemsOthers: ['Comida', 'Hotel', 'Transporte'],
    valueOthers: [],
    titleRules: [
      (v) => !!v || 'Se requiere un título',
      (v) => v.length <= 60 || 'No puede tener más de 60 caracteres',
    ],
  }),
  computed: {
    ...mapState('user', ['user']),
    ...mapState('city', ['city']),
  },
  methods: {
    ...mapActions('plan', ['addPlan']),
    async createPlan() {
      const plan = {
        title: this.title,
        author: this.user.displayName,
        authorId: this.user.uid,
        city: this.city.name,
        cityId: this.city.id,
        tags: [...this.valuePeople, ...this.valuePlaces, ...this.valueOthers],
        src: this.srcPlan,
        description: this.description,
        likes: 0,
      }
      const newPlanId = await this.addPlan(plan);
      if (newPlanId) this.show = false;
    },
  },
}
</script>
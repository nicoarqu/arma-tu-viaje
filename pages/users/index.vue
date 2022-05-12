<template>
  <v-card>
    <v-card-title>
      Página para usuarios conectados...
    </v-card-title>
  </v-card>
</template>

<script>
import { mapActions} from 'vuex'

export default {
  middleware: 'autenticado', // poner en todas las páginas que requieran autenticación
  data: () => ({}),
  created(){
    this.getUserName()
  },
  methods: {
    ...mapActions('user', ['getUserName']),
  }
}
</script>

<style scoped></style>

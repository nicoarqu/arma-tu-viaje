<template>
  <v-card>
    <v-card-title>
      Página para usuarios conectados...
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  middleware: 'autenticado', // poner en todas las páginas que requieran autenticación
  data: () => ({})
}
</script>

<style scoped></style>

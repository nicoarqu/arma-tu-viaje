<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Bienvenido a Arma tu viaje!
        </v-card-title>
        <v-card-text>
          <p>Esta es una app de viajes</p>
          <hr class="my-3" />
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" nuxt to="/register"> Regístrate! </v-btn>
          <v-spacer />
          <v-btn color="secondary" nuxt to="/login"> Inicia sesión </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<template>
 <div class="container">
     <div class="title">
         <h2>Ciudades</h2>
     </div>
     <div class="cities">
         <div v-for="city in allCities" :key="city.id" class="city">
             <p>{{city.name}}</p>
         </div>
     </div>
 </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
export default {
    name: 'CitiesHome',
    data: () => ({}),
    computed: {
    ...mapGetters('cities', ['allCities']),
    ...mapState('user', ['afterLogin'])
    },
    methods: {
        ...mapActions('cities', ['fetchCities']),
    },
    created() {
        this.fetchCities();
    }
}
</script>

<style scoped></style>
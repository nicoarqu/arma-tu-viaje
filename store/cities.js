import { collection, getDocs } from "firebase/firestore";
import { getDB } from '~/services/fireinit';

const db = getDB();

export const state = () => ({
  listening: null,
  cities: [],
})

export const getters = {
  allCities: (state) => state.cities
}

export const actions = {
  async fetchCities({ commit }) {
    const querySnapshot = await getDocs(collection(db, "cities"));
    commit('setCities', querySnapshot);
  },
}

export const mutations = {
  setCities(state, snapshot) {
    state.cities = snapshot.docs.map((city) => ({
      id: city.id,
      ...city.data(),
    }))
  },
}

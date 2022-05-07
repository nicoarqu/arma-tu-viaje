import { doc, getDoc } from 'firebase/firestore'
import { getDB } from '~/services/fireinit'

const db = getDB()

export const state = () => ({
  city: {
    name: '',
    id: null,
    country: '',
  },
  plans: [],
})

export const actions = {
  async fetchCity({ commit }, cityId ) {
    const docRef = doc(db, 'cities', cityId);
    const docSnap = await getDoc(docRef);
    const city = {
      id: docSnap.uid,
      ...docSnap.data(),
    }
    // const info = { city };
    // get plans --pending
    commit('setCity', city)
  },
}

export const mutations = {
  setCity(state, city) {
    state.city = city
  },
}

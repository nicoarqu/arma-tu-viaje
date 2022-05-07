import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { getDB } from '~/services/fireinit'

const db = getDB()

export const state = () => ({
  city: {
    name: '',
    id: null,
    country: '',
    src: '',
  },
  plans: [],
})

export const actions = {
  async fetchCity({ commit }, cityId ) {
    const docRef = doc(db, 'cities', cityId);
    const docSnap = await getDoc(docRef);
    const city = {
      id: docSnap.id,
      ...docSnap.data(),
    }
    commit('setCity', city);
    // get plans
    const q = query(collection(db, "plans"), where("cityId", "==", city.id));
    const querySnapshot = await getDocs(q);
    commit('setPlans', querySnapshot);
  },
}

export const mutations = {
  setCity(state, city) {
    state.city = city
  },
  setPlans(state, snapshot) {
    state.plans = snapshot.docs.map((map) => ({
      id: map.id,
      ...map.data(),
    }))
  },
}

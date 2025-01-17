import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
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
  attractions: [],
})

export const actions = {
  async fetchCity({ commit }, cityId) {
    const docRef = doc(db, 'cities', cityId)
    const docSnap = await getDoc(docRef)
    const city = {
      id: docSnap.id,
      ...docSnap.data(),
    }
    commit('setCity', city)
    // get plans
    const q = query(collection(db, 'plans'), where('cityId', '==', city.id))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      commit('setPlans', querySnapshot)
    })
    const q2 = query(
      collection(db, 'attractions'),
      where('cityId', '==', city.id)
    )
    onSnapshot(q2, (querySnapshot) => {
      commit('setAttractions', querySnapshot)
    })
    return unsubscribe
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
  setAttractions(state, snapshot) {
    state.attractions = snapshot.docs.map((map) => ({
      id: map.id,
      ...map.data(),
    }))
  },
}

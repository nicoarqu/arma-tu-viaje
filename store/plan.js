import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from 'firebase/firestore'
import { getDB } from '~/services/fireinit'

const db = getDB()

export const state = () => ({
  plan: {
    title: '',
    src: '',
  },
  suggestions: [],
})

export const actions = {
  selectPlan({ commit }, plan) {
    commit('setPlan', plan)
  },
  fetchSuggestions({ commit }, planId) {
    const q = query(
      collection(db, 'suggestions'),
      where('planId', '==', planId),
      where('status', '==', 'approved')
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      commit('setSuggestions', querySnapshot)
    })
    return unsubscribe
  },
  async addPlan({ commit }, plan) {
    const docRef = await addDoc(collection(db, 'plans'), plan)
    return docRef.id
  },
}

export const mutations = {
  setPlan(state, plan) {
    state.plan = plan
  },
  setSuggestions(state, snapshot) {
    state.suggestions = snapshot.docs.map((map) => ({
      id: map.id,
      ...map.data(),
    }))
  },
}

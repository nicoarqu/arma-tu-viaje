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
  pending: [],
  rejected: [],
})

export const getters = {
  isAuthor: (state, getters, rootState) => rootState.user.uid === state.plan.authorId,
}


export const actions = {
  selectPlan({ commit }, plan) {
    commit('setPlan', plan)
  },
  fetchSuggestions({ commit, state, getters }, planId) {
    const q = query(
      collection(db, 'suggestions'),
      where('planId', '==', planId),
      where('status', '==', 'approved')
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      commit('setSuggestions', querySnapshot)
    })
    if (getters.isAuthor) {
      const qPending = query(
        collection(db, 'suggestions'),
        where('planId', '==', planId),
        where('status', '==', 'pending')
      )
      onSnapshot(qPending, (querySnapshot) => {
        commit('setPending', querySnapshot)
      })
      const qRejected = query(
        collection(db, 'suggestions'),
        where('planId', '==', planId),
        where('status', '==', 'rejected')
      )
      onSnapshot(qRejected, (querySnapshot) => {
        commit('setRejected', querySnapshot)
      })
    }
    return unsubscribe
  },
  async addPlan({ commit }, plan) {
    const docRef = await addDoc(collection(db, 'plans'), plan)
    return docRef.id
  },
  async addSuggestion({ commit }, sugg) {
    const docRef = await addDoc(collection(db, 'suggestions'), sugg)
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
  setPending(state, snapshot) {
    state.pending = snapshot.docs.map((map) => ({
      id: map.id,
      ...map.data(),
    }))
  },
  setRejected(state, snapshot) {
    state.rejected = snapshot.docs.map((map) => ({
      id: map.id,
      ...map.data(),
    }))
  },
}

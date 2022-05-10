/* import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { getDB } from '~/services/fireinit'

const db = getDB() */

export const state = () => ({
  plan: {
    name: '',
    id: null,
    country: '',
    src: '',
  },
})

export const actions = {
  selectPlan({ commit }, plan ) {
    commit('setPlan', plan);
  },
}

export const mutations = {
  setPlan(state, plan) {
    state.plan = plan
  },

}

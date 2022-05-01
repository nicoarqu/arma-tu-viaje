import { getDB } from '~/services/fireinit'

export const state = () => ({
  city: {
    name: '',
    uid: null,
    country: '',
  },
})

export const mutations = {
  setCity(state, city) {
      state.city.name = city.name,
      state.city.uid = city.uid,
      state.city.country = city.country
  },
}

export const actions = {
  async getCity({ state, commit, dispatch }, { email, password }) {
    await createUser(email, password)
    return state.user
  },

}

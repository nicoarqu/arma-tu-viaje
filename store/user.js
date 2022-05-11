import { doc, setDoc, getDoc } from 'firebase/firestore'

import {
  initAuth,
  signOut,
  signIn,
  createUser,
  emailReset,
  emailVerification,
  getDB,
} from '~/services/fireinit'

const db = getDB()

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    email: null,
    emailVerified: false,
  },
  afterLogin: '/cities', // donde dirigirse una vez complete el login (si accedió y no tenía permiso)
  listeningAuth: false,
})

export const getters = {
  logged: (state, getters, rootState) => state.user.uid !== null,
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user.displayName = user.displayName
      state.user.email = user.email
      state.user.uid = user.uid
      state.user.emailVerified = user.emailVerified
    } else {
      // clearUserState
      state.user.displayName = ''
      state.user.uid = null
      state.user.email = ''
      state.user.emailVerified = false
    }
  },
  setListeningAuth(state, listening) {
    state.listeningAuth = listening
  },
  setAfterLogin(state, url) {
    state.afterLogin = url
  },
}

export const actions = {
  initAuth({ state, commit, dispatch }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      initAuth((user) => {
        commit('setUser', user)
      })
    }
  },
  async logout({ commit, dispatch }) {
    await signOut()
  },
  async signUserUp(
    { state, commit, dispatch },
    { email, password, firstName, lastName }
  ) {
    const userFs = await createUser(email, password)
    await setDoc(doc(db, 'users', userFs.uid), {
      firstName,
      lastName,
      email,
      likes: 0,
    })
    return state.user
  },
  async signUserIn({ commit, state, dispatch }, { email, password }) {
    await signIn(email, password)
    return state.user
  },
  async resetPasswordWithEmail({ commit }, email) {
    await emailReset(email)
  },
  async sendVerificationEmail({ state, dispatch }) {
    return await emailVerification()
  },
  async getUserName({ commit, state }) {
    if (state.user.uid) {
      const docRef = doc(db, 'users', state.user.uid)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      const user = {
        ...state.user,
        displayName: userData.firstName + ' ' + userData.lastName,
      }
      commit('setUser', user)
    }
  },
}

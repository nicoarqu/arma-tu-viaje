import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { firebaseConfig } from '~/services/config'
// copia en /services/config.js el fichero .json con la configuración de firebase
// similar al ejemplo /services/config.js.example

let app
let auth

export function initApp(){
  if (!app) app = initializeApp(firebaseConfig)
  return app
}

export function initAuth(userCallback){
  // Initialize Firebase
  initApp()
  if (!auth) auth = getAuth()
  if (userCallback){
    onAuthStateChanged(auth, userCallback)
  }
  return auth
}

function getCurrentUserPromise(auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export const getCurrentUser = async () => {
  const auth = initAuth()
  if (auth.currentUser) return auth.currentUser
  return await getCurrentUserPromise(auth)
}

export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    initAuth(),
    email,
    password
  )
  return userCredential.user
}

export async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(initAuth(), email, password)
  return userCredential.user
}

export async function signOut() {
  await initAuth().signOut()
}

export async function emailReset(email) {
  await initAuth().sendPasswordResetEmail(email)
}

export async function emailVerification(l) {
  const auth = initAuth()
  if (auth.currentUser) {
    await auth.currentUser.sendEmailVerification()
    return true
  }
  else {
    throw new Error("User not logged, can not send verification email")
  }
}

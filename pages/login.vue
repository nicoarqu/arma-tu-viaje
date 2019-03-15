<template>
  <div id="firebaseui-auth-container" />
</template>

<script>
import { mapGetters } from 'vuex'
import { auth, fb } from '~/services/fireinit'
import * as firebaseui from 'firebaseui'

export default {
  data: () => ({}),
  computed: {
    ...mapGetters('user', ['logged'])
  },
  watch: {
    logged: {
      immediate: true,
      handler(logged) {
        if (logged) this.next()
      }
    }
  },
  created: function() {
    this.showLogin()
  },
  methods: {
    next() {
      this.$route.push('/users')
    },
    showLogin() {
      const uiConfig = {
        // signInSuccessUrl: '<url-to-redirect-to-on-success>', //En Nuxt esto sería un problema, ya que firebase-ui no usa vue-route
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          fb.auth.GoogleAuthProvider.PROVIDER_ID
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ]
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        // tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        // privacyPolicyUrl: function() {
        //  window.location.assign('<your-privacy-policy-url>')
        // }
      }
      const ui = new firebaseui.auth.AuthUI(auth)
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
}
</script>

<style scoped>
</style>

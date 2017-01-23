// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import '../node_modules/semantic-ui/dist/semantic.min.css'
import 'assets/css/github.css'

/* eslint-disable */
import semantic from 'semantic'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import Vuex from 'vuex'

import rootState from './state'
import * as rootGetters from './getters'
import * as rootActions from './actions'
import * as rootMutations from './mutations'

import setting from './setting'
import user from './user'
import location from './location'
import medicalCondition from './medical_condition'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      setting,
      user,
      location,
      medicalCondition
    },

    state: rootState,
    getters: rootGetters,
    actions: rootActions,
    mutations: rootMutations,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept('./setting', () => {
      const newModule = require('./setting').default
      Store.hotUpdate({ modules: { setting: newModule } })
    })

    module.hot.accept('./user', () => {
      const newModule = require('./user').default
      Store.hotUpdate({ modules: { user: newModule } })
    })

    module.hot.accept('./location', () => {
      const newModule = require('./location').default
      Store.hotUpdate({ modules: { user: newModule } })
    })

    module.hot.accept('./medical_condition', () => {
      const newModule = require('./medical_condition').default
      Store.hotUpdate({ modules: { user: newModule } })
    })
  }

  return Store
}

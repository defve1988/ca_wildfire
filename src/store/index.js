import Vue from 'vue'
import Vuex from 'vuex'
import app_data from './modules/app_data'
import ui_control from './modules/ui_control'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app_data,
    ui_control
  }
})

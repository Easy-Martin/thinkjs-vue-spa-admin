import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import admin from './admin'
Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    actions,
    modules:{
        admin
    }
})
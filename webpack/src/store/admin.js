import { SET_LOGIN_STATUS, SET_TOKEN_INFO, SET_USER_INFO, LOGIN_OUT, SET_MENU_LIST } from './types'

const state = {
  userInfo: {
    username: sessionStorage.getItem('username') || null
  },
  loginStatus: sessionStorage.getItem('loginStatus') || '1',
  token:sessionStorage.getItem('token') || null,
  refreshToken: sessionStorage.getItem('refreshToken') || null,
  menuList:[],
}

const mutations = {
  SET_LOGIN_STATUS(state, payload) {
    state.loginStatus = payload.loginStatus
  },
  SET_TOKEN_INFO(state, payload) {
    state.token = payload.token
    if(payload.refreshToken){
      state.refreshToken = payload.refreshToken
    }
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload.userInfo
  },
  LOGIN_OUT(state) {
    state.loginStatus = '1'
    state.token = null
    state.refreshToken = null
    state.userInfo.username = ''
  },
  SET_MENU_LIST(state,payload){
    state.menuList = payload.menuList
  }
}

export default {
  state,
  mutations
}

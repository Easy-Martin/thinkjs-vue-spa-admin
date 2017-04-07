import * as types from './types';
import Api from '../api';

/**
 * 设置token
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function setToken({ commit }, payload) {
    sessionStorage.setItem('token', payload.token)
    commit(types.SET_TOKEN_INFO, payload);
}
/**
 * 设置用户信息
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function setUserInfo({ commit }, payload) {
    commit(types.SET_USER_INFO, payload)
}
/**
 * 设置登陆状态
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function setLoginStatus({ commit }, payload) {
    commit(types.SET_LOGIN_STATUS, payload)
}

/**
 * 设置登出状态
 * @param {*function} commit 
 */
export function loginOut({ commit }) {
    return new Promise((resolve, reject) => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loginStatus')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.removeItem('currentIndex')
        commit(types.LOGIN_OUT);
        resolve()
    })

}
/**
 * 登陆接口
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function loginAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.loginAction({ username: payload.username, password: payload.password })
            .then(res => {
                if (res.code === 0) {
                    sessionStorage.setItem('username', res.data.name)
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('loginStatus', '0')
                    sessionStorage.setItem('refreshToken', res.data.refresh_token)
                    commit(types.SET_TOKEN_INFO, { token: res.data.token, refreshToken: res.data.refresh_token });
                    commit(types.SET_USER_INFO, { userInfo: { username: res.data.name } })
                    commit(types.SET_LOGIN_STATUS, { loginStatus: '0' });
                    resolve()
                } else {
                    reject(res)
                }
            })
            .fail(err => {
                reject(err)
            })
    })
}

/**
 * 设置菜单列表
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function setMenuList({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.menulistAction({ token: payload.token }).then(res => {
            if (res.code === 0) {
                commit(types.SET_MENU_LIST, { menuList: res.data });
                resolve(res)
            } else {
                reject(res)
            }
        }).fail(err => {
            reject(err)
        })
    })
}

/**
 * 设置用户列表
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function getUserList({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.userlistAction({ token: payload.token }).then(res => {
            (res.code === 0) ? resolve(res): reject(res);
        }).fail(err => {
            reject(res)
        })
    })

}

/**
 * 设置用户列表
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function editUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.edituserAction(payload)
            .then(res => {
                (res.code === 0) ? resolve(res): reject(res);
            })
            .fail(err => {
                reject(res)
            })
    })
}

/**
 * 设置用户列表
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.edituserAction(payload).then(res => {
            (res.code === 0) ? resolve(res): reject(res);
        }).fail(err => {
            reject(res)
        })
    })
}
/**
 * 设置个人信息
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function getSelfInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.getselfinfoAction(payload)
            .then(res => {
                (res.code === 0) ? resolve(res): reject(res);
            })
            .fail(err => {
                reject(res)
            })
    })
}
/**
 * 获取个人信息详情
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function editSelfInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.editselfinfoAction(payload).then(res => {
            (res.code === 0) ? resolve(res): reject(res);
        }).fail(err => {
            reject(res)
        })
    })
}

/**
 * 重置登陆密码
 * @param {*function} commit 
 * @param {*object} payload 
 */
export function resetSelfPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
        Api.resetselfpasswdAction(payload).then(res => {
            (res.code === 0) ? resolve(res): reject(res);
        }).fail(err => {
            reject(res)
        })
    })
}
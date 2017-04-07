/**
 * 获取token
 * @param {*object} state 
 */
export function getToken(state) {
    return state.admin.token
}
/**
 * 获取refresh_token
 * @param {*object} state 
 */
export function getRefreshToken(state) {
    return state.admin.refreshToken
}
/**
 * 获取用户信息
 * @param {*object} state 
 */
export function getUserInfo(state) {
    return state.admin.userInfo
}
/**
 * 获取登陆状态
 * @param {*object} state 
 */
export function getLoginStatus(state) {
    return state.admin.loginStatus
}
/**
 * 获取菜单列表
 * @param {*object} state 
 */
export function getMenuList(state) {
    return state.admin.menuList
}
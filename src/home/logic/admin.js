'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * index action logic
     * @return {} []
     */
    async __before() {
        if (this.http.url !== '/home/admin') {
            if (!this.isPost()) {
                return think.statusAction(403, this.http);
            }
            let token, Login_info;
            let url_b = ((this.http.url === '/home/admin/login') || (this.http.url === '/home/admin/logout')|| (this.http.url === '/home/admin/checklogin')) ? true : false;
            if (!url_b) {
                token = this.http.headers['x-access-token'];
                if (!token || think.isEmpty(token)) {
                    return this.fail('LOGIN_EXPIRED');
                }

                await global.verifyToken(token).then(res => {
                    Login_info = res;
                }).catch(e => {
                    return this.fail('LOGIN_EXPIRED');
                })
            }

            if (this.http.url.indexOf('user') > -1) {
                let role = await this.model('role').where({ role_id: Login_info.role_id }).find();
                console.log('权限识别中...')
                if (role.type !== '1') {
                    console.log('没有此权限')
                    return this.fail('PERMISSION_ERROR');
                }
            }
        } else {
            if (!this.isGet()) {
                return think.statusAction(403, this.http);
            }
        }


    }
    indexAction() {

    }
}

import Base from './base.js'

const KEY = '__TX_ADMIN_USER__';

export default class extends Base{
    async loginAction() {
        let params = this.post();
        let password = think.md5(params.password + KEY);
        let result = await this.model('user_sys').where({ username: params.username, password: password }).find();
        if (think.isEmpty(result)) {
            return this.fail('USER_PASSWD_ERROR')
        } else {
            let token = global.setToken({ uuid: result.uuid, username: result.username, name: result.name, role_id: result.role_id, desc:'token' });
            let refresh_token = global.setRefreshToken({ desc:'update token' });
            let insertId = await this.model('user_sys').where({ username: params.username, password: password }).update({x_access_token:token,x_access_refresh_token:refresh_token})
            return this.success({ token, refresh_token, usrename: result.username, name: result.name });
        }
    }
    async checkloginAction(){
        let refreshToken = this.http.headers['x-access-refresh-token'];
        let token = this.http.headers['x-access-token'];
        if (!token || think.isEmpty(token)) {
            return this.fail('SIGN_ERROR');
        }
        if (!refreshToken || think.isEmpty(refreshToken)) {
            return this.fail('SIGN_ERROR');
        }
        let uuid = null;
        await global.decodeToken(token).then(res => {
            uuid = res.uuid;
        }).catch(e => {
            return this.fail('SIGN_ERROR');
        })
        await global.verifyToken(refreshToken).catch(e => {
            console.log('签名认证失败')
            return this.fail('SIGN_ERROR');
        })
        let result = await this.model('user_sys').where({uuid,x_access_refresh_token:refreshToken}).find();
        if(!think.isEmpty(result)){
            let newToken = global.setToken({ uuid: result.uuid, username: result.username, name: result.name, role_id: result.role_id, desc: 'token' });
            let newRefresh_token = global.setRefreshToken({ desc:'update token' });
            let insertId = await this.model('user_sys').where({ uuid }).update({x_access_token: newToken})
            let res = { token: newToken };
            return this.success(res)
        }else{
            console.log('查询为空')
            return this.fail('SIGN_ERROR');
        }
        
    }
}
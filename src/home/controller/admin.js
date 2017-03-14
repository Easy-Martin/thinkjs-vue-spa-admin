'use strict';

import Base from './base.js';

const KEY = '__TX_ADMIN_USER__';

export default class extends Base {
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
            return this.fail('LOGIN_ERROR');
        }
        if (!refreshToken || think.isEmpty(refreshToken)) {
            return this.fail('LOGIN_ERROR');
        }
        let uuid = null;
        await global.decodeToken(token).then(res => {
            uuid = res.uuid;
        }).catch(e => {
            return this.fail('LOGIN_ERROR');
        })
        await global.verifyToken(refreshToken).catch(e => {
            console.log('签名认证失败')
            return this.fail('LOGIN_ERROR');
        })
        let result = await this.model('user_sys').where({uuid,x_access_refresh_token:refreshToken}).find();
        if(!think.isEmpty(result)){
            let newToken = global.setToken({ uuid: result.uuid, username: result.username, name: result.name, role_id: result.role_id, desc:'token' });
            let newRefresh_token = global.setRefreshToken({ desc:'update token' });
            let insertId = this.model('user_sys').where({ uuid }).update({x_access_token:newToken})
            let res = { token:newToken };
            return this.success(res)
        }else{
            console.log('查询为空')
            return this.fail('LOGIN_ERROR');
        }
        
    }
    async menulistAction() {
        let token = this.http.headers['x-access-token'];
        let loginUserInfo = null;
        await global.verifyToken(token).then(res => {
            loginUserInfo = res;
        })
        console.log(loginUserInfo)
        let res = await this.model('role_menu').where({ role_id: loginUserInfo.role_id }).find();
        let arr_id = res.menu_id.split(',');
        let result = await this.model('menu_sys').where({ menu_id: arr_id, allowed: '1' }).select();
        console.log(result.length)
        return this.success(result)
    }
    async userlistAction() {
        let result = await this.model('user_sys').order('create_time ASC').fieldReverse('password,role_id').select();
        if (result.length > 0) {
            result.forEach((item, index) => {
                item.update_time = think.datetime(new Date(item.update_time), 'YYYY-MM-DD');
                item.create_time = think.datetime(new Date(item.create_time), 'YYYY-MM-DD');
            })
        }
        return this.success(result);
    }
    async edituserAction() {
        let token = this.http.headers['x-access-token'];
        let loginUserInfo = null;
        await global.verifyToken(token).then(res => {
            loginUserInfo = res;
        })
        let params = this.post();

        //新增
        if (params.type == '0') {
            let isRegister = await this.model('user_sys').where({ username: params.username }).find();
            if (!think.isEmpty(isRegister)) {
                return this.fail('USERNAME_ERROR_REGISTERED');
            }
            let role = await this.model('role').where({ type: '2' }).find();
            let password = think.md5(params.password + KEY);
            let userInfo = {
                uuid: think.uuid(),
                role_id: role.role_id,
                update_time: think.datetime(),
                create_time: think.datetime(),
                username: params.username,
                name: params.name,
                password: password,
                update_by: loginUserInfo.username,
                mobile: params.mobile,
                address: params.address
            }
            let insertId = await this.model('user_sys').add(userInfo);
            return this.success();
        }
        //更新
        if (params.type == '1') {
            let isRegister = await this.model('user_sys').where({ username: params.username }).find();
            if (think.isEmpty(isRegister)) {
                return this.fail('USERNAME_ERROR_NOT_FOUND');
            }
            if (isRegister.uuid === 'FIsUzXrajrMAJz6RsVVAfsq6eZMIITND') {
                return this.fail('USERNAME_ADMIN_ERROR');
            }
            let userInfo = {
                update_time: think.datetime(),
                username: params.username,
                name: params.name,
                update_by: loginUserInfo.username,
                mobile: params.mobile,
                address: params.address
            }
            let insertId = await this.model('user_sys').where({ uuid: params.uuid }).update(userInfo);
            return this.success();
        }
        //删除
        if (params.type == '2') {
            let isRegister = await this.model('user_sys').where({ uuid: params.uuid }).find();
            if (think.isEmpty(isRegister)) {
                return this.fail('USERNAME_ERROR_NOT_FOUND');
            }
            if (isRegister.uuid === 'FIsUzXrajrMAJz6RsVVAfsq6eZMIITND') {
                return this.fail('USERNAME_ADMIN_ERROR');
            }
            let insertId = await this.model('user_sys').where({ uuid: params.uuid }).delete();
            return this.success();
        }
        return this.fail('PARAM_ERROR');
    }
    async resetpasswdAction() {
        let params = this.post();
        let password = think.md5('123456' + KEY);
        let insertId = await this.model('user_sys').where({ uuid: params.uuid }).update({ password: password });
        return this.success();
    }
    async getselfinfoAction() {
        let token = this.http.headers['x-access-token'];
        let loginUserInfo = null;
        await global.verifyToken(token).then(res => {
            loginUserInfo = res;
        })
        let result = await this.model('user_sys').where({ uuid: loginUserInfo.uuid }).fieldReverse('password,role_id').find();
        return this.success(result)
    }
    async editselfinfoAction() {
        let params = this.post();
        let a = (params.name.length > 0) ? true : false;
        if (think.isEmpty(params) || !a) {
            return this.fail('PARAM_ERROR');
        }
        let token = this.http.headers['x-access-token'];
        let loginUserInfo = null;
        await global.verifyToken(token).then(res => {
            loginUserInfo = res;
        })
        let insertId = await this.model('user_sys').where({ uuid: loginUserInfo.uuid }).update({
            name: params.name,
            address: params.address,
            mobile: params.mobile,
        })
        return this.success()
    }
    async resetselfpasswdAction() {
        let params = this.post();
        if (!params.password || !params.repassword) {
            return this.fail('PARAM_ERROR');
        }
        let token = this.http.headers['x-access-token'];
        let loginUserInfo = null;
        await global.verifyToken(token).then(res => {
            loginUserInfo = res;
        })
        let oldpassword = think.md5(params.password + KEY);
        let isSelf = await this.model('user_sys').where({ uuid: loginUserInfo.uuid, password: oldpassword }).find();
        if (think.isEmpty(isSelf)) {
            return this.fail('LOGIN_ERROR');
        }
        let newpassword = think.md5(params.repassword + KEY);
        let insertId = await this.model('user_sys').where({ uuid: loginUserInfo.uuid }).update({ password: newpassword });
        return this.success();
    }
}
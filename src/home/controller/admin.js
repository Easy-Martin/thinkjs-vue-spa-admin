'use strict';

import Base from './base.js';
const KEY = '__TX_ADMIN_USER__';
export default class extends Base {
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
        let token = this.http.headers['x-access-token'];
        let loginUserInfo = null;
        await global.verifyToken(token).then(res => {
            loginUserInfo = res;
        })
        let oldpassword = think.md5(params.password + KEY);
        let isSelf = await this.model('user_sys').where({ uuid: loginUserInfo.uuid, password: oldpassword }).find();
        if (think.isEmpty(isSelf)) {
            return this.fail('USERNAME_ERROR_NOT_FOUND');
        }
        let newpassword = think.md5(params.repassword + KEY);
        let insertId = await this.model('user_sys').where({ uuid: loginUserInfo.uuid }).update({ password: newpassword });
        return this.success();
    }
}
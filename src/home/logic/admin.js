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
        if (!this.isPost()) {
            return think.statusAction(403, this.http);
        }
        let token = this.http.headers['x-access-token'];
        if (!token || think.isEmpty(token)) {
            return this.fail('LOGIN_EXPIRED');
        }
        await global.verifyToken(token).catch(e => {
            return this.fail('LOGIN_EXPIRED');
        })

    }
    edituserAction(){
        let rules = {
            username: {required: true, string: true},
            type: {required: true, string: true},
            uuid: {required: true, string: true},
            password:'string|requiredIf:type,0',
            name: {required: true, string: true},
            token: {required:true, string:true, value:this.header('x-access-token')}
        }
        if(!this.validate(rules)){
            return this.fail('validate error', this.errors());
        }
    }
    resetpasswdAction(){
        let rules = {
            uuid: {required: true, string: true},
            token: {required:true, string:true, value:this.header('x-access-token')}
        }
        if(!this.validate(rules)){
            return this.fail('validate error', this.errors());
        }
    }
    editselfinfoAction(){
        let rules = {
            name: {required: true, string: true},
            token: {required:true, string:true, value:this.header('x-access-token')}
        }
        if(!this.validate(rules)){
            return this.fail('validate error', this.errors());
        }
    }
    resetselfpasswdAction(){
        let rules = {
            password: {required: true, string: true},
            repassword: {required: true, string: true},
            token: {required:true, string:true, value:this.header('x-access-token')}
        }
        if(!this.validate(rules)){
            return this.fail('validate error', this.errors());
        }
    }
}
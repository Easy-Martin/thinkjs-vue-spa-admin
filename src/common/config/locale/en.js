'use strict';

export default {
    LOGIN_ERROR: [101, "账户密码错误"],
    USERNAME_ERROR_REGISTERED: [102, "当前用户名已经被注册"],
    USERNAME_ERROR_NOT_FOUND: [103, "当前用户名不存在"],
    USERNAME_ADMIN_ERROR: [104, "请用Admin账户登录，移到个人设置下修改，不能删除Admin账户"],
    PARAM_ERROR: [201, "参数错误"],
    LOGIN_EXPIRED: [301, "登录已失效"],
    PERMISSION_ERROR: [601, "权限错误"],
};
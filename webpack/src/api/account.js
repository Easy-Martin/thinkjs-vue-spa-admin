'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8360';

export const userlistAction = payload => {
    return request({
        method: 'post',
        url: BASE_URL + '/home/admin/userlist',
        headers: {
            'x-access-token':payload.token
        },
        type: 'json'
    })
}

export const edituserAction = payload => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/admin/edituser',
            headers: {
                'x-access-token': payload.token
            },
            type: 'json',
            data: {
                name: payload.name,
                username: payload.username,
                address: payload.address,
                mobile: payload.mobile,
                password: payload.password,
                type: payload.type,
                uuid: payload.uuid
            }
        })
}

export const resetpasswdAction = (payload) => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/admin/resetpasswd',
            headers: {
                'x-access-token': payload.token
            },
            type: 'json',
            data: {
                uuid: payload.uuid
            }
        })
}
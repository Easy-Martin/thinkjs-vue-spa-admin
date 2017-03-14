'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8360';

export const getselfinfoAction = (payload) => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/admin/getselfinfo',
            headers: {
                'x-access-token': payload.token
            },
            type: 'json'
        })
}

export const editselfinfoAction = (payload) => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/admin/editselfinfo',
            headers: {
                'x-access-token': payload.token
            },
            type: 'json',
            data: {
                name: payload.name,
                address: payload.address,
                mobile: payload.mobile,
            }
        })
}

export const resetselfpasswdAction = (payload) => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/admin/resetselfpasswd',
            headers: {
                'x-access-token': payload.token
            },
            type: 'json',
            data: {
                password: payload.password,
                repassword: payload.repassword
            }
        })
}
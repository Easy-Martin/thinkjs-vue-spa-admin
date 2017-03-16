'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8360';

export const loginAction = (payload) => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/public/login',
            data: { username: payload.username, password: payload.password },
            type: 'json'
        })
}

export const logoutAction = (payload) => {
    return request({
            method: 'post',
            url: BASE_URL + '/home/public/logout',
            type: 'json'
        })
}


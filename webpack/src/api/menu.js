'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8360';

export const menulistAction = payload => {
    return request({
        method: 'post',
        url: BASE_URL + '/home/admin/menulist',
        headers: {
            'x-access-token': payload.token
        },
        type: 'json'
    })
}
/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

import jwt from 'jsonwebtoken';

const KEY_SECRET = 'H_J_J_ONLINE_SECRET';

global.setToken = function(params) {
    let token = jwt.sign({...params }, KEY_SECRET, { expiresIn: '2h' });
    return token;
}
global.setRefreshToken = function(params) {
    let token = jwt.sign({...params }, KEY_SECRET, { expiresIn: '7d' });
    return token;
}
global.verifyToken = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, KEY_SECRET, (err, decoded) => {
            err ? reject(err) : resolve(decoded);
        });
    })
}
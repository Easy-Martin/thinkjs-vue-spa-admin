import reqwest from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8360';
export const updateToken = (vm, payload, fn) => {
    return new Promise((resolve,reject) => {
        if(payload.code === 301){
            return reqwest({
                method: 'post',
                url: BASE_URL + '/home/public/checklogin',
                headers: {
                    'x-access-refresh-token': vm.getRefreshToken,
                    'x-access-token': vm.getToken
                },
                type: 'json'
            }).then(res => {
                if(res.code === 0){
                    vm.setToken({token:res.data.token,refreshToken:res.data.refresh_token}).then(()=>{
                        fn()
                    });
                }else{
                    if(res.code === 302){
                        vm.$router.replace('/login')
                    }
                    reject(res)
                }

            })
        }else{
            reject(payload)
        }
    })
    
}
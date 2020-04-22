
import axios from 'axios'
export const changeLogin = (isLogin) => ({
    type: 'is_login',
    isLogin
})
export const login = () => {
    return (dispatch) => {
        axios.get('/staticApi/login.json').then((res) => {
            dispatch(changeLogin(res.data.data))
        }).catch((err) => {
            console.log(err)
        })

    }
}
export const loginOut = (isLogin) => ({
    type: 'login_out',
    isLogin
})
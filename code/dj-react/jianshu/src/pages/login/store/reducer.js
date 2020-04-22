import { fromJS } from "immutable"
const defaultState = fromJS({
    isLogin: false
})
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'is_login':
            return state.set('isLogin', action.isLogin)
        case 'login_out':
            return state.set('isLogin', action.isLogin)
        default:
            return state;
    }
}   
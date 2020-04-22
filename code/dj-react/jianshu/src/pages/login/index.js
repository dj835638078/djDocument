import React, { Component } from 'react'
import { LoginWrapper } from './style'
import { connect } from 'react-redux'
import { login } from './store/action'
import { Redirect } from 'react-router-dom'
class Login extends Component {
    render() {
        const { login, isLogin } = this.props
        if (!isLogin) {
            return (
                <LoginWrapper>
                    <div className="LoginBox">
                        <input type="text" className='input' placeholder='账号' ref={(account) => { this.account = account }} />
                        <input type="password" className='input' placeholder='密码' ref={(password) => { this.password = password }} />
                        <div className='button' onClick={() => { login(this.account.value, this.password.value) }}>登录</div>
                    </div>
                </LoginWrapper>
            )
        } else {
            return <Redirect to='/' />
        }
    }
}
const mapState = (state) => ({
    isLogin: state.getIn(['login', 'isLogin'])
})
const mapDispatch = (dispatch) => ({
    login(account, password) {
        dispatch(login())
    }
})
export default connect(mapState, mapDispatch)(Login)
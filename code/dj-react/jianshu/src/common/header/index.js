import React, { Component } from 'react'
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, Button } from './style'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
const Header = (props) => {
  const { focused } = props
  return (
    <HeaderWrapper>
      <Logo />
      <Nav>
        <NavItem className="left active">首页</NavItem>
        <NavItem className="left">下载App</NavItem>
        <NavItem className="right">登录</NavItem>
        <NavItem className="right">
          <span className="iconfont">&#xe636;</span>
        </NavItem>
        <SearchWrapper>
          <CSSTransition
            in={focused}
            timeout={200}
            classNames='slide'
          >
            <NavSearch
              className={focused ? 'focused' : ''}
              onFocus={props.handleInputFocused}
              onBlur={props.handleInputBlur}
            />
          </CSSTransition>
          <span className={focused ? 'focused iconfont' : 'iconfont'} >&#xe608;</span>
        </SearchWrapper>
      </Nav>
      <Addition>
        <Button className='writting'>写文章</Button>
        <Button className='reg'>
          <span className="iconfont">&#xe617;</span>注册</Button>
      </Addition>
    </HeaderWrapper>
  )
}
const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get("focused")
    focused: state.getIn(["header", "focused"])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocused() {
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
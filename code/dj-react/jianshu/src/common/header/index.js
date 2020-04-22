import React, { Component } from 'react'
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, SearchInfo, NavSearch, Addition, Button } from './style'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
import { loginOut } from '../../pages/login/store/action'
import { Link } from 'react-router-dom'

class Header extends Component {
  getSearchInfoList() {
    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, changePageList } = this.props
    const pageList = []
    const listJs = list.toJS()
    if (listJs.length) {
      for (var i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(<li className='searchInfoItem' key={listJs[i]}>{listJs[i]}</li>)
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className='searchInfoTitle'>
            热门搜索
            <span className='searchInfoSwitch' onClick={() => { changePageList(page, totalPage, this.spinIcon) }}>
              <i className='iconfont spin' ref={(spin) => { this.spinIcon = spin }}>&#xe851;</i>换一批</span>
          </div>
          <ul className='searchInfoList'>
            {/* {list.map((item) => { return <li className='searchInfoItem' key={item}>{item}</li> })} */}
            {pageList}
          </ul>
        </SearchInfo>
      )
    } else {
      return null
    }
  }
  render() {
    const { focused, handleInputFocused, handleInputBlur, list, isLogin, loginOut } = this.props
    return (
      <HeaderWrapper>
        <Link to='/'><Logo /></Link>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          {isLogin ? <NavItem className="right" onClick={loginOut}>退出</NavItem> : <Link to='/login'><NavItem className="right" >登录</NavItem></Link>}
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
                onFocus={() => { handleInputFocused(list) }}
                onBlur={handleInputBlur}
              />
            </CSSTransition>
            <span className={focused ? 'focused iconfont search' : 'iconfont search'} >&#xe608;</span>
            {this.getSearchInfoList()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='/writer'><Button className='writting'>写文章</Button></Link>
          <Button className='reg'>
            <span className="iconfont">&#xe617;</span>注册</Button>
        </Addition>
      </HeaderWrapper >
    )
  }
}

// const Header = (props) => {
//   const { focused } = props
// }
const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get("focused")
    focused: state.getIn(["header", "focused"]),
    mouseIn: state.getIn(['header', 'mouseIn']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    isLogin: state.getIn(['login', 'isLogin'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocused(list) {
      (list.size === 0) && dispatch(actionCreators.getList(list))
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    changePageList(page, totalPage, spinIcon) {
      let transformVal = spinIcon.style.transform.replace(/[^0-9]/ig, '')
      if (transformVal) {
        transformVal = parseInt(transformVal)
      } else {
        transformVal = 0
      }
      spinIcon.style.transform = `rotate(${transformVal + 360}deg)`
      let pageFlag;
      if (page === totalPage) {
        pageFlag = 1
      } else {
        pageFlag = page + 1
      }
      dispatch(actionCreators.changePageList(pageFlag))
    },
    loginOut() {
      dispatch(loginOut(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
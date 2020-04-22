import React, { Component } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { HomeWrapper } from './style'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
class Home extends Component {
    render() {
        return (
            <HomeWrapper>
                <div className="HomeLeft">
                    <img className='banner-img' src="https://upload.jianshu.io/admin_banners/web_images/4928/6e9aa1978a269f34cccf0a8971e168ad47b79262.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="" />
                    <Topic />
                    <List />
                </div>
                <div className="HomeRight">
                    <Recommend />
                    <Writer />
                </div>
            </HomeWrapper>
        )
    }
    componentDidMount() {
        this.props.getHomeList()
    }
}

const mapState = (state) => ({

})
const mapAction = (dispatch) => ({
    getHomeList() {
        dispatch(actionCreators.getHomeList())
    }
})
export default connect(mapState, mapAction)(Home)
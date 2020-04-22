import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DetailWrapper } from './style'
import { getDetail } from './store/action'
class Detail extends Component {
    render() {
        const { title, content } = this.props;
        return (
            <DetailWrapper>
                <div className='headerInfo'>{title}</div>
                <div className='content' dangerouslySetInnerHTML={{ __html: content }}></div>
            </DetailWrapper >
        )
    }
    componentDidMount() {
        this.props.getDetail(this.props.match.params.id)
    }
}

const mapState = (state) => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
})
const mapDispatch = (dispatch) => ({
    getDetail(id) {
        dispatch(getDetail(id))
    }
})
export default connect(mapState, mapDispatch)(Detail)
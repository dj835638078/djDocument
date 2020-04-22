import React, { Component } from 'react'
import { TopicWrapper } from '../style'
import { connect } from 'react-redux'
class Topic extends Component {
    render() {
        const { list } = this.props
        return (
            <TopicWrapper>
                {list.map((item) => {
                    return (
                        <div className='TopicItem' key={item.get('id')}>
                            <img className='topic-pic' src={item.get('imgUrl')} alt="" />
                            {item.get('title')}
                        </div>
                    )
                })}

            </TopicWrapper>
        )
    }
}
const mapState = (state) => ({
    list: state.get('home').get('topicList')
})
export default connect(mapState, null)(Topic)
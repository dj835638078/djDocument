import React from 'react'
import PropTypes from 'prop-types'
function TodoItem(props) {
    const { content, deleteItem, test } = props
    return (
        <li onClick={deleteItem}>{content}-{test}</li>
    )
}
TodoItem.propTypes = { //设置父组件传递过来的参数的属性string/number/array...
    test: PropTypes.string.isRequired,//必填
    content: PropTypes.arrayOf(PropTypes.string, PropTypes.number),//content可以是数字或者是字符串
    deleteItem: PropTypes.func
}
TodoItem.defaultProps = { //设置父组件传递过来的参数的默认值
    test: 'dj'
}


export default TodoItem

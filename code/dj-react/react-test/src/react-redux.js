import React, { Component, Fragment } from 'react'; //jsx语法中一定要由一个大标签包裹，Fragment为一个标签占用符，
import './todoList.css'
import { connect } from "react-redux"


const TodoList = (props) => {
    const { inputValue, handleInputChange } = props
    return (
        <Fragment>
            <div>
                <input type="text" className='input' value={inputValue} onChange={this.handleInputChange} />
            </div>
        </Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            const action = {
                type: 'input_change_value',
                value: e.target.value
            }
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
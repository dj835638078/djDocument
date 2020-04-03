import React, { Component, Fragment } from 'react'; //jsx语法中一定要由一个大标签包裹，Fragment为一个标签占用符，
import './todoList.css'
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            listData: []
        }
    }
    render() {
        const { inputValue } = this.state
        return (
            <Fragment>
                <div>
                    <input type="text" className='input' value={inputValue} onChange={this.handleInputChange} /><button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {this.getTodoLIst()}
                </ul>
            </Fragment >
        )
    }
    getTodoLIst = () => {
        return this.state.listData.map((item, index) => {
            // return <li key={index} onClick={() => this.handleDelClick(index)}>{item}</li>
            return <TodoItem key={index} content={item} deleteItem={() => this.handleDelClick(index)} />
        })
    }

    handleInputChange = (e) => {
        // this.setState({
        //     inputValue: e.target.value
        // })
        const inputValue = e.target.value
        this.setState(() => ({
            inputValue
        }))
    }

    handleBtnClick = () => {
        // this.setState({
        //     listData: [...this.state.listData, this.state.inputValue],
        //     inputValue: ""
        // })
        this.setState((preState) => ({
            listData: [...preState.listData, preState.inputValue],
            inputValue: ""
        }))
    }

    handleDelClick = (index) => {
        // const list = [...this.state.listData] //复制一份state数据，因为state不允许做任何改变
        // list.splice(index, 1)
        // this.setState({
        //     listData: list
        // })
        this.setState(() => {
            const listData = [...this.state.listData]
            listData.splice(index, 1)
            return {
                listData
            }
        })
    }
}

export default TodoList;
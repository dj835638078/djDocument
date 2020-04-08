const defaultState = {
    inputValue: "",
    listData: []
}
export default (state = defaultState, action) => {
    if (action.type === 'change_input_value') {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if (action.type === 'input_data_submit') {
        const newState = JSON.parse(JSON.stringify(state))
        newState.listData.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }
    if (action.type === 'delete_todo_item') {
        const newState = JSON.parse(JSON.stringify(state))
        newState.listData.splice(action.index, 1)
        return newState
    }
    return state
}
export const changeInputValue = (value) => ({
    type: 'change_input_value',
    value
})
export const submitInputValue = () => ({
    type: 'input_data_submit',
})
export const deleteTodoItem = (index) => ({
    type: 'delete_todo_item',
    index
})
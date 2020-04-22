import axios from 'axios'
import { fromJS } from 'immutable'
const changeList = (data) => ({
    type: "change_list",
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})
export const searchFocus = () => ({
    type: 'search_focus'
})
export const searchBlur = () => ({
    type: "search_blur"
})
export const getList = () => {
    return (dispatch) => {
        axios.get('/staticApi/headerList.json').then((res) => {
            dispatch(changeList(res.data.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}
export const mouseEnter = () => ({
    type: "mouse_enter"
})
export const mouseLeave = () => ({
    type: "mouse_leave"
})
export const changePageList = (page) => ({
    type: "change_page",
    page
})
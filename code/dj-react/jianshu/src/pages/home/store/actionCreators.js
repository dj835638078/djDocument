import axios from 'axios'
import { fromJS } from 'immutable'
const getHomeListAction = (list) => ({
    type: 'get_home_list',
    list: fromJS(list)
})
export const getHomeList = () => {
    return (dispatch) => {
        axios.get('/staticApi/home.json').then((res) => {
            dispatch(getHomeListAction(res.data.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}

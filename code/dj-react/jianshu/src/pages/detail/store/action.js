import axios from 'axios'
const changeDetail = (title, content) => ({
    type: 'get_detail',
    title,
    content
})
export const getDetail = (id) => {
    return (dispatch) => {
        axios.get('/staticApi/detail.json?id=' + id).then(
            (res) => {
                let { title, content } = res.data.data
                dispatch(changeDetail(title, content))
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }
}
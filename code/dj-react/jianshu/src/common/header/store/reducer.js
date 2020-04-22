import { fromJS } from "immutable"
const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,//换一批涉及到的换页
    totalPage: 1
})
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'search_focus':
            return state.set('focused', true);
        case 'search_blur':
            return state.set('focused', false);
        case 'change_list':
            // return state.set('list', action.data).set('totalPage', action.totalPage)
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            })
        case 'mouse_enter':
            return state.set('mouseIn', true);
        case 'mouse_leave':
            return state.set('mouseIn', false)
        case 'change_page':
            return state.set('page', action.page)
        default:
            return state;
    }
    // if (action.type === 'search_focus') {
    //     return state.set('focused', true)
    // }
    // if (action.type === 'search_blur') {
    //     return state.set('focused', false)
    // }
    // if (action.type === 'change_list') {
    //     return state.set('list', action.data)
    // }
    // return state
}
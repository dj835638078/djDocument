import { fromJS } from "immutable"
const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: []
})
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'get_home_list':
            return state.merge({
                topicList: action.list.get('topicList'),
                articleList: action.list.get('articleList'),
                recommendList: action.list.get('recommendList')
            });
        default:
            return state;
    }
}   
const getList = (author, keyword) =>{  //获取列表
    //先返回假数据（格式是正确的）
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1546610524373,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) =>{  //获取详情
    //先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) =>{
    //blogData 是一个博客对象，包含 title content 属性
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) =>{
    //id 就是要更新博客的id
    //blogData 是一个博客对象，包含 title content 属性
    return true
}

const delBlog = (id) =>{
    //id 就是要删除博客的id
    return true
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
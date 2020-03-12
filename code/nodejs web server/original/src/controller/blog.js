const { exec } = require('../db/mysql')
const getList = (author, keyword) =>{  //获取列表
    //先返回假数据（格式是正确的）
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1546610491112,
    //         author: 'zhangsan'
    //     }
    // ]
    let sql = `select * from blogs where 1=1 ` //加一个1=1；恒成立，以防止没有author和keyword时sql报错
    if (author) {
        sql += `and author='${author}'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc;`

    //返回 promise
    return exec(sql)
}

const getDetail = (id) =>{  //获取详情
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) =>{
    //blogData 是一个博客对象，包含 title content author属性
    // return {
    //     id: 3 //表示新建博客，插入到数据表里面的 id 
    // }
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    let sql = `insert into blogs (title,content,author,createtime) values ('${title}','${content}','${author}','${createtime}')`
    return exec(sql).then(insertData =>{
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) =>{
    //id 就是要更新博客的id
    //blogData 是一个博客对象，包含 title content 属性
    // return true
    const title = blogData.title
    const content = blogData.content
    let sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return exec(sql).then(updateData=>{
        if (updateData.affectedRows >0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) =>{
    //id 就是要删除博客的id
    // return true
    let sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(delData=>{
        if(delData.affectedRows > 0){
            return true
        }
        return false
    })
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
// 通过路径下运行node index.js执行
const fs = require('fs') //原生模块  文件操作
const path = require('path')  //原生模块  操作文件路径


// //不使用promise
// //callback 方式获取一个文件的内容
// function getFileContent(fileName, callback) {
//     //resolve 用于路径的拼接   __dirname 用于当前文件的目录
//     const fullFileName = path.resolve(__dirname, 'files', fileName)  //获取a.json的绝对路径
//     fs.readFile(fullFileName, (err, data) =>{  //异步 
//         if (err) {
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// //测试 callback-hell（回调地狱）
// getFileContent('a.json', aData => {
//     console.log('a data', aData)
//     getFileContent('b.json', bData =>{
//         console.log('b data', bData)
//         getFileContent('c.json', cData =>{
//             console.log('c data', cData)
//         })
//     })
// })


//使用promise 获取文件内容
function getFileContent (fileName) {
    const promise = new Promise ((resolve, reject)=>{
        const fullFileName = path.resolve(__dirname, 'files', fileName)  //获取a.json的绝对路径
        fs.readFile(fullFileName, (err, data) =>{  //异步 
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log('a data', aData)
    return getFileContent(aData.next)
}).then(bData =>{
    console.log('b data', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('c data' ,cData)
})


// async await
//koa2
const sorts = {
    objKeySort (data) { 
        var newkey = Object.keys(data).sort() 
        var newObj = {}
        for (var i = 0; i < newkey.length; i++) {
            newObj[newkey[i]] = data[newkey[i]]
        }
        return newObj // 返回排好序的新对象
    }
    /*
    console.log(objKeySort(data)); 
    var param = objKeySort(data)
    console.log(param)
    var url=''
    for(var key in param){
        url += param[key];
    }
    console.log(url)
    */

}
export default sorts;
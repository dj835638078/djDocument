export default function(data) { 
    var newkey = Object.keys(data).sort() 
    var newObj = {}
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = data[newkey[i]]
    }
    return newObj // 返回排好序的新对象
};
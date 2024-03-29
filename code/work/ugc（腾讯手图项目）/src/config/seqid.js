import md5 from '@/config/md5'  //新增的加密方式
const seqId = {
    getReqId (callback) {
        window.nativeDeviceInfo(function (data) {
            // if (data && data.qimei) {
            //     let qimei = data.qimei
            //     let ts = Date.now()
            //     let pretoken = qimei + ts.toString()
            //     let uuid = md5(pretoken)
            //     callback(uuid)
            // } else {
            //     callback(undefined)
            // }
            if (data && (data.qimei || data.imei)) {
                let qimei = data.imei || data.qimei
                let ts = Date.now()
                let pretoken = qimei + ts.toString()
                let uuid = md5(pretoken)
                callback(uuid)
            } else {
                callback(undefined)
            }

        })
    }
}
export default seqId;
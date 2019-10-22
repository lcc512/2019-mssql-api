/**
 * where 条件拼接，目前只在档案编辑页用到
 */
exports.getWhereMultiSearch = function (multiObTemp) {  
    
    let sql = '1=1 '

    multiOb = {
        'c_customer.USERNAME': multiObTemp.USERNAME,
        'c_customer.CONTACTTEL': multiObTemp.CONTACTTEL,
        'c_bargain.CONTRACT_NO': multiObTemp.CONTRACT_NO,
        'c_customer.ACC_ADDR': multiObTemp.ACC_ADDR,
        'c_customer.KIND_CODE': multiObTemp.KIND_CODE,
        'c_pt.PtName': multiObTemp.PtName,
        'c_customer.TOLLMODE_CODE': multiObTemp.TOLLMODE_CODE,
        'c_customer.STATUS_CODE': multiObTemp.STATUS_CODE,
        'c_pt.InceptMode': multiObTemp.InceptMode
    }


    for (const key in multiOb) {

        if(multiOb[key]!==''){
            // sql += `and ${key} like '%${multiObTemp[key]}%' OR ${key} is NULL `;
            sql += `and ${key} like '%${multiOb[key]}%' `;
        }
        
    }

    return sql
}

// 获取bkdat表的最新一个流程号
exports.getNewWorkFlowId=function(){


}
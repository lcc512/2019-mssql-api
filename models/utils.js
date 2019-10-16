/**
 * where 条件拼接
 */
exports.getWhereMultiSearch = function (multiOb) {

    let sql = 'and 1=1 '

    multiOb = {
        'c_customer.USERNAME': multiOb.USERNAME,
        'c_customer.CONTACTTEL': multiOb.CONTACTTEL,
        'c_bargain.CONTRACT_NO': multiOb.CONTRACT_NO,
        'c_customer.ACC_ADDR': multiOb.ACC_ADDR,
        'c_customer.KIND_CODE': multiOb.KIND_CODE,
        'c_pt.PtName': multiOb.PtName,
        'c_customer.TOLLMODE_CODE': multiOb.TOLLMODE_CODE,
        'c_customer.STATUS_CODE': multiOb.STATUS_CODE,
        'c_pt.InceptMode': multiOb.InceptMode
    }


    for (const key in multiOb) {

        sql += `and ${key} like '%${multiOb[key]}%' `;
    }

    return sql
}

// 获取bkdat表的最新一个流程号
exports.getNewWorkFlowId=function(){


}
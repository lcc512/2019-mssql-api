const db = require('../models/db')
const utils = require('../models/utils')

/**
 * 公用方法，查询当前抄表本 在算费表 里最新的workflowid号(为复制上一次抄表数据准备)
 * @param {string} bkid 抄表本编号
 * @return {number} 流程号 
 */
const getNowWorkFlowIdForBk = async (bkid) => {

    const sqlStr = `SELECT MAX(WORKFLOWID) as WORKFLOWID FROM pf_node_bkdatadet where BkID='${bkid}'`

    const [{ WORKFLOWID }] = await db.query(sqlStr)

    console.log(WORKFLOWID);

    return WORKFLOWID || 0

}


// 抄表列表页
exports.list = async (req, res, next) => {
    try {

        // const sqlwhere = utils.getWhereMultiSearch(req.query)

        //解构赋值，当get是带问号参数的请求时，req.query请求体里有这些参数，通过解构赋值给它们
        let { _page = 1, _limit = 20 } = req.query
        //将page限定至少为1，limit至多为20
        //     为了验证分页功能，这里限制为5条
        if (_page < 1) {
            _page = 1
        }
        if (_limit < 1) {
            _limit = 1
        }
        if (_limit > 20) {
            _limit = 20
        }

        const sqlStr = `SELECT
    c_bk.WORKNO,
    c_bk.WORKFLOWID,
    c_bk.BkID,
    c_bk.UserType,
    c_bk.BkName,
    c_bk.PlatID,
    c_bk.Pipe_No,
    c_bk.CopyDay,
    c_bk.Copyer,
    c_bk.CopyCyc,
    c_bk.CopyDate,
    c_bk.ProcYr,
    c_bk.ProcNum,
    c_bk.ProcMo,
    c_bk.ProcSt,
    c_bk.ProcDT,
    c_bk.DEPTCODE,
    c_bk.Address,
    c_bk.BkType,
    c_bk.STATUSLOCK,
    c_bk.LOCKINFO,
    c_bk.Operator,
    c_bk.OperateDT,
    c_bk.machineID,
    c_bk.isbasefee
    FROM
    c_bk 
    where c_bk.ProcSt='${req.query.ProcSt}' and c_bk.UserType='光伏用户'`;


        const infos = await db.query(sqlStr)

        // console.log(sqlStr);


        // const res = await db.query(sqlStrCount)

        // const [{totalNum}]= JSON.parse(JSON.stringify(res)) 


        // console.log(totalNum);


        res.status(200).json({
            infos
        })

    } catch (err) {
        next(err)
    }
}

//某个抄表本下的用户列表页
exports.chargeBkUserList = async (req, res, next) => {
    try {
        // const sqlwhere = utils.getWhereMultiSearch(req.query)

        //抄表本id
        const { id } = req.params

        //当前抄表本id的最新流程号
        const WORKFLOWID = await getNowWorkFlowIdForBk(id)


        const sqlStr = `SELECT
        pf_node_bkdatadet.WORKNO,
        pf_node_bkdatadet.WORKFLOWID,
        pf_node_bkdatadet.BkID,
        pf_node_bkdatadet.OrdNo,
        pf_node_bkdatadet.Yr,
        pf_node_bkdatadet.Mo,
        pf_node_bkdatadet.UserID,
        pf_node_bkdatadet.ProcType,
        pf_node_bkdatadet.watchcounttype,
        pf_node_bkdatadet.WatchID,
        pf_node_bkdatadet.FACTORYNO,
        pf_node_bkdatadet.ExID,
        pf_node_bkdatadet.BalENum,
        pf_node_bkdatadet.Kind_Code,
        pf_node_bkdatadet.CopySt,
        pf_node_bkdatadet.InputDT,
        pf_node_bkdatadet.Inputed,
        pf_node_bkdatadet.Remark,
        pf_node_bkdatadet.Operator,
        pf_node_bkdatadet.OperateDT,
        pf_node_bkdatadet.Muilt,
        pf_node_bkdatadet.TinENum,
        pf_node_bkdatadet.PeakNum,
        pf_node_bkdatadet.FlatNum,
        pf_node_bkdatadet.ValNum,
        pf_node_bkdatadet.Totalnum,
        pf_node_bkdatadet.UNtotalnum,
        pf_node_bkdatadet.preTinENum,
        pf_node_bkdatadet.prePeakNum,
        pf_node_bkdatadet.preFlatNum,
        pf_node_bkdatadet.preValNum,
        pf_node_bkdatadet.preTotalnum,
        pf_node_bkdatadet.preUNtotalnum,
        pf_node_bkdatadet.nowTinENum,
        pf_node_bkdatadet.nowPeakNum,
        pf_node_bkdatadet.nowFlatNum,
        pf_node_bkdatadet.nowValNum,
        pf_node_bkdatadet.nowTotalnum,
        pf_node_bkdatadet.nowUNtotalnum,
        pf_node_bkdatadet.PREPAYEEXES,
        pf_node_bkdatadet.refTinENum,
        pf_node_bkdatadet.refPeakNum,
        pf_node_bkdatadet.refFlatNum,
        pf_node_bkdatadet.refValNum,
        pf_node_bkdatadet.refTotalnum,
        pf_node_bkdatadet.refUNtotalnum,
        pf_node_bkdatadet.refPREPAYEEXES,
        pf_node_bkdatadet.TotENumExes,
        pf_node_bkdatadet.TinENumExes,
        pf_node_bkdatadet.PeakNumExes,
        pf_node_bkdatadet.FlatNumExes,
        pf_node_bkdatadet.ValNumExes,
        pf_node_bkdatadet.ENumExes,
        pf_node_bkdatadet.powerpr,
        pf_node_bkdatadet.TinEPr,
        pf_node_bkdatadet.basepr,
        pf_node_bkdatadet.PeakPr,
        pf_node_bkdatadet.FlatPr,
        pf_node_bkdatadet.ValEPr,
        pf_node_bkdatadet.ReplEPr,
        pf_node_bkdatadet.ptid,
        pf_node_bkdatadet.opType,
        pf_node_bkdatadet.spTinENum,
        pf_node_bkdatadet.spPreTinnum,
        pf_node_bkdatadet.spNowtinEnum,
        pf_node_bkdatadet.TinNum_w,
        pf_node_bkdatadet.PeakNum_w,
        pf_node_bkdatadet.FlatNum_w,
        pf_node_bkdatadet.ValNum_w,
        pf_node_bkdatadet.Totalnum_w,
        pf_node_bkdatadet.UNtotalnum_w,
        pf_node_bkdatadet.status,
        pf_node_bkdatadet.enterDemandValue,
        pf_node_bkdatadet.DemandValue,
        pf_node_bkdatadet.applyDemandValue,
        pf_node_bkdatadet.InceptMode,
        pf_node_bkdatadet.enterTotalnum
        FROM
        pf_node_bkdatadet  
        where pf_node_bkdatadet.WORKFLOWID=(SELECT WORKFLOWID from c_bk where BkID='${id}')`

        const infos = await db.query(sqlStr)

        res.status(200).json({
            infos
        })


    } catch (err) {
        next(err)
    }

}

//备底时 bkdata插入数据
exports.insertNewBkdataInfo = async (req, res, next) => {

    // 简化操作，只操作bkdata表，通过复制上一个月的一条到这个月
    // 改成，月份复制，流程号+1
    try {

        const { id: bkId } = req.params

        const { workFlowId } = req.body

        // console.log('---------workFlowId--------');

        // console.log(workFlowId);


        const oldWorkFlowId = await getNowWorkFlowIdForBk(bkId)

        // 之后通过其他方式确定当前从第几月的下一个月开始走的抄表
        const month = '09'

        const sqlStr = `
        INSERT INTO pf_node_bkdatadet 
        (USERID,WORKFLOWID,BkID,Yr,Mo,ProcType,WatchID,FACTORYNO,Kind_Code,preTinENum,	prePeakNum	,preFlatNum,	preValNum,	preTotalnum,	preUNtotalnum,InceptMode,Muilt) 
        SELECT DISTINCT USERID, ${workFlowId},BkID, Yr,Mo+1,ProcType,WatchID,FACTORYNO,Kind_Code,nowTinENum,	nowPeakNum	,nowFlatNum,	nowValNum,	nowTotalnum,	nowUNtotalnum,InceptMode,Muilt FROM pf_node_bkdatadet
        WHERE WORKFLOWID='${oldWorkFlowId}'`

        // console.log(bkId, workFlowId);

        // console.log(sqlStr);

        await db.query(sqlStr)

        // console.log(res)

        res.status(201).json()

    } catch (err) {

        console.log(err);
        
        next(err)
    }
}

//更新传入的表码数据
exports.updateNewBkdataInfo = async (req, res, next) => {
    try {

        // console.log(req.body)
        const body = req.body
        const bkInfoList = body.bkInfo


        const WORKFLOWID = await getNowWorkFlowIdForBk(bkInfoList[0].BkID)

        var resultBkArray = []

        bkInfoList.forEach(async item => {

            let sqlStrCus = `
            update pf_node_bkdatadet
            set       
                FlatNum='${item.FlatNum}', 
                PeakNum='${item.PeakNum}',
                TinENum='${item.TinENum}',
                Totalnum='${item.Totalnum}',
                UNtotalnum='${item.UNtotalnum}',
                ValNum='${item.ValNum}',
                nowFlatNum='${item.nowFlatNum}',
                nowPeakNum='${item.nowPeakNum}',
                nowTinENum='${item.nowTinENum}',
                nowTotalnum='${item.nowTotalnum}',
                nowUNtotalnum='${item.nowUNtotalnum}',
                nowValNum='${item.nowValNum}'
            where WORKFLOWID='${WORKFLOWID}'
            and UserID='${item.UserID}';
            `
            console.log(sqlStrCus)

            var res = await db.query(sqlStrCus)


            resultBkArray.push(res.affectedRows)
        });


        res.status(201).json({
            resultBkArray: resultBkArray
        })

    } catch (err) {
        next(err)
    }
}

//修改抄表本状态
exports.changeBkStatus = async (req, res, next) => {

    try {

        const body = req.body
        const bkInfo = body.bkInfo
        const { id } = req.params

        let sqlStr = ``

        // 非备底时访问，WORKFLOWID为空时 执行的sql语句
        if (!bkInfo.WORKFLOWID) {

            sqlStr = `
            update c_bk
            set
            ProcSt='${bkInfo.ProcSt}'
            where BkID='${id}'`

            // console.log(sqlStr);


        } else {
            sqlStr = `
            update c_bk
            set
            ProcSt='${bkInfo.ProcSt}',
            WORKFLOWID='${bkInfo.WORKFLOWID}'
            where BkID='${id}'`
        }

        // console.log(sqlStr);
        

        const resultBk = await db.query(sqlStr)

        res.status(201).json({
            resultBk: resultBk.affectedRows
        })


    } catch (err) {

        console.log(err);
        
        next(err)
    }

}

/**
 * 计算费用数据，简化过程，只计算电度电费，变损电费（电费放在bkdet表ENumExes字段），只用到bkdet表，不用bkfee表
 * 
 */
exports.calcuBkdataInfo = async (req, res, next) => {
    try {

        // 抄表本编号
        const { id } = req.params
        // 获取当前要操作的用户id列表，和workflowid号

        const WORKFLOWID = await getNowWorkFlowIdForBk(id)

        // console.log(WORKFLOWID);


        const sqlStr = `SELECT
        pf_node_bkdatadet.WORKNO,
        pf_node_bkdatadet.WORKFLOWID,
        pf_node_bkdatadet.BkID,
        pf_node_bkdatadet.OrdNo,
        pf_node_bkdatadet.Yr,
        pf_node_bkdatadet.Mo,
        pf_node_bkdatadet.UserID,
        pf_node_bkdatadet.ProcType,
        pf_node_bkdatadet.watchcounttype,
        pf_node_bkdatadet.WatchID,
        pf_node_bkdatadet.FACTORYNO,
        pf_node_bkdatadet.ExID,
        pf_node_bkdatadet.BalENum,
        pf_node_bkdatadet.Kind_Code,
        pf_node_bkdatadet.CopySt,
        pf_node_bkdatadet.InputDT,
        pf_node_bkdatadet.Inputed,
        pf_node_bkdatadet.Remark,
        pf_node_bkdatadet.Operator,
        pf_node_bkdatadet.OperateDT,
        pf_node_bkdatadet.Muilt,
        pf_node_bkdatadet.TinENum,
        pf_node_bkdatadet.PeakNum,
        pf_node_bkdatadet.FlatNum,
        pf_node_bkdatadet.ValNum,
        pf_node_bkdatadet.Totalnum,
        pf_node_bkdatadet.UNtotalnum,
        pf_node_bkdatadet.preTinENum,
        pf_node_bkdatadet.prePeakNum,
        pf_node_bkdatadet.preFlatNum,
        pf_node_bkdatadet.preValNum,
        pf_node_bkdatadet.preTotalnum,
        pf_node_bkdatadet.preUNtotalnum,
        pf_node_bkdatadet.nowTinENum,
        pf_node_bkdatadet.nowPeakNum,
        pf_node_bkdatadet.nowFlatNum,
        pf_node_bkdatadet.nowValNum,
        pf_node_bkdatadet.nowTotalnum,
        pf_node_bkdatadet.nowUNtotalnum,
        pf_node_bkdatadet.PREPAYEEXES,
        pf_node_bkdatadet.refTinENum,
        pf_node_bkdatadet.refPeakNum,
        pf_node_bkdatadet.refFlatNum,
        pf_node_bkdatadet.refValNum,
        pf_node_bkdatadet.refTotalnum,
        pf_node_bkdatadet.refUNtotalnum,
        pf_node_bkdatadet.refPREPAYEEXES,
        pf_node_bkdatadet.TotENumExes,
        pf_node_bkdatadet.TinENumExes,
        pf_node_bkdatadet.PeakNumExes,
        pf_node_bkdatadet.FlatNumExes,
        pf_node_bkdatadet.ValNumExes,
        pf_node_bkdatadet.ENumExes,
        pf_node_bkdatadet.powerpr,
        pf_node_bkdatadet.TinEPr,
        pf_node_bkdatadet.basepr,
        pf_node_bkdatadet.PeakPr,
        pf_node_bkdatadet.FlatPr,
        pf_node_bkdatadet.ValEPr,
        pf_node_bkdatadet.ReplEPr,
        pf_node_bkdatadet.ptid,
        pf_node_bkdatadet.opType,
        pf_node_bkdatadet.spTinENum,
        pf_node_bkdatadet.spPreTinnum,
        pf_node_bkdatadet.spNowtinEnum,
        pf_node_bkdatadet.TinNum_w,
        pf_node_bkdatadet.PeakNum_w,
        pf_node_bkdatadet.FlatNum_w,
        pf_node_bkdatadet.ValNum_w,
        pf_node_bkdatadet.Totalnum_w,
        pf_node_bkdatadet.UNtotalnum_w,
        pf_node_bkdatadet.status,
        pf_node_bkdatadet.enterDemandValue,
        pf_node_bkdatadet.DemandValue,
        pf_node_bkdatadet.applyDemandValue,
        pf_node_bkdatadet.InceptMode,
        pf_node_bkdatadet.enterTotalnum
        FROM
        pf_node_bkdatadet  
        where pf_node_bkdatadet.WORKFLOWID='${WORKFLOWID}'`

        const infos = await db.query(sqlStr)

        // console.log(sqlStr);


        // 如果用foreach 的异步会有问题

        for (let i = 0; i < infos.length; i++) {

            let userid = infos[i].UserID

            let [{ PR_ID, translossNum }] = await db.query(`SELECT
            PR_ID,
            translossNum
            FROM
            c_pt
            WHERE USERID='${userid}'`)


            // 给原数组每一项添加价格属性(加不了不知道为啥)

            //查出价格，计算
            // console.log(PR_ID)

            const TinENumExes = parseFloat(infos[i].TinENum) * parseFloat(PR_ID)
            const PeakNumExes = parseFloat(infos[i].PeakNum) * parseFloat(PR_ID)
            const FlatNumExes = parseFloat(infos[i].FlatNum) * parseFloat(PR_ID)
            const ValNumExes = parseFloat(infos[i].ValNum) * parseFloat(PR_ID)
            const ENumExes = parseFloat(translossNum) * parseFloat(PR_ID)

            infos[i].TinENumExes = TinENumExes
            infos[i].PeakNumExes = PeakNumExes
            infos[i].FlatNumExes = FlatNumExes
            infos[i].ValNumExes = ValNumExes
            infos[i].TotENumExes = TinENumExes + PeakNumExes + FlatNumExes + ValNumExes
            infos[i].ENumExes = ENumExes
        }

        //保存到bkfee表中,

        const resultBkArray = []//返回到浏览器的有效行更新数

        for (let j = 0; j < infos.length; j++) {

            let item = infos[j];

            let sqlStrCus = `
            update pf_node_bkdatadet
            set       
            TinENumExes='${item.TinENumExes}', 
            PeakNumExes='${item.PeakNumExes}', 
            FlatNumExes='${item.FlatNumExes}', 
            ValNumExes='${item.ValNumExes}', 
            TotENumExes='${item.TotENumExes}', 
            ENumExes='${item.ENumExes}'
            where WORKFLOWID='${WORKFLOWID}'
            and UserID='${item.UserID}';
            `

            // console.log(sqlStrCus);



            let res = await db.query(sqlStrCus)

            resultBkArray.push(res.affectedRows)

        }

        // const sqlStrCus = `
        // update c_bk
        // setpf_node_bkdatafee'
        // where BkID='${id}'`

        // const resultBk = await db.query(sqlStrCus)

        res.status(201).json({
            msg: 'ok',
            resultBkArray: resultBkArray,
            infos: infos
        })


    } catch (err) {

        next(err)
    }

}

const db = require('../models/db')
const utils = require('../models/utils')


// 用户列表页
exports.list = async (req, res, next) => {

  try {

    const sqlwhere = utils.getWhereMultiSearch(req.query)

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
    c_customer.USERID,
    c_customer.USERNAME,
    c_bargain.CONTRACT_NO,
    c_pt.InceptMode,
    c_pt.DemandValue,
    c_customer.KIND_CODE,
    c_pt.Cap,
    c_customer.ACC_ADDR,
    c_pt.PtName,
    c_customer.STATUS_CODE,
    c_customer.STATUSLOCK
    FROM
    c_customer
    LEFT JOIN c_pt
		ON c_customer.USERID = c_pt.USERID
		LEFT JOIN c_bargain
		ON c_customer.USERID = c_bargain.USERID
    WHERE
    
    ${sqlwhere}
    
    GROUP BY USERID
    ORDER BY USERID desc
    limit ${(_page - 1) * _limit},${_limit} 
    `;

    // 获取总条数
    const sqlStrCount = `
    SELECT COUNT(*) as allCountNum
    FROM (
    SELECT 
          c_customer.USERID,
          c_customer.USERNAME,
          c_bargain.CONTRACT_NO,
          c_pt.InceptMode,
          c_pt.DemandValue,
          c_customer.KIND_CODE,
          c_pt.Cap,
          c_customer.ACC_ADDR,
          c_pt.PtName,
          c_customer.STATUS_CODE,
          c_customer.STATUSLOCK
				FROM
				c_customer 
				LEFT JOIN c_pt
				ON c_customer.USERID = c_pt.USERID
				LEFT JOIN c_bargain
        ON c_customer.USERID = c_bargain.USERID
        
        WHERE 

        ${sqlwhere}

        GROUP BY USERID
        ORDER BY USERID desc) as tempTable`;

    // console.log(sqlStr);
    
    // console.log(sqlStrCount);

    const users = await db.query(sqlStr)

    const [{allCountNum}] = await db.query(sqlStrCount)


    res.status(200).json({
      users,
      allCountNum
    })


  } catch (err) {
    next(err)
  }

}

// 业务申请页
exports.apply = async (req, res, next) => {

  try {

    const { id } = req.params
    const sqlStr = `SELECT
    USERID,
    USERNAME,
    KIND_CODE,
    STATUS_CODE,
    STATUSLOCK,
    ADDRESSCODE,
    CONTACTPERSON,
    CONTACTARCHIVESID,
    CONTACTTEL,
    TOLLMODE_CODE,
    peakPr,
    BANK_NO,
    BANK_NAME_CODE,
    SHIFT_NO
    FROM
    c_customer
    where USERID='${id}'`
    const topic = await db.query(sqlStr)

    res.status(200).json(topic[0])

  } catch (err) {
    next(err)
  }

}

// 档案编辑页
exports.infoMainSelect = async (req, res, next) => {

  try {

    const { id } = req.params
    const sqlStrCus = `SELECT
    WORKNO,
    USERID,
    SUSERID,
    USERNAME,
    ADDRESSCODE,
    CONTACTADDRESSCODE,
    CONTACTPERSON,
    CONTACTARCHIVESID,
    loadLevel,
    industryClassify,
    tradeClassify1,
    tradeClassify2
    FROM
    c_customer
    where USERID='${id}'`

    const sqlStrPt = `SELECT
    UserID,
    ScaleMode,
    translossNum,
    PrTParType,
    ClassMode,
    EkindCode,
    Vlevel,
    PR_ID,
    PtType
    FROM
    c_pt
    where USERID='${id}'`
    const customerInfo = await db.query(sqlStrCus)
    const ptInfo = await db.query(sqlStrPt)

    res.status(200).json({
      customerInfo: customerInfo[0],
      ptInfo: ptInfo[0]
    })

  } catch (err) {
    next(err)
  }

}

exports.infoMainUpdate = async (req, res, next) => {

  try {

    // console.log(req.body)
    const body = req.body
    const customerInfo = body.customerInfo
    const ptInfo = body.ptInfo
    const { id } = req.params

    const sqlStrCus = `update
    c_customer
    set
    USERNAME='${customerInfo.USERNAME}',
    ADDRESSCODE='${customerInfo.ADDRESSCODE}',
    CONTACTADDRESSCODE='${customerInfo.CONTACTADDRESSCODE}',
    CONTACTPERSON='${customerInfo.CONTACTPERSON}',
    CONTACTARCHIVESID='${customerInfo.CONTACTARCHIVESID}',
    loadLevel='${customerInfo.loadLevel}',
    industryClassify='${customerInfo.industryClassify}',
    tradeClassify1='${customerInfo.tradeClassify1}',
    tradeClassify2='${customerInfo.tradeClassify2}'
    where USERID='${id}'`

    const sqlStrPt = `update
    c_pt
    set
    ScaleMode='${ptInfo.ScaleMode}',
    translossNum='${ptInfo.translossNum}',
    PrTParType='${ptInfo.PrTParType}',
    ClassMode='${ptInfo.ClassMode}',
    EkindCode='${ptInfo.EkindCode}',
    Vlevel='${ptInfo.Vlevel}',
    PR_ID='${ptInfo.PR_ID}',
    PtType='${ptInfo.PtType}'
    where USERID='${id}'`

    const resultCus = await db.query(sqlStrCus)
    const resultPt = await db.query(sqlStrPt)
    res.status(201).json({
      resultCus: resultCus.affectedRows,
      resultPt: resultPt.affectedRows
    })


  } catch (err) {
    next(err)
  }

}
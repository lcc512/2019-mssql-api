const db = require('../models/db')
const utils = require('../models/utils')


// 申请最新的workflowid
exports.one = async (req, res, next) => {

  try {

    const {workFlowTitle}=req.query

    const sqlStr = `SELECT MAX(workflowid) as WORKFLOWID
    FROM c_workflowid`
    
    const [{WORKFLOWID}] = await db.query(sqlStr)

    const newWORKFLOWID=WORKFLOWID+1

    const sqlStr2=`INSERT INTO c_workflowid
    (workflowid, title)
    VALUES  ( '${newWORKFLOWID}' ,'${workFlowTitle}' )`

    await db.query(sqlStr2)
    
    res.status(200).json({
      workFlowId:newWORKFLOWID
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
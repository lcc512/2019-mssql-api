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
var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'jianpan',
  database: 'tbdlzs'
});

exports.query = function (sqlStr) {

  // 这里用的es6语法，并且包装成一个promise对象
  return new Promise((resolve, reject) => {

    pool.getConnection((err, connection)=> {
      if (err) {
        return reject(err)
      }

      connection.query(sqlStr, (error, ...args) => {

        // 操作结束，尽早的释放连接
        connection.release()

        if (error) {
          return reject(error)
        }
        resolve(...args)
      });
    });
  })
}

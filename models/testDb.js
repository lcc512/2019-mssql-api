var mysql    = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jianpan',
    database: 'tbdlzs'
  });
 
connection.connect();
 
connection.query('SELECT * from c_customer', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});
 
connection.end();
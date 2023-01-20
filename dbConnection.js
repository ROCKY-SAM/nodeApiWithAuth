var mysql = require('mysql2'); 
var conn = mysql.createConnection({
    host: 'localhost',
    port: '9906', 
    user: 'root', 
    password: 'MYSQL_ROOT_PASSWORD',
    database: 'node_app' 
}); 
 
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = conn;
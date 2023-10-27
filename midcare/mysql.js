const mySql = require('mysql')
const db_config = { 
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'poppy'
}
 
function conMysql(sql) {
	let Myconnect = mySql.createConnection(db_config)
	Myconnect.connect(function (err) {
		if (err) {
			console.log(`myqsl connect failed:${err}!`)
		} else {
			console.log('mysql connect successful')
		}
	})
 
	return new Promise((resolve, reject) => {
		Myconnect.query(sql, (err, result) => {
			if (err) {
				reject(err)
			} else {
				let res = JSON.parse(JSON.stringify(result))
				closeMysql(connect)
				resolve(res)
			}
		});
	})
}
 
function closeMysql(Myconnect) {
	Myconnect.end((err) => {
		if (err) {
			console.log(`mysql关闭失败:${err}!`)
		} else {
			console.log('mysql关闭成功')
		}
	})
}
 
exports.conMysql = conMysql
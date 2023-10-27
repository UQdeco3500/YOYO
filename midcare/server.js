const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//store images path
const fs = require('fs');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }); // upload folder

//show images
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '180.163.89.114',
  user: 'poppy',
  password: 'XifHWMdam2iEpz8n',
  database: 'poppy'
});

app.get('/login', (req, res) => {
	let username = req.query.username;
	let password = req.query.password;
	console.log("username:" + username + " " + "password:" + password);
	connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
		if (error) {
		  console.error('Error executing query:', error);
		  res.status(404).send("Unknown error")
		  return;
		}
	
		if (results.length > 0) {
			res.send("Login successful")
		} else {
			res.status(401).send("Invalid username or password")
		}
	});
});

app.get('/register', (req, res) => {
	let username = req.query.username;
	let password = req.query.password;
	console.log("username:" + username + " " + "password:" + password);
	connection.query('SELECT * FROM user WHERE username = ?', [username], (error, results, fields) => {
	  if (error) {
		console.log(error);
		res.status(500).send('Error checking username:', error);
		return;
	  }
  
	  if (results.length > 0) {
		res.status(401).send("Username already exists");
		return;
	  }
  
	  connection.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (error, results, fields) => {
		if (error) {
		  console.log(error);
		  res.status(500).send('Error executing query:', error);
		  return;
		}
  
		res.send("User registered successfully");
	  });
	});
  });
  
  

app.post('/upload', upload.single('file'), (req, res) => {
	console.log("Comment: " + req.body.comment + "  Username:" + req.body.username + "  From" + req.body.from);
 	console.log(req.file);
	const sourcePath = req.file.path;
	const filename = req.body.username + "----" + req.file.originalname;
	const destinationPath = 'uploads/' + filename;
	fs.copyFile(sourcePath, destinationPath, (err) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Failed to save image');
	  } else {
		console.log('Image saved successfully');
		connection.query('INSERT INTO comment (type, username, content, url) VALUES (?, ?, ?, ?)', [req.body.from, req.body.username, req.body.comment, filename], (error, results, fields) => {
			if (error) {
				console.log(error);
				res.status(500).send('Error executing query:', error);
				return;
			}
		
			res.send('Comment successfully');
		});
	  }
	});
  });

  app.get('/getarticle', (req, res) => {
	let from = req.query.from;
	const query = "SELECT * FROM comment WHERE type = ?";
	connection.query(query, [from], (err, results) => {
	  if (err) {
		console.error('数据库查询失败:', err);
		return;
	  }
	  const jsonResult = JSON.stringify(results);
	  res.send(jsonResult);
	  console.log(jsonResult);
	  });
	});

	app.get('/getarticlebyuser', (req, res) => {
		let username = req.query.username;
		console.log("query username: " + username);
		const query = "SELECT * FROM comment WHERE username = ?";
		connection.query(query, [username], (err, results) => {
			if (err) {
				console.error('query failed:', err);
				return;
			}
			const jsonResult = JSON.stringify(results);
			res.send(jsonResult);
			console.log(jsonResult);
		});
	});
  
	app.get('/comment', (req, res) => {
		let pageid = req.query.pageid;
		let username = req.query.username;
		let content = req.query.content;
		let type = req.query.type;
		let questionid = 0;
		if(req.query.questionid != undefined){
			questionid = req.query.questionid;
		}
		const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
		connection.query('INSERT INTO usercomment (pageid, questionid, username, content, type, time) VALUES (?, ?, ?, ?, ?, ?)', [pageid, questionid, username, content, type, currentTime], (error, results, fields) => {
			if (error) {
				console.log(error);
				res.status(500).send('Error executing query:', error);
				return;
			}
		
			res.send("Comment successfully");
		});
	});

	app.get('/getcomment', (req, res) => {
		let pageid = req.query.pageid;
		const query = "SELECT * FROM usercomment WHERE pageid = ?";
		connection.query(query, [pageid], (err, results) => {
			if (err) {
				console.error('query failed:', err);
				res.status(500).send('query failed:', err);
				return;
			}
			const jsonResult = JSON.stringify(results);
			res.send(jsonResult);
			console.log(jsonResult);
		});
	});

	app.get('/chat', (req, res) => {
		let username = req.query.username;
		let chatusername = req.query.chatusername;
		let content = req.query.content;
		let isgroup = req.query.isgroup;
		const currentTime = new Date();
		console.log(currentTime);
		connection.query('INSERT INTO chat (username, chatusername, content, isgroup, time) VALUES (?, ?, ? , ?, ?)', [username, chatusername, content, isgroup, currentTime], (error, results, fields) => {
			if (error) {
			  console.log(error);
			  res.status(500).send('Error executing query:', error);
			  return;
			}
	  
			res.send("Send successfully");
		  });
	});

	app.get('/getchat', (req, res) => {
		let username = req.query.username;
		let chatusername = req.query.chatusername;
		let isall = req.query.isall;
		if(isall == 0){
			const query = "SELECT username, chatusername, content, time FROM chat WHERE (username, chatusername, time) IN (SELECT username, chatusername, MAX(time) AS time FROM chat WHERE username = ? GROUP BY username, chatusername);";
			connection.query(query, [username], (err, results1) => {
				if (err) {
					console.error('query failed:', err);
					res.status(500).send('query failed:', err);
					return;
				}
				const jsonResult = JSON.stringify(results1);
				res.send(jsonResult);
				console.log(jsonResult);
			});
		}else if(isall == 1){
			console.log('send ' + chatusername + ' all message')
			const query = "SELECT * FROM chat WHERE username = ? OR chatusername = ?;";
			connection.query(query, [chatusername, chatusername], (err, results1) => {
				if (err) {
					console.error('query failed:', err);
					res.status(500).send('query failed:', err);
					return;
				}
				const jsonResult = JSON.stringify(results1);
				res.send(jsonResult);
				console.log(jsonResult);
			});

		}

	});
	
app.listen(3000, () => {
	console.log('Server is started')

	connection.connect((err) => {
		if (err) {
		  console.error('Error connecting to database:', err);
		  return;
		}
		console.log('Connected to database');
	});
})


const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const clients = {};
const messages = [];

function shuffleArray(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
io.on('connection', (socket) => {

	//console.log('A user connected');

	socket.on('chatstart', (message) => {
		clients[message.username] = socket;
		if(message.islist){
			userlist = [];

			const query = "SELECT username FROM user WHERE username <> ?";
			connection.query(query, [message.username], (err, results) => {
				if (err) {
					console.error('query failed:', err);
					return;
				}

				results.forEach(name => {
					for (let i = messages.length - 1; i >= 0; i--) {
						if (messages[i].username === message.username || messages[i].chatusername === message.username) {
							if(messages[i].username === name.username || messages[i].chatusername === name.username){
								userlist.push(messages[i]);
								break;
							}
						}
					}
				});

				userlist.forEach((m) => {
					console.log(m);
				});
				io.emit('chatstart', userlist);
			});

		}else{
			if(message.isgroup == true){
				console.log("send group: " + message.groupid);
				let sendmessage = [];
				messages.forEach((m) => {
					if (m.groupid === message.groupid) {
						sendmessage.push(m);
					}
				});
				io.emit('chatstart', sendmessage);
				console.log("new joined: " + message.username + " chat name is : " + message.chatusername + " all message is: " + sendmessage);
			}else{
				let sendmessage = [];
				messages.forEach((m) => {
					if (m.username === message.username || m.chatusername === message.username) {
						if(m.username === message.chatusername || m.chatusername === message.chatusername){
							sendmessage.push(m);
						}
					}
				});
				io.emit('chatstart', sendmessage);
				console.log("new joined: " + message.username + " chat name is : " + message.chatusername + " all message is: " + sendmessage);
			}
		}
	});

	socket.on('message', (message) => {
		console.log('Received message:', message);
		const newMessage = {
			username: message.from,
			chatusername:  message.to,
			content: message.content,
			isgroup: message.isgroup,
			groupid: message.groupid,
			time: new Date(),
		};
		messages.push(newMessage);
		io.emit('message', message);
	});

	socket.on('getchatuser', (message) => {
		const query = "SELECT username FROM user;";
		connection.query(query, [], (err, results) => {
			if (err) {
				console.error('query failed:', err);
				return;
			}
			const jsonResult = JSON.stringify(results);
			console.log("username: " + message.username);
			const filteredResults = results.filter(row => row.username !== message.username);
			const usernames = filteredResults.map(row => row.username);
			const shuffledUsernames = shuffleArray(usernames);
			const top5Usernames = shuffledUsernames.slice(0, 5);
			const top5Users = top5Usernames.map(username => ({ username }));
			console.log(top5Users);
			io.emit('getchatuser', top5Users);
		});
	});

	socket.on('disconnect', () => {
		for (const username in clients) {
		  if (clients[username] === socket) {
			delete clients[username];
			break;
		  }
		}
	});
	  
	});

	server.listen(3100, () => {
		console.log('Chat server started');
	});
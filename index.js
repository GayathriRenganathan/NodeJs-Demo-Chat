var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

var dbUrl = 'mongodb://<user-name>:<password>@<host>:<port>/<db-name>';
/* Connection to Mongo

mongoose.connect(dbUrl,{useMongoClient : true}, (err)=>{
	if(err){
		console.log("error while connecting mongodb",err);
	}
});
var messages = Mongoose.model('Message',{
	name: String,
	message : String

});
app.post('/messages',//async//(req,res)=>{
	var message = new Message(req.body);
	message.save((err)=>{
		if(err){
			sendStatus(500);
		}

		//Explaining callback hell
		Message.findOne({message:'badword'},(err,censored)=>{
			console.log("censored word found "+censored);
			Message.remove({_id :censored.id},(err)=>{
				console.log("Removed Censored id");
			})
		})

		//
		io.emit('message',req.body);
		res.sendStatus(200);
	})

	//Using promises
	message.save().then(()=>{
		console.log("saved");
		return Message.findOne({message : 'badword'});
	})
	.then(censored=>{
		if(censored){
			console.log("censored word found "+censored);
			return Message.remove({_id :censored.id})
		}

		io.emit('message',req.body);
		res.sendStatus(200);
	})
	.catch((err)=>{
		res.sendStatus(500);
		return console.error(err);
	})
	

	//async await
	try{
		var savedMessage = await message.save();
		console.log("saved");
		var censored = await Message.findOne({message : 'badword'});
		if(censored){
			console.log("censored word found "+censored);
			await Message.remove({_id :censored.id})
		}else{
			io.emit('message',req.body);
		}
		res.sendStatus(200);
	}catch(error){
		res.sendStatus(500);
		return console.error(error);
	}

	
	

});*/
var messages = [
{
	name : 'Gayathri',
	message : 'hello'
},
{
	name : 'Yesh',
	message : 'hello  There'
}
];
app.get('/messages',(req,res)=>{
	res.send(messages);
})
app.post('/messages',(req,res)=>{
	messages.push(req.body);
	io.emit('message',req.body);
	res.sendStatus(200);
});
io.on('connection',(socket)=>{
	console.log("new user connected");
})
http.listen(3000,()=> console.log("Listening on port 3000"));
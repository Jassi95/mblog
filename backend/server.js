const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Post = require('./data/PostData');
const User = require('./data/user');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
    'mongodb+srv://jjuhho:ohuj1995@cluster0-gciqo.mongodb.net/mblog?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true },(err,client)=>
{
  if(err) return console.log(err)
});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));



// this is our  post get method
// this method fetches all available data in our database
router.get('/getPosts', (req, res) => {
  Post.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

/*
router.get('/getUser', (req,res)=>{
  const{uName ,psw} = req.body;
  let query = {userName: uName, password:psw};

User.find(query).toArray(function(err, result) => {
    if (err) return res.json({ success: false, error: err });
    console.log(result);
    return res.json({ success:true, data: results});
  }
}));
*/
// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Post.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Post.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new Posts in our database
router.post('/putPost', (req, res) => {
  let data = new Post();

  const { id, userName,post,read,time } = req.body;

  if ((!id && id !== 0) || !post) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id=id,
  data.userName=userName,
  data.post = post,
  data.read=false,
  data.time=time,
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import {Banner} from "./Banner.js";
import {BlogCreator} from "./BlogCreator.js";
import {PostRow} from "./PostRow.js";
import {VisibilityControl} from "./VisibilityControl.js";


export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
     cur_user: null,
     id:0,
     blogItems: [],
     showReaded: true,
     intervalIsSet:false,
   }
 }

componentDidMount(){ //updates our UI with new data every 1 second.
  this.getDataFromDb();
  if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
}

componmentWillUnmount(){
  if(this.state.intervalIsSet){
    clearInterval(this.state.intervalIsSet);
    this.setState({intervalIsSet:null});
  }
}

getDataFromDb=()=>{
  fetch('http://localhost:3001/api/getPosts')
  .then((data)=>data.json())
  .then((res)=>this.setState({blogItems: res.data}));
}


updateNewTextValue =(event)=>{
   this.setState({ newItemText: event.target.value});
 }


 changeStateData = () => {
   this.setState({
   cur_user: this.state.cur_user === "Juho" ? "Verneri" : "Juho"
   })
 }


createNewBlog=(post)=>{
  let currentIds = this.state.blogItems.map((blogItems) => blogItems.id);
  let idToBeAdded = 0;

    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putPost', {
      id: idToBeAdded,
      userName: this.state.cur_user,
      post: post,
      read: false,
      time: Date(),
    });
  };

deleteFromDB = (idTodelete) => {
  parseInt(idTodelete);
  let objIdToDelete = null;
  this.state.blogItems.forEach((dat) => {
    if (dat.id === idTodelete) {
      objIdToDelete = dat._id;
    }
  });

  axios.delete('http://localhost:3001/api/deleteData', {
    data: {
      id: objIdToDelete,
    },
  });
};


updateDB = (idToUpdate) => {
   let objIdToUpdate = null;
   let toggle=null;
   parseInt(idToUpdate);
   this.state.blogItems.forEach((dat) => {
     if (dat.id === idToUpdate) {
       objIdToUpdate = dat._id;
       toggle = dat.read;
     }
   });

   axios.post('http://localhost:3001/api/updateData', {
     id: objIdToUpdate,
     update: { read: !toggle}
   });
 };


toggleBlog = (post) => this.setState({ blogItems: //needs to be updated to update database
   this.state.blogItems.map(item => item.post === post.post
   ? { ...item, read: !item.read } : item) });




blogTableRows = (doneValue) => this.state.blogItems
    .filter((item) => item.read ===doneValue).map((item) =>
     <PostRow key={item.post} item={item} curUser={this.state.cur_user} user={item.userName} callback={this.updateDB} delete={this.deleteFromDB}/>).reverse()


logOut = ()=>
this.state.cur_user=null;

logIn =(user)=>{

    this.state.cur_user=user;


};



render() {
  return (
  <div>
      <Banner logIn={this.logIn} logOut={this.logOut} name={this.state.cur_user} posts={this.state.blogItems} logged={this.state.cur_user}/>



          <div className="container-fluid p-4">
            <BlogCreator callback={this.createNewBlog} user={this.state.cur_user}/>

              <div className="bg-primary text-white text-center p-2">
                  <h4>Unread posts</h4>
              </div>
              <div>
                  {this.blogTableRows(false)}
              </div>

                <div className="bg-primary text-white text-center p-2">
                    <VisibilityControl description="already readed posts"
                      isChecked={this.state.showReaded}
                      callback={(checked)=>
                      this.setState({showReaded: checked})}/>
                </div>

                {this.state.showReaded &&
                      <div>{ this.blogTableRows(true) }</div>
                }


         </div>
      </div>
      )
  };
 }

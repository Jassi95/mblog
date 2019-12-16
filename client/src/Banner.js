import React, {Component} from 'react';



export class Banner extends Component {
  constructor(props) {
      super(props);
      this.state = { user: "",
      psw:"" }
  }
updateUserName=(event)=>{
  this.setState({user:event.target.value});
}

updatePsw=(event)=>{
this.setState({psw:event.target.value});
}

logView =(user)=>{
    let login;
    if(user === null ){
    login =<div className="row">
      <div className="col">
        username  <input className="form-control" value ={this.state.user} onChange ={this.updateUserName}/>
        <button onClick={()=>this.props.logIn(this.state.user)} className="btn-primary">login</button>
    </div>
      {/*<div className="col">
        password<input type="password" className="form-control" value ={this.state.psw} onChange ={this.updatePsw}/>
      </div>*/}

    </div>  ;
    }
    else {
    login = <button onClick={()=>this.props.logOut()} className="btn btn-primary m-2">
        Log out
      </button> ;
    };
    return(
      login
    )
  };

  render = ()=>
  <h4 className="bg-primary text-white text-center p-2">
  { this.props.name } Micro Blog
  ( {this.props.posts.filter((t)=>!t.read).length} unread posts )
  {this.logView(this.props.name)}


</h4>

}

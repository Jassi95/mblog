import React, { Component } from 'react';

export class PostRow extends Component {


deleteButton=(writer,curUser)=>{
  let blog;
  if(writer===curUser){
    blog =
    <div className="col-auto">
      <button onClick={()=>this.props.delete(this.props.item.id)} className="btn btn-primary btn-sm m-1">
         remove
       </button>
    </div>
  }
  else{
    blog=<div></div>
  }
  return(blog)
}

PrettyTime=(time)=>{
  let prettyTime;

  prettyTime= time.replace("T"," ").slice(0,16);
  return(prettyTime);
}

render = ()=>
    <div className="row-12 border border-primary ">
      <div className="col m-2">
     {this.PrettyTime(this.props.item.time)} {this.props.item.userName} writes:
     </div>
    <div className="row-12 border border-primary">
      <div className="col m-2">
        {this.props.item.post}
        </div>
    </div>
      <div className="row text-center">
          <div className="col-auto mr-auto m-1">
            read <input type="checkbox"  checked={ this.props.item.read }
            onChange={ () => this.props.callback(this.props.item.id) }/>
          </div>
            {this.deleteButton(this.props.item.userName,this.props.curUser)}


      </div>
    </div>
}

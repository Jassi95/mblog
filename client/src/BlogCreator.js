import React, { Component } from 'react';
export class BlogCreator extends Component {
    constructor(props) {
        super(props);
        this.state = { newItemText: "" }
    }
    updateNewTextValue = (event) => {
        this.setState({ newItemText: event.target.value});
    }
    createNewPost = () => {
        this.props.callback(this.state.newItemText);
        this.setState({ newItemText: ""});
    }

    postBlog=(user)=>{
      let blog;
      if(user===null){
        blog=<div></div>;
      }
      else{
        blog =
        <div className="my-1">
          <input className="form-control" value={this.state.newItemText} onChange={ this.updateNewTextValue } />
          <button className="btn btn-primary mt-1"onClick={ this.createNewPost }>
            Post
          </button>
        </div>
      };
      return(blog);
    }

    render = () =>
        <div>
            {this.postBlog(this.props.user)}
        </div>
}

import React, { Component } from 'react';


export class VisibilityControl extends Component {
    render = ()=>
    <div className="bg-primary text-white text-center p-2" >
      <h4>
      <input type="checkbox" className="m-2"
        checked={this.props.isChecked}
        onChange={(e)=> this.props.callback(e.target.checked)}/>

          Show {this.props.description}
      </h4>
  </div>
}

import React from "react";

export default class BootstrapInput extends React.Component {
  render() {
    return (
      <div className="mb-2">
        <label className="form-label text-capitalize">
          {this.props.name.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <input
          type="text"
          className="form-control"
          value={ this.props.parentName
            ? this.props.currentUser[this.props.parentName][this.props.name]
            : this.props.currentUser[this.props.name]
          }
          autoFocus
          autoComplete="none"
          onChange={(e)=>this.props.setUserFormValue(e.target.value,this.props.name,this.props.parentName)}
        />
      </div>
    );
  }
}

import React from "react";

export default class BootstrapTableCell extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.user.id}</td>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.username}</td>
        <td>{this.props.user.email}</td>
        <td>{Object.values(this.props.user.address).join(', ')}</td>
        <td>{this.props.user.phone}</td>
        <td>{this.props.user.website}</td>
        <td>{Object.values(this.props.user.company).join(', ')}</td>
        <td>
          <button className="btn btn-primary btn-sm" style={{fontSize:"0.7rem"}}>
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

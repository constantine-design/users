import React from "react";
import BootstrapTableCell from "./BootstrapTableCell.js";

export default class BootstrapTable extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-dark table-striped" style={{fontSize:"0.7rem"}}>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>username</th>
              <th>email</th>
              <th>adress</th>
              <th>phone</th>
              <th>website</th>
              <th>company</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            { this.props.users.map(x=>
              <BootstrapTableCell
                key={x.id}
                user={x}
                makeUserCurrent={this.props.makeUserCurrent}
              />
            ) }
          </tbody>
        </table>
      </div>
    );
  }
}

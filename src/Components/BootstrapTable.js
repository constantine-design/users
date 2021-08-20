import React from "react";
import BootstrapTableCell from "./BootstrapTableCell.js";

export default class BootstrapTable extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-dark table-striped" style={{fontSize:"0.7rem"}}>
          <thead>
            <tr>
              { Object.keys(this.props.newUser).map((val,key)=>
                  <th key={"t"+key}>{val}</th>
                )
              }
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.users.map(x=>
              <BootstrapTableCell
                key={x.id}
                user={x}
                newUser={this.props.newUser}
                makeUserCurrent={this.props.makeUserCurrent}
              />
            ) }
          </tbody>
        </table>
      </div>
    );
  }
}

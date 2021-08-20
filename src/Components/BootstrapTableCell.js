import React from "react";

export default class BootstrapTableCell extends React.Component {
  render() {
    return (
      <tr>
        { Object.keys(this.props.newUser).map((val,key)=>
            <td>{ typeof this.props.user[val] !== 'object'
              ? this.props.user[val]
              : Object.values(this.props.user[val]).filter(x=>(typeof x !== 'object')).join(', ')
            }</td>
          )
        }
        <td>
          <button
            className="btn btn-primary btn-sm"
            style={{fontSize:"0.7rem"}}
            onClick={(e)=>this.props.makeUserCurrent(this.props.user.id,e)}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

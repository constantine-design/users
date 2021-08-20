import React from "react";
import BootstrapInput from "./BootstrapInput.jsx"

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: this.props.newUser,
    }
  }

  render() {

    return (
      <form className="users-form" >
        <div className="text-end">
        <button
          className="btn btn-danger btn-sm"
          style={{fontSize:"0.7rem"}}
          onClick={this.props.deleteCurrentUser}
          disabled={(this.props.newUser===this.props.currentUser)?"disabled":""}
        >
          Delete
        </button>
          <button
            className="btn btn-secondary btn-sm ms-2"
            style={{fontSize:"0.7rem"}}
            onClick={this.props.clearCurrentUser}
          >
            New
          </button>
          <button
            className="btn btn-warning btn-sm ms-2"
            style={{fontSize:"0.7rem"}}
            onClick={this.props.saveCurrentUser}
          >
            Save
          </button>
        </div>
        {
          Object.keys(this.props.newUser).map(key=> {
            const isObj = (typeof this.props.newUser[key] === 'object');
            if (!isObj) {
              return (
                <BootstrapInput
                  key={key}
                  name={key}
                  parentName={false}
                  setUserFormValue={this.props.setUserFormValue}
                  currentUser={this.props.currentUser}
                  />
              );
            } else {
              const innerKeys = Object.keys(this.props.newUser[key]);
              const outputArr = innerKeys.map(subKey=>
                <BootstrapInput
                  key={key+subKey}
                  name={subKey}
                  parentName={key}
                  setUserFormValue={this.props.setUserFormValue}
                  currentUser={this.props.currentUser}
                />
              );
              return (
                <div className="border px-3 pb-3 mb-3 mt-4">
                  <h3 className="h5 mt-2 mb-0 text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  {outputArr}
                  <br />
                </div>
              );
            }
          })
        }
      </form>
    );
  }
}

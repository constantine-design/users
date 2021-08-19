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

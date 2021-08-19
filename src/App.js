import './App.css';
import React from "react";
import BootstrapTable from "./Components/BootstrapTable.js";
import UserForm from "./Components/UserForm.js";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.newUser = {
      id: "",
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "", zipcode: "", geo: "" },
      phone: "",
      website: "",
      company: { name: "", catchPhrase: "", bs: "" }
    };
    this.state = {
      users: [],
      isDataFetching: false,
      currentUser: this.newUser,
    };
  }

  fetchUsers = () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    this.setState({...this.state, isDataFetching: true});
    fetch (url)
    .then (response => response.json())
    .then (data => {
      this.setState({ users: data, isDataFetching:false });
    })
    .catch(e=> {
      this.setState({...this.state, isDataFetching: false});
      console.log(e);
    });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  setUserFormValue = (val, key, parentKey) => {
    if (!parentKey) this.setState({ currentUser: ( {...this.state.currentUser, [key]: val} ) });
    else this.setState({ currentUser: ( {...this.state.currentUser, [parentKey]: ({...this.state.currentUser[parentKey], [key]: val}) } ) });
  }

  render() {
    //console.log("New User Array:");
    console.log(this.state.currentUser);
    return (
      <div className="Appcontainer">
        <div className="container mt-5 mb-5">
          <h1 className="text-center mb-5">Users App</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9 order-2 order-lg-1 mb-4">
              { this.state.isDataFetching
                ? <div className="text-center py3 h5">Loading ...</div>
                : <BootstrapTable users={this.state.users} />
              }
            </div>
            <div className="col-md-8 col-lg-3 order-1 order-lg-2 mb-4">
              <div className="bg-primary text-white py-4 px-3 rounded">
                <UserForm
                  newUser={this.newUser}
                  currentUser={this.state.currentUser}
                  setUserFormValue={this.setUserFormValue}
                  users={this}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

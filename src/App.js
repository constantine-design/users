import './App.css';
import React from "react";
import BootstrapTable from "./Components/BootstrapTable.js";
import UserForm from "./Components/UserForm.js";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.url = 'https://jsonplaceholder.typicode.com/users';
    // this obj is used as three ways
    // 1. get data structure from interval
    // 2. get field names (by adding spaces before camel case)
    // 3. get default values of the fields
    this.newUser = {
      id: "",
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "", zipcode: "", /*geo: {}*/ },
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
    this.setState({...this.state, isDataFetching: true});
    fetch (this.url)
    .then (response => response.json())
    .then (data => {
      this.setState({ users: data });
      this.newUser.id = (Math.max( ...this.state.users.map(el=>el.id)) + 1); // set new key plus 1 to biggest
      this.setState({ isDataFetching:false });
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

  makeUserCurrent = (userId, e) => {
    //alert("User #"+userId+" is active" );
    e.preventDefault();
    this.setState({ currentUser: this.state.users.find(el=>el.id===userId) });
  }

  clearCurrentUser = (e) => {
    //alert("Clear" );
    e.preventDefault();
    this.setState({ currentUser: this.newUser });
  }

  saveCurrentUser = (e) => {
    //alert("Save" );
    e.preventDefault();
    fetch(this.url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.currentUser)
    })
    .then(response => { return response.json( ) })
    .then(data => console.log(data) )
    // update users after all
    this.fetchUsers();
  }

  deleteCurrentUser = (e) => {
    //alert("Delete current user" );
    e.preventDefault();
    e.preventDefault();
    fetch(this.url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.state.currentUser.id })
    })
    .then(response => { return response.json( ) })
    .then(data => console.log(data) );
    // update users after all
    this.fetchUsers();
  }

  render() {
    //console.log("New User Array:");
    //console.log(this.state.currentUser);
    return (
      <div className="Appcontainer">
        <div className="container mt-5 mb-5">
          <h1 className="text-center mb-5">Users App</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9 order-2 order-lg-1 mb-4">
              { this.state.isDataFetching
                ? <div className="text-center py3 h5">Loading ...</div>
                : <BootstrapTable
                    users={this.state.users}
                    newUser={this.newUser}
                    makeUserCurrent={this.makeUserCurrent}
                  />
              }
            </div>
            <div className="col-md-8 col-lg-3 order-1 order-lg-2 mb-4">
              <div className="bg-primary text-white py-4 px-3 rounded">
                <UserForm
                  newUser={this.newUser}
                  currentUser={this.state.currentUser}
                  setUserFormValue={this.setUserFormValue}
                  clearCurrentUser={this.clearCurrentUser}
                  saveCurrentUser={this.saveCurrentUser}
                  deleteCurrentUser={this.deleteCurrentUser}
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

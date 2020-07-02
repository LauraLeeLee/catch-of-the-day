import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";



class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object,
    storeId: PropTypes.string,
  };

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    // we're checking to see if we were already logged in when the page 
    //  reloaded. 
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user});
      }
    })
  }

  authHandler = async(authData) => {
    // 1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. claim it there is no owner
    if(!store.owner) {
      //save it as our own
      await base.post(`${this.props.storeId}/owner`, { data: authData.user.uid })
    }
    // 3. set the state of the inventory component to reflect the current user
    //  this state is only local to this component!! 
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    console.log("logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    // 1. check if they are logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate}/>;
    }
    //2. check if they are not the owner of the store 
    if(this.state.uid !== this.state.owner) {
      return <div>
        <p>Sorry you are not the owner!</p>
        {logout}
        </div>
     
    }
    
    // 3. if they are the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => 
        <EditFishForm key={key} 
                      index={key}
                      fish={this.props.fishes[key]}
                      updateFish={this.props.updateFish}
                      deleteFish={this.props.deleteFish}
        />
        )}
        {/* the addFish method gets passed down but need to use this.props
        because the addFish method does not live on Inventory- its a prop of Inventory */}
       <AddFishForm addFish={this.props.addFish}/>
       {/* our function to load samples needs to live in App.js
       because any methods that updates state needs to live in that 
       same component where our state lives.
       the method passed down now is a prop of Inventory.js*/}
       <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
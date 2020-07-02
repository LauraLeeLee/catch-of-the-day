import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.js';
import Order from './Order.js';
import Inventory from './Inventory.js';
import sampleFishes from '../sample-fishes.js';
import Fish from './Fish.js';
import base from '../base.js';
import { checkPropTypes } from 'prop-types';

// we need to mirror our state to firebase, we need to wait 
// until the app component is on th epage then then 
//we'll start to sync them up
// we'll use Lifecycle Methods-- tell us when certain things
//    are happening. 

class App extends React.Component {
     // need to add an empty state to start- inital state can be either
     //  set in the constructor() 
     // constructor() {
       // super();
       // this.state = {}
     // }
     // *** or can use a property-- Wes' preferred way
    
     state = {
       fishes: {},
       order: {}
     };

     static propTypes = {
       match: PropTypes.object,
      }

     componentDidMount() {
       const { params } = this.props.match;
       // first rinstate our local storage
       const localStorageRef = localStorage.getItem(params.storeId);
       // if there is a lcoalStorageRef, we're going to reinstate it (if its a store we've
       //   already visited)
       // we're trying to render out order before fishes actually exist- 
       //   it takes a split second to go to Firebase to get our database
       // 
       if(localStorageRef) {
        // turns localStorageRef back into an object for setState
         this.setState({ order: JSON.parse(localStorageRef) });
       }
       console.log(localStorageRef);
       // this is diff than the ref we used in input
       // ref in firebase are a reference to a piece of data in the database
       // syncState also requires and object- a context and the state
       this.ref = base.syncState(`${params.storeId}/fishes`, {
         context: this,
         state: 'fishes'
       });
     }
     
     // update user's order data in localstorage
     componentDidUpdate() {
       console.log(this.state.order);
       // put into our local storage- the arguments are the key and values
       localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
     }

     // need to unlisten - helps to clean up any memory leaks,any memory issues
     // this life cycle is as soon as the component is unmounting
     componentWillUnmount() {
       base.removeBinding(this.ref);
     }
  

     // **** the methods that update state and the actual state always need to live
     //   in the exact same component
     // create a method:
     addFish = (fish) => {
        // In order to update state you need to use their existing set 
     //   state API.
      // two steps:
      // 1. take a copy of the existing state- you always take a copy because you never
      // want to reach into state and modify it directly (that is a mutation in JS)- can cause issues
      //  with perfomrance, things updating out of order.
      const fishes = {...this.state.fishes};
      // 2. add our new fish to that fishes variable
       fishes[`fish${Date.now()}`] = fish;
       // 3. set the new fishes object to state
       // takes our old fishes object in state and overwrites it with our
       // new fishes object we've just created- this triggers a change in react
       //   and if they are displayed anywhere on the page, the proper changes are made 
       this.setState({
         fishes: fishes
        });
     }

     // takes 2 args- a key for which obj was updated, and also takes 
     //  the updatedFish
     // need to pass updateFish down to Inventory to EditFishForm
     updateFish = (key, updatedFish) => {
       //1. take a copy of the current state
       const fishes = {...this.state.fishes}
       // 2. update that state
       fishes[key] = updatedFish;
       // 3. set that to state
       this.setState({fishes: fishes});
     }

     // takes arg key for whih fish we'd like to delete
     deleteFish = (key) => {
      // 1. take a copy of state
      const fishes = {...this.state.fishes}
      // 2. update the state - set the fish we don't want to 'null'
      // for Firebase to also remove it you must set it to 'null'
      fishes[key] = null;
      console.log(key);
      // 3. Update state
      this.setState({fishes: fishes});

     }

     loadSampleFishes = () => {
       console.log("loading fish samples");
       this.setState({fishes: sampleFishes});
     };

     addToOrder = (key) => {
       //1. take a copy of state
       const order = {...this.state.order};
       // 2. either add to the order or update the number in our order
       order[key] = order[key] + 1 || 1;
       // 3. call setState to update our order state object
       this.setState({order: order});
     } 
     
     removeFromOrder = (key) => {
    //1. take a copy of state
       const order = {...this.state.order};
     // 2. Remove item from order- since we are not mirroring to Firebase
     //   we an use the Delete keyword
       delete order[key];
    // 3. call setState to update our order state object
       this.setState({order: order});
     }

  render() { 
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100  }/>
          <ul className="fishes">
            {/* JSX has no logic built into it- need to use reg. JS.
            each child in an array or iterator should have a unique 'key' prop */}
            {Object.keys(this.state.fishes).map(key => (
              // passing attribute of index to access the key for each fish
              // can't use the name key as it is used for soemthing else in react
              < Fish 
                key={key} 
                index={key} 
                addToOrder={this.addToOrder} 
                details={this.state.fishes[key]} 
              />
            )
            )}    
          </ul>
        </div>
        {/* can do an object spread to pass down all objects in state
        {...this.state} if all of the state is needed */}
        <Order fishes={this.state.fishes} 
                order={this.state.order}
                removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish}
        loadSampleFishes={this.loadSampleFishes}
        fishes={this.state.fishes}
        updateFish={this.updateFish}
        deleteFish={this.deleteFish}
        storeId={this.props.match.params.storeId}
        />     
      </div>
    )
  }
}

export default App;

//props- are the way we get data into a component.  they're a bit like attributes
//   we'll have data that lives in our App, and we'll need some 
//   way to get the data from App into our components.
//  Or, if someone is going to pass data into a component, then
//    how do we then access it from inside that component.
//  Props is how the data gets to where it needs to go.
// Props is kind of like and object of data that got passed in,
//    kind of like an argument's object in a function of everything
//    that got passed in.
// 

// state -- is where the data lives
//  
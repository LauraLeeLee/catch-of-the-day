import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import Router from './components/Router.js';
// loading CSS, CSS can be written in files to pertain to
//  one specific component and then just loaded into 
// that component- it is just imported into the component
// Or it can be imported into the index.js file --one css file or many.
import './css/style.css';

// the render method takes 2 things:
//  1. it takes some jsx
//  2. a mounting point- an actual DOM element to mount it
//    to the page.
render(<Router />, document.querySelector('#main'));


//The App component is like the mama compoent that holds
// all of the children.  
// We will have a header component that shows us the title
// we'll have a bunch of fish components which will render out
//    a picture ,title, a description and the abiity to add it 
//    to our order
// An order component, 
// An inventory component
// these all will be siblings and a child of the App component
// it will allow us to share things like data, methods.
// essentializes the data and the functionality

// ==== Stateless Functional Components ====
// if a component doesn't really 'do anything' and they have
//  the data fed to them.  There's no need for it to be a full 
//  blown react component, it just renders out some HTML.
// If your component only has a render method and prop-types
//  then its unnecessary to do the full way to create a component.
//  If your component only has a render method and prop-types
//  then its unnecessary to do the full way to create a component.
//  --- we can convert it over to a Stateless Functional Component
//   

// ==== Routing with React Router ====
// routing isn't baked into react. they defer it to an external component.
// react router is one and Next.js is another.
//  the router is its own compoment (router.js)

// ==== Helper and Utility Functions
// Helper functions that do something but aren't necessarily related to
//    react.  helper.js
// Utility Functions, functions that are helpful to doing tasks
//  and are functions we use over in varous projects. utils.js


// ==== Events, Refs, and 'this' Binding ====
// events are pretty much the same- only difference in react is
//    it wraps it in a Synthetic Event-  which is just a cross browser
//    - it makes sure it works across all of the different browsers and all
//    the different devices. 
// Events are done inline in react
//  you only provide the name of the function and not the parens, we don't
//    want it to run on page load, when the component mounts.
//    we want it to run when someone clicks on it. 

// // ** golden rule in DOM is, don't touch the DOM--don't go and
    // manually select the elements. 
    // There are two ways to handle inputs, refs and syncing 
    //  the text of the input into something called state.
  // Ref in React allows us to reference an actual DOM note on the page.
  // the attribute ref="myInput" is depricated.
  // A function ref- harder to understand.  You give it a function
  //   ref={(myInput) => this.myInput = myInput} <-- this is more confusing
  // A simpler way to reference any element on the page:
  //  create a ref above your render()
  // myInput = React.createRef(); <-- creates and empty ref
  // then go down into the render() and set the ref attribute to
  //    this.myInput.
  // This surfaces the input on the component to be able to 
  //    ahead and grab it. 
  //  'this' is equal to the component, but if we reference 'this'
  //    in a function, 
  // we need to use a lifecycle event.
  // componentDidMount() will run as soon at the component mounts
  //  or is put onto the page.
  // All of the built in methods with React, are in the main component React
  //    any components we add on, are not bound ('this') by default.
  // That means its hard to reference the component inside one of
  //    its own methods.
  // 
  // Solution is to bind our own methods as well. 
  // using the constructor() can get quite big if you have many methods,
  // a solution is instead of declaring a method on the component, we 
  //    instead declare a property - which is going to be set to an arrow 
  //    function.
  // *** properties will be bound to the instance rather than nothing.
  //      then we'll be able to access 'this' inside of it. 

  // ==== State ====
  // **** State is essentially an object that lives inside
  //   a component that stores all of the data that
  //  that component and maybe some of its children need.
  //  State is just an object that holds data that itself needs,
  //    as well as some children may need.
  // Can think of State as a single source of truth,
  //   meaning that when using Vanilla JS and Jquery, 
  //   we may store our data in many places, a variable, an
  //   attribute on a DOM -- with React the golden rule
  //   is 'don't touch the DOM', and instead of updating
  //    all the pieces on our website, we want to think about
  //    just updating our data and letting React take it.
  // With React you simply keep your data in State and
  //  whenever state changes, React will react to that change,
  //  it knows where you've used the particular data anywhere
  //  in the application-- it will then go and forward and update
  //  that changed data in all the different pieces on the website.
  //
  // how do we get fish into state and where does state live? Every 
  // component in react can have its own state. Its often the case 
  // where you have one parent state on a higher component and then 
  // you pass that state down to the children.
    // right now this fish object is limited to only this AddFishForm 
    // component, if we want to give it to order and inventory and the menu-- 
    // there's no way to share the data with those other components-- 
    // unless the data lives at a higher level.
    // We want the data to live in App- its the highest level 
    // and can then pass any data down to the children
    // You can't pass data up, but you can always pass data down
    //
        // need to add an empty state to start- inital state can be either
     //  set in the constructor() 
     // constructor() {
       // super();
       // this.state = {}
     // }
     // *** or can use a property-- Wes' preferred way 
      // **** the methods that update state and the actual state always need to live
     //   in the exact same component 
     // need to create a method to add a fish. Need to pass that method down
     //    2 levels-- AddFishForm is in Inventory is in App
     //  Pass it down using props
     // 
     // **** In order to update state you need to use their existing set 
     //   state API.

     // ==== Displaying State with JSX ===
     // see the Fish.js and App.js

     // ==== Updating our Order State
     // **** if you need access to the key , you have to pass it
     //   a second time with a prop

     // ====Diplaying Order State with JSX

     // ==== Persisting our State with Firebase ====
     // to store data to reload every visit to the app

     // === Persisting Order State with localstorage ===
     // to store data temporarily for a user.
     // local storage is a key /value token. you can come back
     //   to your app and pull it back into your app
     
     // *** when you try to put an object where a string is required
     //   it returns [object object]
     //  we need to first convert that object to a string
     //   representation.
    //  JSON.strinify(object);

    // ==== Bi-diretional Data Flow and Live State Editing ==== 

    // === Removing Items from State ==== 
    // C Create
    // R Read 
    // U Update 
    // D Delete

    // === Animating React Components ====
    // 2 diff animations in our project, a mounting and unmounting of
  //    of different components
  // Animating the component didMount and animating the component willUnmount
  // The 2nd way is, when we have something change, we want to be able to
  //    animate that up and down.
  //    
  

  // === Component Validation with PropTypes ===
  // with PropTypes we can sort of validate the data that is 
  //  being passed in to make sure we're passing the right 
  //   kind of data that it's looking for and the data is being passed
  //  in that it actually looks the way we're expecting it to be
  //  passed in. 
  // PropTypes allows us ahead of time to specify what
  //  needs to be passed in when its used and 
  //  if soeone doesn't pass in the right type of data or 
  //  the right amount of data, then we're going to give
  //   them a warning in their console telling them that
  //   that they failed their PropType 
  // PropTypes are a development helper, they don't go to production
  // *** stop and write your PropTypes immediately when you add
  //    a prop to a component! 


  // ==== Deploying app to Now (zeit now) ====
  // Now doesn't have a server built in, you have to bring
  //  a server thats going to handle all the server side routing
  //  They have a package for it called 'Serve'
  
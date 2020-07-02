import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

//very component we have is its own class
class StorePicker extends React.Component {
  // a class needs at least ONE method
  // one of the methods has to be 'render'
  // render determines what html or DOM elements are to be
  //   rendered to the page
  // clasName is used instad of class
  // to return multiple lines for html, place the code in
  //   parens, it'll follow the BEDMAS rule
  // From a render method you can only return ONE element
  //    you can't return sibling elements
  //    You can return many elements inside a parent element, 
  //    You just can't return sibling elements
  // The solution is to wrap them in a React.Fragment tag
  // This allows us to return as many adjacent elements as we want
  // Soon we may be to enclose the adj elements in empty opening and
  //    closing tags <></> *** Can use these now! 
  // commenting in JSX is different, need to use curly brackets
  //    and JS block comments

  //**** IMPORTANT YOU CANNOT return both a comment and an
  //   element-- if you need to have a comment you must put it inside
  //    of your returned element...it reads it as an adjacent
  //    jsx selector if not.
  // render() {
  //   return (
  //     <React.Fragment>
  //       <p>Fish!</p>
  //       <form action="" className="store-selector">
  //         {/* a comment in JSX */}
  //        <h2>Please Enter A Store</h2>
  //       </form> 
  //     </React.Fragment>
  //   )
  // }

  // the default action of a form is to take all the inputs that 
      //  have names and submit that data to either the action 
      // of the form - or subit it to the same page.
      // the form submitting is actually refreshing the page. 
      // If you're not using a server side form handler, and are handling
      // it right in JS,  
      // Pass the function the event, and call preventDefault 
      //    on the event to prevent the refresh default action
  
  // to bind our own methods to 'this'
  // the constructor function/ method, is a method that will run 
  //  before the StorePicker component is created.
  // 
  // constructor() {
  //   // can't run anything in constructor until you call super()
  //   // super() first runs the component that we're extending - React.component
  //   super();
  //   // in construtor we can bind all the methods
  //   // it will 'this' inside of goToStore as the StorePicker instance
  //   // if you don't bind it, 'this' in goToStore will be undefined
  //   this.goToStore = this.goToStore.bind(this);
  // } 

  // using the constructor() can get quite big if you have many methods,
  // a solution is instead of declaring a method on the component, we 
  //    instead declare a property - which is going to be set to an arrow 
  //    function.
  // *** properties will be bound to the instance rather than nothing.
  //      then we'll be able to access 'this' inside of it. 

  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object,
  }
  
  goToStore = (event) => {
    // 1. stop form from submitting
    event.preventDefault();
    // 2. get the text from that input
    // ** golden rule in DOM is, don't touch the DOM--don't go and
    // manually select the elements. 
    // There are two ways to handle inputs, refs and and syncing 
    //  the text of the input into something called state.
    const storeName = this.myInput.current.value;  
    // 3. change the page to /store/whatever-they-entered.
    // change the URL with push state
    // push state allows to change the url without having to refresh the page
    // or lose anything that we have in memory. React Router
    this.props.history.push(`/store/${storeName}`);
    
  }
  
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        
        {/* values of inputs always needs to be directly attached
           to state!!! If you want a default value in react, you need
            to use the defaultValue attribute */}
        <input type="text" 
              ref={this.myInput}  
              required placeholder="Store Name" 
              defaultValue={getFunName()}/>
        <button type="submit">Visit Store ➡</button>
      </form>
    )
  }
 }

 export default StorePicker;

import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  }
  
  createFish = (event) => {
    // 1. stop the form from submitting
    event.preventDefault();
    // how do we get fish into state and where does state live? Every component in react can have its own state. Its often the case where you have one parent state on a higher component and then you pass that state down to the children.
    // right now this fish object is limited to only this AddFishForm component, if we want to give it to order and inventory and the menu-- there's no way to share the data with those other components-- unless the data lives at a higher level.
    // We want the data to live in App- its the highest level and can then pass any data down to the children
    // 2. pull all values out of the different inputs
    const fish = {
      name : this.nameRef.current.value,
      price : parseFloat(this.priceRef.current.value),
      status : this.statusRef.current.value,
      desc : this.descRef.current.value,
      image : this.imageRef.current.value,
    
    
    }
    // we pass the addFish method our fish object
   this.props.addFish(fish);
   // refresh the form
    event.currentTarget.reset();

  }
  render() {
    return (  
      // when someone submits this form, we need to turn all of 
      //  the inputs into a fish object.
    <form className="fish-edit" onSubmit={this.createFish}>
     <input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
     <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
     <select name="status" ref={this.statusRef}>
       <option value="available">Fresh!</option>
       <option value="unavailable">Sold Out!</option>
     </select>
     <textarea name="desc" ref={this.descRef} placeholder="Desc"/>
     <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
     <button type="submit"> + Add Fish </button>
    </form>
    )
  }
}

export default AddFishForm;
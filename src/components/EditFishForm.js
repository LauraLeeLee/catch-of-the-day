import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string, 
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    updateFish: PropTypes.func,
    index: PropTypes.string,
    deleteFish: PropTypes.func,
  }
  handleChange = (event) =>{
    console.log(event.currentTarget.value);
    const updatedFish = {
      ...this.props.fish,
      // gets the exact input that was edited and changed with the value entered
      [event.currentTarget.name]: event.currentTarget.value,
    };
    // we need to pass key(index attribute) down from Inventory
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
     <div className="fish-edit">
      <input name="name" 
             onChange={this.handleChange} 
             value={this.props.fish.name} 
             type="text" 
             />
      <input name="price" 
             onChange={this.handleChange} 
             value={this.props.fish.price} 
             type="text" 
             />
      <select name="status" 
              onChange={this.handleChange} 
              value={this.props.fish.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" 
                onChange={this.handleChange} 
                value={this.props.fish.desc}
               />
      <input name="image" 
             onChange={this.handleChange} 
             value={this.props.fish.image} 
             type="text" 
             />
      <button onClick={()=> this.props.deleteFish(this.props.index)}> Remove Fish  </button>
     </div>
    );
  }
}

export default EditFishForm;

// This is what is happening in our handleChange method:
   // we need to create an updated fish object then swim upstream from 
    //    EditFishForm, to Inventory, then to App to get the updated fish
    //    back into our state.
    // Update that fish
    // 1. take a copy of the current fish 
    // need to update the properties of the object 
    // *** Computed Property Names-- where we essentially want the value
    //  that's being updated to also be dynamic- square brackets and event.currentTarget.name 
    //  'name' is the attribute we added to our inputs
    // We are able to take a copy of the current fish object and overwrite
    //   the one thing that changed.

    // now we need to go up two levels to App to update our fishes status
    //  with the new information entered.
    //   
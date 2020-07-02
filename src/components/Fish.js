import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';



class Fish extends React.Component {
 static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string, 
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  }
  
  // how do we get the information from state to this Fish component?
  // state needs to be passed down via props
  //if you need access to the key , you have to pass it
     //   a second time with a prop

  handleClick = () => {
   this.props.addToOrder(this.props.index);
  }  

  render() {
    const {image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
    <li className="menu-fish">
      <img src={image} alt={name}/>
    <h3 className="fish-name">{name}
    <span className="price">{formatPrice(price)}</span>
    </h3>
    <p>{desc}</p>
    {/* adding the onClick can be done as a one liner instead like this:
    onClick={() => this.props.addToOrder(this.props.index)} 
    and eliminate the handleClick*/}
    <button disabled={!isAvailable} onClick={this.handleClick}>
      {isAvailable ? 'Add To Order ' : 'Sold Out!'}
    </button>
    </li>
    )
  }
}

export default Fish;

import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  }
// this is a made up name for a 2nd render function
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
   
    // we're trying to render out order before fishes actually exist- 
    //   it takes a split second to go to Firebase to get our database
   // adding fish && helps but there is a lag for getting our information
    const isAvailable = fish && fish.status === "available";
    const cssTransitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // if there is no fish, it will return absolutely nothing- make sure
    //  the fish is loaded before continuing
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...cssTransitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      // CSSTransition takes a number of different properies
      //  classNames, key, timeout
      <CSSTransition {...cssTransitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}


export default Order;

// when you find your render function is having too much in it,
// it probably means you are doing too much in a specific component.
// and you prob could shell off some of the complexity to a separate
// component
// But sometimes it doesn't make sense to farm out something into
//   its own component if you're not going to be using it anywhere else
//
// You can make separate function inside of a single component
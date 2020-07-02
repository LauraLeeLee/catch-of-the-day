import React from 'react';
import PropTypes from 'prop-types';

// can change it to an implicit return:
const Header = (props) => (
    <header className="top">
        <h1>
          Catch 
          <span className="ofThe">
            <span className="of">Of </span>
            <span className="the">The</span> 
          </span>
          Day
       </h1>
        <h3 className="tagline">
          <span>{props.tagline}</span>
        </h3>
      </header>
  );

  Header.propTypes = {
    tagline: PropTypes.string.isRequired
  }
// if you have more than one argument, you can destructure 
//    the props into their own variables
// then you don't need the 'props.' when you assign it in the 
//    attribute
// const Header = ({tagline, age}) => (
//   <header className="top">
//       <h1>
//         Catch 
//         <span className="ofThe">
//           <span className="of">Of </span>
//           <span className="the">The</span> 
//         </span>
//         Day
//      </h1>
//       <h3 className="tagline">
// <span>{tagline}{100  }</span>
//       </h3>
//     </header>
// )

export default Header;


// Other ways to create components
// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch 
//           <span className="ofThe">
//             <span className="of">Of </span>
//             <span className="the">The</span> 
//           </span>
//           Day
//        </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     )
//   }
// }

// 'this' is going to be the component instance- meaning 
//    whatever got passed in when it was used 
// .props is going to be an object inside of the component which
//    contains all of our final properties, so tagline, age, cool
// 
// in react dev tools if you click on any compnent, it'll say it equals $r
//  whatever you have clicked that =$r, you can type $r in console and
//    that will be component 

// ==== Stateless Functional Components ====
// if a component doesn't really 'do anything' and they have
//  the data fed to them.  There's no need for it to be a full 
//  blown react component, it just renders out some HTML.
// If your component only has a render method and prop-types
//  then its unnecessary to do the full way to create a component.
//  --- we can convert it over to a Stateless Functional Component
//  
// function Header(props) {
//   return (
//     <header className="top">
//         <h1>
//           Catch 
//           <span className="ofThe">
//             <span className="of">Of </span>
//             <span className="the">The</span> 
//           </span>
//           Day
//        </h1>
//         <h3 className="tagline">
//           <span>{props.tagline}</span>
//         </h3>
//       </header>
//   )
// }
// can make this as an arrow function:
// const Header = (props) => {
//   return (
//     <header className="top">
//         <h1>
//           Catch 
//           <span className="ofThe">
//             <span className="of">Of </span>
//             <span className="the">The</span> 
//           </span>
//           Day
//        </h1>
//         <h3 className="tagline">
//           <span>{props.tagline}</span>
//         </h3>
//       </header>
//   )
// }
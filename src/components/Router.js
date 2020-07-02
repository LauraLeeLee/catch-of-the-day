import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';



const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker}/> 
      <Route path="/store/:storeId" component={App}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

// inside the Switch tag will be all our routes.
// The way the Switch tag works is that its going to 
// try the first route, if it doesn't match it'll try the
//  next route. if there is no match, it'll fall back to the 
//  'not found' route.
//  You tell it what component to render out.
// We have to render out the router to our mounting point
// Otherwise we're not going to be able to see it working.
// That is done in our index.js file.
//  
// path="/store/store:Id" - a catchall for anything forward slash
//    and any sort of store name.
// 

export default Router;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import { useUserContext } from '../context/user_context'; using useAuth0 instead now to destructer user
// children is being passed brecause it is wrapped by PrivateRoute in App.js ***** below is rest operator ***** we collect them here
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  // spread out props using ...rest **** below is spread operator ***** we spread them here
  return <Route {...rest}
    render={() => {
      // children is the CheckoutPage
      return user ? children : <Redirect to='/'></Redirect>
    }} ></Route>;
};
export default PrivateRoute;

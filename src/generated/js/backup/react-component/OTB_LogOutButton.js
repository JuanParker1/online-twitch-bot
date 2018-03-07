// OTB_LogOutButton React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import { withRouter } from 'react-router-dom';

class OTB_LogOutButton extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null
   };
   render() {
       var Button = ReactBootstrap.Button;

return (
    <li>
        <a href="#" onClick={this.logOut}>Log Out</a>
    </li>
);

   };
   logOut = () => {
       try {
    this.history.pushState(null, '/home');
}
catch (error) {
    window.location.href = '/home';
}
DomainAPI.OTB_UserLogOut();
   };
   componentDidMount() {
   };
   componentWillUnmount() {
   };
}

export default withRouter(OTB_LogOutButton);

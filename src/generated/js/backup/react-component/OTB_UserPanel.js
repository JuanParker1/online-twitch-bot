// OTB_UserPanel React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_UserInfo from './OTB_UserInfo';
import OTB_LogOutButton from './OTB_LogOutButton';

class OTB_UserPanel extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           role: 'dropdown'
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <ul className={"user-panel " + 'd-menu place-right'} style={self.props.style ||{}} data-role={self.props.role}  >
                  {(self.props.user) ? <OTB_UserInfo user={self.props.user} /> : <span />}
                  {(self.props.user) ? <OTB_LogOutButton user={self.props.user} /> : <span />}
               </ul>
           );
       } else {
           return (<span />);
       }
   };
   componentDidMount() {
   };
   componentWillUnmount() {
   };
}

export default OTB_UserPanel;

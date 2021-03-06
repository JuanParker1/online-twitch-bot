// OTB_FunctionDropdownUl React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_CustomFunctions from './OTB_CustomFunctions';
import OTB_DefaultFunctions from './OTB_DefaultFunctions';

class OTB_FunctionDropdownUl extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           application: null,
           role: 'dropdown'
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <ul className={"function-dropdown-ul " + 'd-menu toggle-dropdown-menu'} style={self.props.style ||{}} data-role={this.props.role}  >
                  <OTB_DefaultFunctions application={self.props.application} user={self.props.user} />
                  <OTB_CustomFunctions user={self.props.user} />
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

export default OTB_FunctionDropdownUl;

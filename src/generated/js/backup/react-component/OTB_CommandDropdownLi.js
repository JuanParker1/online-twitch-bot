// OTB_CommandDropdownLi React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_ShowMenuList from './OTB_ShowMenuList';
import OTB_CommandDropdownUl from './OTB_CommandDropdownUl';

class OTB_CommandDropdownLi extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           application: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <li className={"command-dropdown-li " + 'toggle-active-state'} style={self.props.style ||{}} >
                  <OTB_ShowMenuList text={'Commands'} />
                  <OTB_CommandDropdownUl application={self.props.application} user={self.props.user} />
               </li>
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

export default OTB_CommandDropdownLi;
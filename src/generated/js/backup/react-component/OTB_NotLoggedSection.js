// OTB_NotLoggedSection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_NotLoggedIn from './OTB_NotLoggedIn';

class OTB_NotLoggedSection extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <div className={"not-logged-section " + ""} style={self.props.style ||{}} >
                  <OTB_NotLoggedIn />
               </div>
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

export default OTB_NotLoggedSection;

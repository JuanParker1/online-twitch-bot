// OTB_CommandsPage React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_NotLoggedSection from './OTB_NotLoggedSection';
import OTB_CommandsPageContent from './OTB_CommandsPageContent';

class OTB_CommandsPage extends React.Component {
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
               <div className={"page commands-page " + 'flex-grid page-content'} style={self.props.style ||{"height": "100%"}} >
                  {(!self.props.user) ? <OTB_NotLoggedSection user={self.props.user} /> : <span />}
                  {(self.props.user) ? <OTB_CommandsPageContent application={self.props.application} user={self.props.user} /> : <span />}
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

export default OTB_CommandsPage;

// OTB_CustomCommand React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_ShowPagePanel from './OTB_ShowPagePanel';

class OTB_CustomCommand extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           userCommand: null,
           user: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <li className={"custom-command " + 'side-panel-toggle'} style={self.props.style ||{}} >
                  <OTB_ShowPagePanel panelId={self.props.userCommand.get('id')} name={self.props.userCommand.get('name')} />
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

export default OTB_CustomCommand;

// OTB_DefaultCommandList React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_ReactDefaultCommand from './OTB_ReactDefaultCommand';
import OTB_AddDefaultCommand from './OTB_AddDefaultCommand';

class OTB_DefaultCommandList extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           application: null,
           role: 'dropdown',
           defaultCategory: null,
           user: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <ul className={"default-command-list " + 'd-menu toggle-dropdown-menu'} style={self.props.style ||{}} data-role={this.props.role}  >
                  {(self.props.user && self.props.user.hasRole('administrator')) ? <OTB_AddDefaultCommand application={self.props.application} defaultCategory={self.props.defaultCategory} /> : <span />}
{                  self.props.defaultCategory && self.props.defaultCategory.get('appCategoryCommands') ? self.props.defaultCategory.get('appCategoryCommands').map(function(item, index) {
                      return(<OTB_ReactDefaultCommand defaultCommand={item} index={index}  key={item.id || index} application={self.props.application} />);
                  }) : ''}
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

export default OTB_DefaultCommandList;
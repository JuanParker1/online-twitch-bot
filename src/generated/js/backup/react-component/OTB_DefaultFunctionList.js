// OTB_DefaultFunctionList React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_AddDefaultFunction from './OTB_AddDefaultFunction';
import OTB_ReactDefaultFunction from './OTB_ReactDefaultFunction';

class OTB_DefaultFunctionList extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           application: null,
           role: 'dropdown',
           defaultFunctionCategory: null,
           user: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <ul className={"default-function-list " + 'd-menu toggle-dropdown-menu'} style={self.props.style ||{}} data-role={this.props.role}  >
                  {(self.props.user && self.props.user.hasRole('administrator')) ? <OTB_AddDefaultFunction defaultFunctionCategory={self.props.defaultFunctionCategory} application={self.props.application} /> : <span />}
{                  self.props.defaultFunctionCategory && self.props.defaultFunctionCategory.get('appCategoryFunctions') ? self.props.defaultFunctionCategory.get('appCategoryFunctions').map(function(item, index) {
                      return(<OTB_ReactDefaultFunction defaultFunction={item} index={index}  key={item.id || index} application={self.props.application} />);
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

export default OTB_DefaultFunctionList;

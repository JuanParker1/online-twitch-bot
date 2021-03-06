// OTB_CustomCategoryList React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_AddCustomCategory from './OTB_AddCustomCategory';
import OTB_CustomCategory from './OTB_CustomCategory';

class OTB_CustomCategoryList extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           role: 'dropdown',
           application: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <ul className={"custom-category-list " + 'd-menu toggle-dropdown-menu'} style={self.props.style ||{}} data-role={this.props.role}  >
                  <OTB_AddCustomCategory user={self.props.user} />
{                  self.props.user && self.props.user.get('ownCommandCategories') ? self.props.user.get('ownCommandCategories').map(function(item, index) {
                      return(<OTB_CustomCategory userCommandCategory={item} index={index}  key={item.id || index} application={self.props.application} user={self.props.user} />);
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

export default OTB_CustomCategoryList;

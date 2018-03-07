// OTB_CustomCategorySection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_CustomCommandSection from './OTB_CustomCommandSection';

class OTB_CustomCategorySection extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           commandCategory: null,
           user: null,
           application: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <span className={"custom-category-section " + ""} style={self.props.style ||{}} >
{                  self.props.commandCategory && self.props.commandCategory.get('userCategoryCommands') ? self.props.commandCategory.get('userCategoryCommands').map(function(item, index) {
                      return(<OTB_CustomCommandSection userCommand={item} index={index}  key={item.id || index} application={self.props.application} user={self.props.user} />);
                  }) : ''}
               </span>
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

export default OTB_CustomCategorySection;

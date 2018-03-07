// OTB_CommandsPageContent React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_CommandSidebarCell from './OTB_CommandSidebarCell';
import OTB_CustomCategorySection from './OTB_CustomCategorySection';
import OTB_DefaultCategorySection from './OTB_DefaultCategorySection';
import OTB_DefaultVariablesSection from './OTB_DefaultVariablesSection';
import OTB_UserVariablesSection from './OTB_UserVariablesSection';
import OTB_CustomCommandSection from './OTB_CustomCommandSection';
import OTB_DefaultCommandSection from './OTB_DefaultCommandSection';
import OTB_DefaultFunctionCategorySection from './OTB_DefaultFunctionCategorySection';
import OTB_CustomFunctionCategorySection from './OTB_CustomFunctionCategorySection';
import OTB_CustomFunctionSection from './OTB_CustomFunctionSection';
import OTB_DefaultFunctionSection from './OTB_DefaultFunctionSection';

class OTB_CommandsPageContent extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           application: null
   };
   render() {
          
var self = this;
       var getCustomCommandArray = function(){
           var elementArray = [];
           {self.props.user && self.props.user.get('ownCommandCategories') ? self.props.user.get('ownCommandCategories').map(function(item, index) {
               {item && item.get('userCategoryCommands') ? item.get('userCategoryCommands').map(function(_item, _index) {
                   elementArray.push(<OTB_CustomCommandSection userCommand={_item} index={_index}  key={_item.id || _index} application={self.props.application} user={self.props.user} />);
               }) : ''}
           }) : ''}
           return elementArray;
       }
       var getDefaultCommandArray = function(){
           var elementArray = [];
           {self.props.application && self.props.application.get('appCommandCategories') ? self.props.application.get('appCommandCategories').map(function(item, index) {
               {item && item.get('appCategoryCommands') ? item.get('appCategoryCommands').map(function(_item, _index) {
                   elementArray.push(<OTB_DefaultCommandSection defaultCommand={_item} index={_index}  key={_item.id || _index} application={self.props.application} user={self.props.user} />);
               }) : ''}
           }) : ''}
           return elementArray;
       }
       var getCustomFunctionArray = function(){
           var elementArray = [];
           {self.props.user && self.props.user.get('ownFunctionCategories') ? self.props.user.get('ownFunctionCategories').map(function(item, index) {
               {item && item.get('userCategoryFunctions') ? item.get('userCategoryFunctions').map(function(_item, _index) {
                   elementArray.push(<OTB_CustomFunctionSection userFunction={_item} index={_index}  key={_item.id || _index} application={self.props.application} user={self.props.user} />);
               }) : ''}
           }) : ''}
           return elementArray;
       }
       var getDefaultFunctionArray = function(){
           var elementArray = [];
           {self.props.application && self.props.application.get('appFunctionCategories') ? self.props.application.get('appFunctionCategories').map(function(item, index) {
               {item && item.get('appCategoryFunctions') ? item.get('appCategoryFunctions').map(function(_item, _index) {
                   elementArray.push(<OTB_DefaultFunctionSection defaultFunction={_item} index={_index}  key={_item.id || _index} application={self.props.application} user={self.props.user} />);
               }) : ''}
           }) : ''}
           return elementArray;
       }
       if (true){ 
           return(
               <div className={"commands-page-content " + 'row'} style={self.props.style ||{"height": "100%", "width": "100%"}} >
                  <OTB_CommandSidebarCell application={self.props.application} user={self.props.user} />
                    {getCustomCommandArray().length > 0 ? getCustomCommandArray().map(function(item, index) {
                        return(item);
                    }) : ''}
                    {getDefaultCommandArray().length > 0 ? getDefaultCommandArray().map(function(item, index) {
                        return(item);
                    }) : ''}
                    {getCustomFunctionArray().length > 0 ? getCustomFunctionArray().map(function(item, index) {
                        return(item);
                    }) : ''}
                    {getDefaultFunctionArray().length > 0 ? getDefaultFunctionArray().map(function(item, index) {
                        return(item);
                    }) : ''}
                  <OTB_DefaultVariablesSection application={self.props.application} user={self.props.user} />
                  <OTB_UserVariablesSection application={self.props.application} user={self.props.user} />
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

export default OTB_CommandsPageContent;

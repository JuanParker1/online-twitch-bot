// OTB_CustomFunctionSection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_GeneralH1 from './OTB_GeneralH1';
import OTB_FunctionDescription from './OTB_FunctionDescription';
import OTB_FunctionVariables from './OTB_FunctionVariables';
import OTB_FunctionScript from './OTB_FunctionScript';
import OTB_ThinHR from './OTB_ThinHR';

class OTB_CustomFunctionSection extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           userFunction: null,
           application: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <span className={"custom-function-section " + 'cell auto-size padding20 page-panel panel-' + self.props.userFunction.id} style={self.props.style ||{}} >
                  <OTB_GeneralH1 title={self.props.userFunction.get('name') + " (" + self.props.userFunction.get('handler') + ")"} />
                  <OTB_ThinHR />
                  <OTB_FunctionDescription function={self.props.userFunction} />
                  <OTB_FunctionVariables application={self.props.application} function={self.props.userFunction} user={self.props.user} />
                  <OTB_ThinHR />
                  <OTB_GeneralH1 classes={'text-light'} title={'Function Script Editor'} />
                  <OTB_FunctionScript function={self.props.userFunction} user={self.props.user} />
               </span>
           );
       } else {
           return (<span />);
       }
   };
   componentDidMount() {
       $('.custom-function-section').hide();

   };
   componentWillUnmount() {
   };
}

export default OTB_CustomFunctionSection;
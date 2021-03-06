// OTB_FunctionDescription React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');

class OTB_FunctionDescription extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           function: null
   };
   render() {
       var self = this;
return(
    <div>
        <h1 className="text-light">Function Description <a onClick={self.FunctionUpdate} className="button"><span className="mif-pencil"></span></a></h1>
        {self.props.function && self.props.function.get('description') ? <p>{self.props.function.get('description')}</p> : <span />}
        <hr className="thin bg-grayLighter" />
    </div>
);
   };
   FunctionUpdate = () => {
       var Controller = require('../controller/OTB_Function');
       var self = this;
       Controller.Update({entity: self.props.function});
   };
   componentDidMount() {
   };
   componentWillUnmount() {
   };
}

export default OTB_FunctionDescription;

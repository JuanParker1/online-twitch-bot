// OTB_ShowMenuList React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');

class OTB_ShowMenuList extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           text: ''
   };
   render() {
       return(
    <a className="dropdown-toggle" href="#">{this.props.text}</a>
);
   };
   componentDidMount() {
   };
   componentWillUnmount() {
   };
}

export default OTB_ShowMenuList;

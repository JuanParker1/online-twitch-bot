// OTB_LPActivate React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_LevelsActive from './OTB_LevelsActive';
import OTB_PointsActive from './OTB_PointsActive';

class OTB_LPActivate extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <div className={"l-p-activate " + ""} style={self.props.style ||{}} >
                  <OTB_LevelsActive user={self.props.user} />
                  <OTB_PointsActive user={self.props.user} />
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

export default OTB_LPActivate;
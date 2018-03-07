// OTB_PlaylistPageContent React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import OTB_PlaylistHistory from './OTB_PlaylistHistory';
import OTB_PlaylistQueue from './OTB_PlaylistQueue';

class OTB_PlaylistPageContent extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           user: null,
           application: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <div className={"playlist-page-content " + 'row align-center'} style={self.props.style ||{"height": "100%", "width": "100%"}} >
                  {(self.props.user) ? <OTB_PlaylistHistory user={self.props.user} /> : <span />}
                  {(self.props.user) ? <OTB_PlaylistQueue user={self.props.user} /> : <span />}
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

export default OTB_PlaylistPageContent;

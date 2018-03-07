// OTB_UserCommandsPage React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import { FirebaseManager } from '../../../js/4-infrastructure/databaseManagers/FirebaseManager';
import OTB_UserCommandsPageContent from './OTB_UserCommandsPageContent';

class OTB_UserCommandsPage extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           user: null
       };
   };
   static defaultProps = {
           application: null
   };
   render() {
       var self = this;
       if (true){ 
           return(
               <div className={"page user-commands-page " + 'flex-grid page-content'} style={self.props.style ||{"height": "100%"}} >
                  {(self.state.user && self.props.application) ? <OTB_UserCommandsPageContent application={self.props.application} user={self.state.user} /> : <span />}
               </div>
           );
       } else {
           return (<span />);
       }
   };
   componentDidMount() {
       DomainAPI.OTB_UserConnect(this, 'user');
       var self = this;

        var username = self.props.match.params.username.toLowerCase();
        var ref =firebase.database().ref("OTB_User/");

        ref.once("value", function (snapshot) {
            var data = snapshot.val();
            _.each(data, function(obj, key){
                var attributes = obj['attributes'];
                if(attributes['displayName'].toLowerCase() == username){
                    var id = attributes['id'];
                    DomainAPI.OTB_UserLoadItem(id);
                }
            });
        });
   };
   componentWillUnmount() {
       DomainAPI.OTB_UserDisconnect(this);
   };
}

export default withRouter(OTB_UserCommandsPage);
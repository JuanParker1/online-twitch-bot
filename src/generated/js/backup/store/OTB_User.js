// OTB_User ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import {ItemStore} from '../../../js/3-domain/stores/meta/ItemStore';
var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_User} from '../domain-entity/OTB_User';
import * as _ from 'lodash';

module.exports = function(spec, my) {
   var that;
   my = my || {};
   spec = spec || {};

   that = ItemStore(_.extend({
       Entity: OTB_User
   }, spec));
   that.init = function() {
       var self = this;
var User = new OTB_User();
var fetchUser = User.getCurrentUser();
$.when(fetchUser).done(function(user) {
    if (user) {
        self.item = user;
        self.item.syncInstance(OTB_User, user.id, function(item) {
            self.item= item;
            if (item) {
                self.item.id = user.id;
            }
            self.trigger(self.item);
        });
    }
});
   };
   that.LogOut = function() {
       var self = this;
var fetchUser = new OTB_User().handleLogOut();
$.when(fetchUser).done(function() {
    self.item = null;
    self.trigger(self.item);
});
   };
   that.connectAPI([
       [DomainAPI.OTB_UserConnect, 'onConnect'],
       [DomainAPI.OTB_UserDisconnect, 'onDisconnect'],
       [DomainAPI.OTB_UserCreate, 'onCreate'],
       [DomainAPI.OTB_UserUpdate, 'onUpdate'],
       [DomainAPI.OTB_UserDelete, 'onDelete'],
       [DomainAPI.OTB_UserGet, 'onGet'],
       [DomainAPI.OTB_UserLoadItem, 'onLoadItem'],
       [DomainAPI.OTB_UserRefresh, 'onRefresh'],
       [DomainAPI.OTB_Userinit, 'init'],
       [DomainAPI.OTB_UserLogOut, 'LogOut']
   ]);

   return that;
};


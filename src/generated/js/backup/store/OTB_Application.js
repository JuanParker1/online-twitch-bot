// OTB_Application ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import {ItemStore} from '../../../js/3-domain/stores/meta/ItemStore';
var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_Application} from '../domain-entity/OTB_Application';
import * as _ from 'lodash';

module.exports = function(spec, my) {
   var that;
   my = my || {};
   spec = spec || {};

   that = ItemStore(_.extend({
       Entity: OTB_Application
   }, spec));
   that.init = function() {
       var self = this;
var Application = new OTB_Application();
Application.loadInstance(OTB_Application, 'vp-test-website', function(application) {
    if (application) {
        self.item = application;
        self.item.syncInstance(OTB_Application, 'vp-test-website', function(item) {
            self.item = item;
            self.trigger(self.item);
        });
    }
});
   };
   that.connectAPI([
       [DomainAPI.OTB_ApplicationConnect, 'onConnect'],
       [DomainAPI.OTB_ApplicationDisconnect, 'onDisconnect'],
       [DomainAPI.OTB_ApplicationCreate, 'onCreate'],
       [DomainAPI.OTB_ApplicationUpdate, 'onUpdate'],
       [DomainAPI.OTB_ApplicationDelete, 'onDelete'],
       [DomainAPI.OTB_ApplicationGet, 'onGet'],
       [DomainAPI.OTB_ApplicationLoadItem, 'onLoadItem'],
       [DomainAPI.OTB_ApplicationRefresh, 'onRefresh'],
       [DomainAPI.OTB_Applicationinit, 'init']
   ]);

   return that;
};


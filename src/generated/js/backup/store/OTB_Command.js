// OTB_Command ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import {ItemStore} from '../../../js/3-domain/stores/meta/ItemStore';
var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_Command} from '../domain-entity/OTB_Command';
import * as _ from 'lodash';

module.exports = function(spec, my) {
   var that;
   my = my || {};
   spec = spec || {};

   that = ItemStore(_.extend({
       Entity: OTB_Command
   }, spec));
   that.connectAPI([
       [DomainAPI.OTB_CommandConnect, 'onConnect'],
       [DomainAPI.OTB_CommandDisconnect, 'onDisconnect'],
       [DomainAPI.OTB_CommandCreate, 'onCreate'],
       [DomainAPI.OTB_CommandUpdate, 'onUpdate'],
       [DomainAPI.OTB_CommandDelete, 'onDelete'],
       [DomainAPI.OTB_CommandGet, 'onGet'],
       [DomainAPI.OTB_CommandLoadItem, 'onLoadItem'],
       [DomainAPI.OTB_CommandRefresh, 'onRefresh']
   ]);

   return that;
};



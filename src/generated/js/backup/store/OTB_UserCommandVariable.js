// OTB_UserCommandVariable ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import {ItemStore} from '../../../js/3-domain/stores/meta/ItemStore';
var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_UserCommandVariable} from '../domain-entity/OTB_UserCommandVariable';
import * as _ from 'lodash';

module.exports = function(spec, my) {
   var that;
   my = my || {};
   spec = spec || {};

   that = ItemStore(_.extend({
       Entity: OTB_UserCommandVariable
   }, spec));
   that.connectAPI([
       [DomainAPI.OTB_UserCommandVariableConnect, 'onConnect'],
       [DomainAPI.OTB_UserCommandVariableDisconnect, 'onDisconnect'],
       [DomainAPI.OTB_UserCommandVariableCreate, 'onCreate'],
       [DomainAPI.OTB_UserCommandVariableUpdate, 'onUpdate'],
       [DomainAPI.OTB_UserCommandVariableDelete, 'onDelete'],
       [DomainAPI.OTB_UserCommandVariableGet, 'onGet'],
       [DomainAPI.OTB_UserCommandVariableLoadItem, 'onLoadItem'],
       [DomainAPI.OTB_UserCommandVariableRefresh, 'onRefresh']
   ]);

   return that;
};


// OTB_Repository ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import {ItemStore} from '../../../js/3-domain/stores/meta/ItemStore';
var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_Repository} from '../domain-entity/OTB_Repository';
import * as _ from 'lodash';

module.exports = function(spec, my) {
   var that;
   my = my || {};
   spec = spec || {};

   that = ItemStore(_.extend({
       Entity: OTB_Repository
   }, spec));
   that.connectAPI([
       [DomainAPI.OTB_RepositoryConnect, 'onConnect'],
       [DomainAPI.OTB_RepositoryDisconnect, 'onDisconnect'],
       [DomainAPI.OTB_RepositoryCreate, 'onCreate'],
       [DomainAPI.OTB_RepositoryUpdate, 'onUpdate'],
       [DomainAPI.OTB_RepositoryDelete, 'onDelete'],
       [DomainAPI.OTB_RepositoryGet, 'onGet'],
       [DomainAPI.OTB_RepositoryLoadItem, 'onLoadItem'],
       [DomainAPI.OTB_RepositoryRefresh, 'onRefresh']
   ]);

   return that;
};



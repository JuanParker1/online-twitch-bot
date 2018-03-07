// OTB_QueueVideo ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import {ItemStore} from '../../../js/3-domain/stores/meta/ItemStore';
var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_QueueVideo} from '../domain-entity/OTB_QueueVideo';
import * as _ from 'lodash';

module.exports = function(spec, my) {
   var that;
   my = my || {};
   spec = spec || {};

   that = ItemStore(_.extend({
       Entity: OTB_QueueVideo
   }, spec));
   that.connectAPI([
       [DomainAPI.OTB_QueueVideoConnect, 'onConnect'],
       [DomainAPI.OTB_QueueVideoDisconnect, 'onDisconnect'],
       [DomainAPI.OTB_QueueVideoCreate, 'onCreate'],
       [DomainAPI.OTB_QueueVideoUpdate, 'onUpdate'],
       [DomainAPI.OTB_QueueVideoDelete, 'onDelete'],
       [DomainAPI.OTB_QueueVideoGet, 'onGet'],
       [DomainAPI.OTB_QueueVideoLoadItem, 'onLoadItem'],
       [DomainAPI.OTB_QueueVideoRefresh, 'onRefresh']
   ]);

   return that;
};



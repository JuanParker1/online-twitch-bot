// OTB_Function ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import { ItemStore } from '../../../js/3-domain/stores/meta/ItemStore';
import { OTB_Function } from '../domain-entity/OTB_Function';
import * as _ from 'lodash';

module.exports = function(spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    that = ItemStore(_.extend({
        Entity: OTB_Function
    }, spec));
    that.connectAPI([
        [DomainAPI.OTB_FunctionConnect, 'onConnect'],
        [DomainAPI.OTB_FunctionDisconnect, 'onDisconnect'],
        [DomainAPI.OTB_FunctionCreate, 'onCreate'],
        [DomainAPI.OTB_FunctionUpdate, 'onUpdate'],
        [DomainAPI.OTB_FunctionDelete, 'onDelete'],
        [DomainAPI.OTB_FunctionGet, 'onGet'],
        [DomainAPI.OTB_FunctionLoadItem, 'onLoadItem'],
        [DomainAPI.OTB_FunctionRefresh, 'onRefresh']
    ]);

    return that;
};


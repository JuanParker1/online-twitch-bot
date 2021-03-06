// OTB_DefaultCommand ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import { ItemStore } from '../../../js/3-domain/stores/meta/ItemStore';
import { OTB_DefaultCommand } from '../domain-entity/OTB_DefaultCommand';
import * as _ from 'lodash';

module.exports = function(spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    that = ItemStore(_.extend({
        Entity: OTB_DefaultCommand
    }, spec));
    that.connectAPI([
        [DomainAPI.OTB_DefaultCommandConnect, 'onConnect'],
        [DomainAPI.OTB_DefaultCommandDisconnect, 'onDisconnect'],
        [DomainAPI.OTB_DefaultCommandCreate, 'onCreate'],
        [DomainAPI.OTB_DefaultCommandUpdate, 'onUpdate'],
        [DomainAPI.OTB_DefaultCommandDelete, 'onDelete'],
        [DomainAPI.OTB_DefaultCommandGet, 'onGet'],
        [DomainAPI.OTB_DefaultCommandLoadItem, 'onLoadItem'],
        [DomainAPI.OTB_DefaultCommandRefresh, 'onRefresh']
    ]);

    return that;
};


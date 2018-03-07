// OTB_DefaultCommandCategory ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import { ItemStore } from '../../../js/3-domain/stores/meta/ItemStore';
import { OTB_DefaultCommandCategory } from '../domain-entity/OTB_DefaultCommandCategory';
import * as _ from 'lodash';

module.exports = function(spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    that = ItemStore(_.extend({
        Entity: OTB_DefaultCommandCategory
    }, spec));
    that.connectAPI([
        [DomainAPI.OTB_DefaultCommandCategoryConnect, 'onConnect'],
        [DomainAPI.OTB_DefaultCommandCategoryDisconnect, 'onDisconnect'],
        [DomainAPI.OTB_DefaultCommandCategoryCreate, 'onCreate'],
        [DomainAPI.OTB_DefaultCommandCategoryUpdate, 'onUpdate'],
        [DomainAPI.OTB_DefaultCommandCategoryDelete, 'onDelete'],
        [DomainAPI.OTB_DefaultCommandCategoryGet, 'onGet'],
        [DomainAPI.OTB_DefaultCommandCategoryLoadItem, 'onLoadItem'],
        [DomainAPI.OTB_DefaultCommandCategoryRefresh, 'onRefresh']
    ]);

    return that;
};


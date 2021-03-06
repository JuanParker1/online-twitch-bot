// OTB_UserFunctionCategory ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import { ItemStore } from '../../../js/3-domain/stores/meta/ItemStore';
import { OTB_UserFunctionCategory } from '../domain-entity/OTB_UserFunctionCategory';
import * as _ from 'lodash';

module.exports = function(spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    that = ItemStore(_.extend({
        Entity: OTB_UserFunctionCategory
    }, spec));
    that.connectAPI([
        [DomainAPI.OTB_UserFunctionCategoryConnect, 'onConnect'],
        [DomainAPI.OTB_UserFunctionCategoryDisconnect, 'onDisconnect'],
        [DomainAPI.OTB_UserFunctionCategoryCreate, 'onCreate'],
        [DomainAPI.OTB_UserFunctionCategoryUpdate, 'onUpdate'],
        [DomainAPI.OTB_UserFunctionCategoryDelete, 'onDelete'],
        [DomainAPI.OTB_UserFunctionCategoryGet, 'onGet'],
        [DomainAPI.OTB_UserFunctionCategoryLoadItem, 'onLoadItem'],
        [DomainAPI.OTB_UserFunctionCategoryRefresh, 'onRefresh']
    ]);

    return that;
};


// OTB_UserPlaylistSettings ItemStore
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var CollectionStore = require('../../../js/3-domain/stores/meta/CollectionStore');
var DomainAPI = require('../domain-entity/DomainAPI');
import { ItemStore } from '../../../js/3-domain/stores/meta/ItemStore';
import { OTB_UserPlaylistSettings } from '../domain-entity/OTB_UserPlaylistSettings';
import * as _ from 'lodash';

module.exports = function(spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    that = ItemStore(_.extend({
        Entity: OTB_UserPlaylistSettings
    }, spec));
    that.connectAPI([
        [DomainAPI.OTB_UserPlaylistSettingsConnect, 'onConnect'],
        [DomainAPI.OTB_UserPlaylistSettingsDisconnect, 'onDisconnect'],
        [DomainAPI.OTB_UserPlaylistSettingsCreate, 'onCreate'],
        [DomainAPI.OTB_UserPlaylistSettingsUpdate, 'onUpdate'],
        [DomainAPI.OTB_UserPlaylistSettingsDelete, 'onDelete'],
        [DomainAPI.OTB_UserPlaylistSettingsGet, 'onGet'],
        [DomainAPI.OTB_UserPlaylistSettingsLoadItem, 'onLoadItem'],
        [DomainAPI.OTB_UserPlaylistSettingsRefresh, 'onRefresh']
    ]);

    return that;
};

var _ = require('underscore');
var ProjectStore = require('./ProjectStore');
var TemplateProjectEntity = require('../model/TemplateProjectEntity');
var DomainAPI = require('../DomainAPI');

var Collection = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = ProjectStore.Collection(_.extend({
        Entity: TemplateProjectEntity,
    }, spec));
    that.connectAPI([
        [DomainAPI.connectTemplateProjects, 'onConnect'],
        [DomainAPI.disconnectTemplateProjects, 'onDisconnect'],
        [DomainAPI.createTemplateProject, 'onCreateItem'],
        [DomainAPI.saveTemplateProject, 'onSaveItem'],
        [DomainAPI.removeTemplateProject, 'onRemoveItem'],
        [DomainAPI.refreshTemplateProjects, 'onRefresh']
    ]);
    return that;
};

var Item = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = ProjectStore.Item({
        Entity: TemplateProjectEntity,
    });
    that.connectAPI([
        [DomainAPI.connectTemplateProject, 'onConnect'],
        [DomainAPI.disconnectTemplateProject, 'onDisconnect'],
        [DomainAPI.selectTemplateProject, 'onLoadItem'],
        [DomainAPI.unselectTemplateProject, 'onClearItem'],
        [DomainAPI.createStep, 'onCreateStep']
    ]);
    return that;
};

module.exports = {
    Collection: Collection,
    Item: Item
};
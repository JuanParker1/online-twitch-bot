var _ = require('underscore');
var ProjectStore = require('./ProjectStore');
var UserProjectEntity = require('../model/UserProjectEntity');
var DomainAPI = require('../DomainAPI');

var Collection = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = ProjectStore.Collection(_.extend({
        Entity: UserProjectEntity,
        onCreateUserProjectFromTemplate: function(projectData, relations, template) {
            var item = that.onCreateItem(projectData, relations);
            var userProject = _.extend(item, {composites: template.composites});
            that.onSaveItem(userProject);
        } 
    }, spec));
    that.connectAPI([
        [DomainAPI.connectUserProjects, 'onConnect'],
        [DomainAPI.disconnectUserProjects, 'onDisconnect'],
        [DomainAPI.createUserProject, 'onCreateItem'],
        [DomainAPI.createUserProjectFromTemplate, 'onCreateUserProjectFromTemplate'],
        [DomainAPI.saveUserProject, 'onSaveItem'],
        [DomainAPI.removeUserProject, 'onRemoveItem'],
        [DomainAPI.refreshUserProjects, 'onRefresh']
    ]);
    return that;
};

var Item = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = ProjectStore.Item(_.extend({
        Entity: UserProjectEntity,
    }, spec));
    that.connectAPI([
        [DomainAPI.connectUserProject, 'onConnect'],
        [DomainAPI.disconnectUserProject, 'onDisconnect'],
        [DomainAPI.selectUserProject, 'onLoadItem'],
        [DomainAPI.unselectUserProject, 'onClearItem']
    ]);
    return that;
};

module.exports = {
    Collection: Collection,
    Item: Item
};
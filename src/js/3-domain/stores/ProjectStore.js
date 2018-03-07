var _ = require('underscore');
var CollectionStore = require('./meta/CollectionStore');
var ItemStore = require('./meta/ItemStore');
var ProjectEntity = require('../model/ProjectEntity');
var StepEntity = require('../model/StepEntity');
var DomainAPI = require('../DomainAPI');
var getToolElementConnectors = require('../../tools/getToolElementConnectors');

var Collection = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
     
    that = CollectionStore(_.extend({
        Entity: ProjectEntity,
    }, spec));
    return that;
};
var Item = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = ItemStore(_.extend({
        Entity: ProjectEntity,
        onCreateStep: function(stepData) {
            if (this.item) {
                var step = StepEntity();
                step.setValues(stepData);
                this.item.composites.steps.push(step);
                this.item.updateInstance();
            }
        },
        onCreateToolElement: function(ToolElementEntity, toolElementData, user) {
            if (this.item) {
                var toolElement = ToolElementEntity();
                toolElement.setValues(toolElementData);
                toolElement.set('owner', user); 
                this.item.composites.toolElements.push(toolElement);
                this.item.updateInstance();
            }
        },
        onSaveToolElement: function(toolElement) {
            if (this.item) {
                this.item.composites.toolElements = _.reject(this.item.composites.toolElements, function(te) { return te.id === toolElement.id; });
                this.item.composites.toolElements.push(toolElement);
                this.item.updateInstance();
            }
        },
        onRemoveToolElement: function(toolElementId) {
            if (this.item) {
                this.item.composites.toolElements = _.reject(this.item.composites.toolElements, function(toolElement) { return toolElement.id === toolElementId; });
                this.item.updateInstance();
            }
        }
    }, spec));
    setTimeout(function() {
        that.connectAPI(getToolElementConnectors());
    }, 10); 
    return that;
};

module.exports = { 
    Collection: Collection,
    Item: Item
};
var Reflux = require('reflux');
var _ = require('underscore');
var EntityFactory = require('../../factories/EntityFactory');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = Reflux.createStore(_.extend({
        Entity: spec.Entity || require('../../meta/Entity'),
        parameters: spec.parameters || {},
        listenables: spec.listenables || Reflux.createActions(['saveItem', 'removeItem']),
        items: spec.items || {},
        selectedItem: null,
        init: spec.init || function() {
            // this.connectAPI();
            this.getDefaultData();
        },
        connectAPI: function(API) {
            var self = this;
            _.each(API, function(APIAction) {
                self.listenTo(APIAction[0], APIAction[1]);   
            });
        },
        onConnect: function(component, statusItem) {
            component.unsubscribe = that.listen(function(items) {
                var stateObject = {};
                stateObject[statusItem] = items;
                if (component.isMounted()) {
                    component.setState(stateObject);
                }
            });
            this.trigger(_.values(this.items));
        },
        onDisconnect: function(component) {
            component.unsubscribe();
        },
        onCreateItem: spec.onCreateItem || function(values, relations) {
            var newItem = EntityFactory().createNew(this.Entity, values, relations);
            this.onSaveItem(newItem);
            return newItem;
        },
        onSaveItem: spec.onSaveItem || function(item) {
            if (item && item.type === this.Entity().type) {
                var foundItem = this.items[item.id];
                if (item.isPersistent) {
                    if (foundItem) {
                        item.updateInstance();
                    } else {
                        item.createInstance();
                    }
                }
                this.items[item.id] = item;
                this.updateItems();
                return item;
            }
        },
        addItem: spec.addItem || function(item) {
            if (item && item.type === this.Entity().type) {
                this.items[item.id] = item;
                this.updateItems();
            }
        },
        onRemoveItem: spec.onDeleteItem || function(itemId) {
            var foundItem = this.items[itemId];
            if (foundItem && foundItem.type === this.Entity().type) {
                if (foundItem.isPersistent) { 
                    foundItem.deleteInstance();
                }
                delete this.items[itemId];
                this.updateItems();
            }
        },
        onGetItems: function() {
            return this.items;
        },
        onRefresh: function() {
            this.trigger(_.values(this.items));
        },
        updateItems: function() {
            this.trigger(_.values(this.items));
        },
        onLoadItems: function(items) {
            this.items = items;
            this.trigger(_.values(this.items));
        },
        getDefaultData:  function() {
            var self = this;
            self.Entity().syncInstances(self.Entity, function(items) { self.onLoadItems(items); });
        }
    }, spec));
    return that;
};

// ItemStore

var Reflux = require('reflux');
var _ = require('underscore');
import {Entity} from '../../meta/Entity';

export function ItemStore(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = Reflux.createStore(_.extend({
        Entity: spec.Entity || Entity,
        listenables: spec.listenables || Reflux.createActions(['loadItem', 'clearItem']),
        item: spec.item || null,
        init: spec.init || function() {
            var self = this;
            self.item = null;
            self.connectAPI();
        },
        mustResync: true,
        connectAPI: function(API) {
            var self = this;
            _.each(API, function(APIAction) {
                if (APIAction && APIAction[0] && APIAction[1]) {
                    var method = self[APIAction[1]] || self['on' + APIAction[1]];
                    if (method) {
                        self.listenTo(APIAction[0], method);
                    } else {
                        console.log('API method not found');
                    }
                } else {
                    console.log('Wrong API connector' + APIAction);
                }
            });
        },
        onConnect: function(component, statusItem, itemId) {
            var self = this;
            self.mustResync = true;
            component.unsubscribe = that.listen(function(item) {
                if (Array.isArray(item) && item.length === 0) { item = null; }
                var stateObject = {};
                stateObject[statusItem] = item;
                component.setState(stateObject);
            }, component);
            if (self.item) {
                self.trigger(self.item);
            }
            if (itemId) {
                self.onLoadItem(itemId);
            }
        },
        onDisconnect: function(component) {
            component.unsubscribe();
        },
        onLoadItem: function(itemId, user) {
            var self = this;
            var _Entity = new self.Entity();
            if (self.mustResync || !self.item || !self.item.id || self.item.id !== itemId) {
                _Entity.syncInstance(self.Entity, itemId, function(i) { self.onItemLoaded(i); }, user);
                self.mustResync = false;
            }
            self.trigger(self.item);
        },
        onItemLoaded: function(item) {
            var self = this;
            self.item = item;
            self.trigger(self.item);
        },
        onClearItem: function() {
            var self = this;
            self.item = null;
            self.trigger(self.item);
        },
        onCreate: function(values, user, onSuccess) {
            var self = this;
            var Entity = new self.Entity();
            self.item = Entity._new(values, user, onSuccess);
            self.trigger(this.item);
        },
        onUpdate: function(item, values, user, onSuccess) {
            var self = this;
            self.item = item.update(values, user, onSuccess);
            self.trigger(self.item);
        },
        onDelete: function(item, user, onSuccess) {
            var self = this;
            item.delete(user, onSuccess);
            self.onClearItem();
        },
        onRefresh: function() {
            var self = this;
            self.trigger(self.item);
        },
        onGet: function(item) {
            var self = this;
            item = self.item;
        }
    }, spec));
    return that;
};

// Entity DomainEntity

var helpers = require('../../../../server/helpers');
import * as _ from 'lodash';
var FirebaseManager = require('../../4-infrastructure/databaseManagers/FirebaseManager')();
var Attribute = require('./Attribute');
import * as $ from 'jquery';

export function Entity(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {}; 
    
    that = _.extend({
        DatabaseManager: spec.DatabaseManager || FirebaseManager,
        parentEntity: spec.parentEntity || null,
        getFactory: spec.getFactory || function() {},
        loadStatus: spec.loadStatus || 'proxy', // ['proxy', 'full']
        isPersistent: spec.isPersistent || false,
        id: (spec && spec.id) ? spec.id : '',
        type: spec.type ? spec.type.toCamel() : 'Entity',
        hasUrl: spec.hasUrl || false,
        url: spec.url || '',
        details: spec.details || false,
        parentId: spec.parentId || '',
        label: spec.label || '',
        description: spec.description || '',
        iconUrl: spec.iconUrl || '',
        composites: spec.composites || {},
        validate: spec.validate || function() { return false; },
        help: spec.help || '',
        attributes: {
            id: Attribute.TextAttribute({
                name: 'id',
                label: 'ID',
                description: '',
                visibility: 'Public'
            }),
            entityLocation: Attribute.TextAttribute({
                name: 'entityLocation',
                label: 'entityLocation',
                description: '',
                visibility: 'Public'
            }),
            entityType: Attribute.TextAttribute({
                name: 'entityType',
                label: 'entityType',
                description: '',
                visibility: 'Public'
            })
        },
        associations: {},
        //EntityType: function() {
        //    return require('./domain-entity/' + that.type);
        //},
        new: function(values, user, onSuccess) {
            that.setValues(values);
            that.createInstance(user, onSuccess);
            return that;
        },
        update: function(values, user, onSuccess) {
            that.setValues(values);
            that.updateInstance(user, onSuccess);
            return that;
        },
        delete: function(user, onSuccess) {
            that.deleteInstance(user, onSuccess);
        },
        getValues: function(user) {
            var valuesObject = {};
            _.each(_.values(that.attributes), function(attribute) {
                valuesObject[attribute.name] = attribute.get(user);
            });
            _.each(_.values(that.associations), function(association) {
                valuesObject[association.thisName] = association;
            });
            return valuesObject;
        },
        getAttributeValues: function(user) {
            var valuesObject = {};
            _.each(_.values(that.attributes), function(attribute) {
                valuesObject[attribute.name] = attribute.get(user);
            });
            return valuesObject;
        },
        getPublicValues: function(user) {
            var valuesObject = {};
            _.each(_.filter(_.values(that.attributes), function(attribute) { return attribute.visibility === 'Public'; }), function(attribute) {
                valuesObject[attribute.name] = attribute.get(user);
            });
            return valuesObject;
        },
        getProtectedValues: function() {
            var valuesObject = {};
            _.each(_.filter(_.values(that.attributes), function(attribute) { return attribute.visibility === 'Protected'; }), function(attribute) {
                valuesObject[attribute.name] = attribute.get();
            });
            return valuesObject;
        },
        getPrivateValues: function() {
            var valuesObject = {};
            _.each(_.filter(_.values(that.attributes), function(attribute) { return attribute.visibility === 'Private'; }), function(attribute) {
                valuesObject[attribute.name] = attribute.get();
            });
            return valuesObject;
        },
        hasChanged: function() {
            var changed = false;
            _.each(_.values(that.attributes), function(attribute) {
                if (attribute.hasChanged()) {
                    changed = true;
                }
            });
            if (!changed) {
                _.each(_.values(that.associations), function(association) {
                    if (association.hasChanged()) {
                        changed = true;
                    }
                });
            }
            return changed;
        },
        hasUserInput: function(fieldName) {
            var attribute = _.find(_.values(that.attributes), function(attribute) { return attribute.name === fieldName; });
            if (attribute) {
                return attribute.hasUserInput();
            }
            return false;
        },
        get: function(fieldName, user) {
            var attribute = _.find(_.values(that.attributes), function(attribute) { return attribute.name === fieldName; });
            if (attribute) {
                return attribute.get(user);
            } else {
                var association = _.find(_.values(that.associations), function(association) { return association.thisName === fieldName; });
                if (association) {
                    if (association.value) {
                        return association.value;
                    } else {
                        if (association.thatCardinality === 'multiple') {
                            return [];
                        } else {
                            return {};
                        }
                    }
                } else {
                    if (this['get' + fieldName.capitalize()]) {
                        return this['get' + fieldName.capitalize()](user);
                    }
                }
            }
            return null;
        },
        setValues: function(valuesObject, user, setPersistent) {
            _.each(_.keys(valuesObject), function(fieldName) {
                that.set(fieldName, valuesObject[fieldName], user, setPersistent);
            });
            return that;
        },
        resetValues: function() {
            _.each(_.values(that.attributes), function(attribute) {
                that.set(attribute.name, null);
            });
            _.each(_.values(that.associations), function(association) {
                that.set(association.name, null);
            });
            return that;
        },
        set: function(fieldName, value, user, setPersistent) {
            var locationChanged = false;
            if (fieldName === 'id') {
                that.id = value;
                locationChanged = true;
            }
            var attribute = _.find(_.values(that.attributes), function (attribute) {
                return attribute.name === fieldName;
            });
            if (attribute) {
                attribute.set(value, user, setPersistent);
            } else {
                var association = _.find(_.values(that.associations), function (association) {
                    return association.thisName === fieldName;
                });
                if (association) {
                    if (association.thatCardinality === 'multiple') {
                        if (Array.isArray(value)) {
                            association.value = _.values(value);
                        } else {
                            if (value.value && Array.isArray(value.value)) {
                                association.value = _.values(value.value);
                            }
                        }
                        if (setPersistent) {
                            association.persistentValue = [].concat(association.value);
                        }
                    } else {
                        association.value = value;
                        if (setPersistent) {
                            association.persistentValue = _.extend({}, association.value);
                        }
                    }
                    if (association.thatIsComposite) {
                        locationChanged = true;
                    }
                } else {
                    if (this['set' + fieldName.capitalize()]) {
                        this['set' + fieldName.capitalize()](value, user, setPersistent);
                    }
                }
            }
            if (locationChanged) {
                //that.setLocation();
            }
            return that;
        },
        add: function(fieldName, value, setPersistent) {
            var association = _.find(_.values(that.associations), function (association) {
                return association.thisName === fieldName;
            });
            if (value && value.id && association && association.thatCardinality === 'multiple') {
                if (_.pluck(association.value, 'id').indexOf(value.id) === -1) {
                    association.value.push(value);
                    if (setPersistent) {
                        association.persistentValue.push(value);
                    }
                } else {
                    var item = _.find(association.value, function(i) { return i.id === value.id; });
                    if (item) {
                        item.setValues(value.getValues(), null, setPersistent);
                    }
                }
            }
            return that;
        },
        delete: function(user) {
            that.deleteInstance(user);
            return that;
        },
        remove: function(fieldName, value, setPersistent) {
            if (!fieldName && !value && !setPersistent) {
                that.deleteInstance();
            }
            var association = _.find(_.values(that.associations), function (association) {
                return association.thisName === fieldName;
            });
            if (value && value.id && association && association.thatCardinality === 'multiple') {
                association.value = _.filter(association.value, function(v) { return v.id !== value.id });
                if (setPersistent) {
                    association.persistentValue = _.filter(association.persistentValue, function(v) { return v.id !== value.id });
                }
            }
            return that;
        },
        getDuplicate: function(fieldName) {
            if (!fieldName) {
                var duplicate = _.extend({}, that);
                _.each(duplicate.attributes, function(attribute) { attribute.resetPersistentValue(); });
                _.each(duplicate.associations, function(association) { association.resetPersistentValue(); });
                _.each(_.filter(that.associations, function(association) { return association.thisIsComposite; }), function(composite) {
                    duplicate.set(composite.thisName, composite.getDuplicate());
                });
                duplicate.set('entityLocation', null);
                return duplicate;
            } else {
                var composite = _.find(that.associations, function(association) { return association.thisIsComposite && association.thisName === fieldName; });
                if (composite) {
                    return composite.getDuplicate();
                } else {
                    return that.get(fieldName);
                }
            }
        },
        getAssociations: function() {
            var self = this;
            //var DomainModel = require('../model/DomainModel');
            //var Entity = DomainModel.getEntityType(that.type);
            //var Entityassociations = _.filter(DomainModel.associations, function(association) { return association().type === 'association' && (association().fromEntity === Entity || association().toEntity === Entity); });
            var associations = _.values(self.associations);
            //var SuperTypes = self.getSuperTypes();
            //_.each(SuperTypes, function(SuperType) { associations = associations.concat(SuperType().getAssociations()); });
            return associations;
        },
        loadUserValues: function(user) {
            var defer = $.Deferred();
            var groupInputAttributes = _.filter(_.values(that.attributes), function(attribute) { return attribute.isGroupInput; });
            if (groupInputAttributes.length > 0) {
                var counter = 0;
                _.each(groupInputAttributes, function(attribute) {
                    var attributeFetch = attribute.getUserInput(user);
                    $.when(attributeFetch).done(function() {
                        counter += 1;
                        if (counter === groupInputAttributes.length) {
                            defer.resolve();                        
                        }
                    });
                });
            } else {
                defer.resolve();
            }
            return defer.promise();
        },
        //loadInstances: function(entityType, onLoadItems) {
        //    that.DatabaseManager.loadItems(entityType, function(items) { onLoadItems(items); });
        //},
        loadInstance: function(entityType, id, onLoadItem, user) {
            that.id = id;
            var userId = user ? user.id : null;
            that.DatabaseManager.loadItem(entityType, that.getLocation(), function(item) {
                if (item) {
                    item.loadStatus = 'full';
                }
                onLoadItem(item); 
            }, userId);
        },
        //syncInstances: function(entityType, onSyncItems) {
        //    that.DatabaseManager.syncItems(entityType, function(items) { onSyncItems(items); });
        //},
        syncInstance: function(entityType, id, onSyncItem, user, useDefer) {
            that.id = id;
            var userId = user ? user.id : null;
            that.DatabaseManager.syncItem(entityType, that.getLocation(), function(item) {
                if (item) {
                    item.loadStatus = 'full';
                }
                onSyncItem(item); 
            }, userId, useDefer);
        },
        getLocation: function() {
            if (that.get('entityLocation')) {
                return that.get('entityLocation');
            } else {

                var ownerPath = '';
                var ownerAssociation = _.find(that.associations, function (association) {
                    return association.thatIsComposite && association.value && association.value.id;
                });
                if (ownerAssociation) {
                    ownerPath = ownerAssociation.value.getLocation() + 'associations/' + ownerAssociation.thatName + '/';
                } else {
                    ownerPath = that.type + '/';
                }
                return ownerPath + that.id + '/';
            }
        },
        setLocation: function() {
            var ownerPath = '';
            var ownerAssociation = _.find(that.associations, function (association) {
                return association.thatIsComposite && association.value && association.value.id;
            });
            if (ownerAssociation) {
                ownerPath = ownerAssociation.value.getLocation() + 'associations/' + ownerAssociation.thatName + '/';
            } else {
                ownerPath = that.type + '/';
            }
            that.set('entityLocation', ownerPath + that.id + '/');
        },
        createInstance: function(user, onSuccess) {
            var userId = user ? user.id : null;
            var defer = $.Deferred();
            if (that.attributes.timestampCreate) {
                that.set('timestampCreate', new Date());
            }
            var createItem = that.DatabaseManager.createItem(that, userId);
            $.when(createItem).done(function (item) {
                onSuccess = onSuccess || function(){};
                onSuccess(item);
                defer.resolve(item);
            });
            return defer.promise();
        },
        updateInstance: function(user, onSuccess) {
            var userId = user ? user.id : null;
            var defer = $.Deferred();
            if (that.attributes.timestampLastUpdate) {
                that.set('timestampLastUpdate', new Date());
            }
            var updateItem = that.DatabaseManager.updateItem(that, userId);
            $.when(updateItem).done(function(item) {
                onSuccess = onSuccess || function(){};
                onSuccess(item);
                defer.resolve(item);
            });
            return defer.promise();
        },
        deleteInstance: function(user, onSuccess) {
            var userId = user ? user.id : null;
            var defer = $.Deferred();
            var deleteItem = that.DatabaseManager.deleteItem(that, userId);
            $.when(deleteItem).done(function(item) {
                onSuccess = onSuccess || function(){};
                onSuccess(item);
                defer.resolve(item);
            });
            return defer.promise();
        },
        createInstances: function(entities, user) {
            var userId = user ? user.id : null;
            var defer = $.Deferred();
            var createItems = that.DatabaseManager.createItems(entities, userId);
            $.when(createItems).done(function (items) {
                defer.resolve(items);
            });
            return defer.promise();
        },
        updateInstances: function(entities, user) {
            var userId = user ? user.id : null;
            var defer = $.Deferred();
            var updateItems = that.DatabaseManager.updateItems(entities, userId);
            $.when(updateItems).done(function(items) {
                defer.resolve(items);
            });
            return defer.promise();
        },
        deleteInstances: function(entities, user) {
            var userId = user ? user.id : null;
            var defer = $.Deferred();
            var deleteItems = that.DatabaseManager.deleteItems(entities, userId);
            $.when(deleteItems).done(function(items) {
                defer.resolve(items);
            });
            return defer.promise();
        }
    }, spec);
    that.attributes = _.extend(that.attributes, spec.attributes);
    that.associations = _.extend(that.associations, spec.associations);
    if (!that.id) { that.set('id', helpers.newGuid()); }
    if (!that.get('entityType')) { that.set('entityType', that.type); }
    //if (!that.get('entityLocation')) { that.setLocation(); }
    return that;
};

// Entity DomainEntity

var helpers = require('../../../../server/helpers');
import * as _ from 'lodash';
import {FirebaseManager} from '../../4-infrastructure/databaseManagers/FirebaseManager';
import * as Attribute from './Attribute';
import * as $ from 'jquery';

export class Entity {
    constructor(){
        this.DatabaseManager = new FirebaseManager();
        this.parentEntity = null;
        this.loadStatus = 'proxy'; // ['proxy', 'full']
        this.isPersistent = false;
        this.id = '';
        this.hasUrl = false;
        this.url = '';
        this.details = false;
        this.parentId = '';
        this.label = '';
        this.description = '';
        this.iconUrl = '';
        this.composites = {};
        this.help = '';
        this.attributes = {
            id: new class extends Attribute.TextAttribute {
                constructor(){
                    super();
                    this.name = 'id';
                    this.label = 'ID';
                    this.description = '';
                    this.visibility = 'Public';
                }
            }(),
            entityLocation: new class extends Attribute.TextAttribute {
                constructor(){
                    super();
                    this.name = 'entityLocation';
                    this.label = 'entityLocation';
                    this.description = '';
                    this.visibility = 'Public';
                }
            }(),
            entityType: new class extends Attribute.TextAttribute {
                constructor(){
                    super();
                    this.name = 'entityType';
                    this.label = 'entityType';
                    this.description = '';
                    this.visibility = 'Public';
                    this.value = "Entity";
                }
            }()
        };
        this.associations = {};
        if (!this.id) { this.set('id', helpers.newGuid()); }
        //EntityType: function() {
        //    return require('./domain-entity/' + this.type);
        //},
        //loadInstances: function(entityType, onLoadItems) {
        //    this.DatabaseManager.loadItems(entityType, function(items) { onLoadItems(items); });
        //},
        //syncInstances: function(entityType, onSyncItems) {
        //    this.DatabaseManager.syncItems(entityType, function(items) { onSyncItems(items); });
        //},
    }
    set type(value){
        this.set("entityType", value);
    }
    get type(){
        return this.get("entityType");
    }
    getFactory() {};
    validate() {
        return false;
    };
    _new(values, user, onSuccess) {
        this.setValues(values);
        this.createInstance(user, onSuccess);
        return this;
    };
    update(values, user, onSuccess) {
        this.setValues(values);
        this.updateInstance(user, onSuccess);
        return this;
    };
    getValues(user) {
        var valuesObject = {};
        _.each(_.values(this.attributes), function(attribute) {
            valuesObject[attribute.name] = attribute.get(user);
        });
        _.each(_.values(this.associations), function(association) {
            valuesObject[association.thisName] = association;
        });
        return valuesObject;
    };
    getAttributeValues(user) {
        var valuesObject = {};
        _.each(_.values(this.attributes), function(attribute) {
            valuesObject[attribute.name] = attribute.get(user);
        });
        return valuesObject;
    };
    getPublicValues(user) {
        var valuesObject = {};
        _.each(_.filter(_.values(this.attributes), function(attribute) { return attribute.visibility === 'Public'; }), function(attribute) {
            valuesObject[attribute.name] = attribute.get(user);
        });
        return valuesObject;
    };
    getProtectedValues() {
        var valuesObject = {};
        _.each(_.filter(_.values(this.attributes), function(attribute) { return attribute.visibility === 'Protected'; }), function(attribute) {
            valuesObject[attribute.name] = attribute.get();
        });
        return valuesObject;
    };
    getPrivateValues() {
        var valuesObject = {};
        _.each(_.filter(_.values(this.attributes), function(attribute) { return attribute.visibility === 'Private'; }), function(attribute) {
            valuesObject[attribute.name] = attribute.get();
        });
        return valuesObject;
    };
    hasChanged() {
        var changed = false;
        _.each(_.values(this.attributes), function(attribute) {
            if (attribute.hasChanged()) {
                changed = true;
            }
        });
        if (!changed) {
            _.each(_.values(this.associations), function(association) {
                if (association.hasChanged()) {
                    changed = true;
                }
            });
        }
        return changed;
    };
    hasUserInput(fieldName) {
        var attribute = _.find(_.values(this.attributes), function(attribute) { return attribute.name === fieldName; });
        if (attribute) {
            return attribute.hasUserInput();
        }
        return false;
    };
    get(fieldName, user) {
        var attribute = _.find(_.values(this.attributes), function(attribute) { return attribute.name === fieldName; });
        if (attribute) {
            return attribute.get(user);
        } else {
            var association = _.find(_.values(this.associations), function(association) { return association.thisName === fieldName; });
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
    };
    setValues(valuesObject, user, setPersistent) {
        var self = this;
        _.each(_.keys(valuesObject), function(fieldName) {
            self.set(fieldName, valuesObject[fieldName], user, setPersistent);
        });
        return this;
    };
    resetValues() {
        _.each(_.values(this.attributes), function(attribute) {
            this.set(attribute.name, null);
        });
        _.each(_.values(this.associations), function(association) {
            this.set(association.name, null);
        });
        return this;
    };
    set(fieldName, value, user, setPersistent) {
        var locationChanged = false;
        if (fieldName === 'id') {
            this.id = value;
            locationChanged = true;
        }
        var attribute = _.find(_.values(this.attributes), function (attribute) {
            return attribute.name === fieldName;
        });
        if (attribute) {
            attribute.set(value, user, setPersistent);
        } else {
            var association = _.find(_.values(this.associations), function (association) {
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
            //this.setLocation();
        }
        return this;
    };
    add(fieldName, value, setPersistent) {
        var association = _.find(_.values(this.associations), function (association) {
            return association.thisName === fieldName;
        });
        if (value && value.id && association && association.thatCardinality === 'multiple') {
            if (_.map(association.value, 'id').indexOf(value.id) === -1) {
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
        return this;
    };
    delete(user) {
        this.deleteInstance(user);
        return this;
    };
    remove(fieldName, value, setPersistent) {
        if (!fieldName && !value && !setPersistent) {
            this.deleteInstance();
        }
        var association = _.find(_.values(this.associations), function (association) {
            return association.thisName === fieldName;
        });
        if (value && value.id && association && association.thatCardinality === 'multiple') {
            association.value = _.filter(association.value, function(v) { return v.id !== value.id });
            if (setPersistent) {
                association.persistentValue = _.filter(association.persistentValue, function(v) { return v.id !== value.id });
            }
        }
        return this;
    };
    getDuplicate(fieldName) {
        if (!fieldName) {
            var duplicate = _.extend({}, this);
            _.each(duplicate.attributes, function(attribute) { attribute.resetPersistentValue(); });
            _.each(duplicate.associations, function(association) { association.resetPersistentValue(); });
            _.each(_.filter(this.associations, function(association) { return association.thisIsComposite; }), function(composite) {
                duplicate.set(composite.thisName, composite.getDuplicate());
            });
            duplicate.set('entityLocation', null);
            return duplicate;
        } else {
            var composite = _.find(this.associations, function(association) { return association.thisIsComposite && association.thisName === fieldName; });
            if (composite) {
                return composite.getDuplicate();
            } else {
                return this.get(fieldName);
            }
        }
    };
    getAssociations() {
        var self = this;
        //var DomainModel = require('../model/DomainModel');
        //var Entity = DomainModel.getEntityType(this.type);
        //var Entityassociations = _.filter(DomainModel.associations, function(association) { return association().type === 'association' && (association().fromEntity === Entity || association().toEntity === Entity); });
        var associations = _.values(self.associations);
        //var SuperTypes = self.getSuperTypes();
        //_.each(SuperTypes, function(SuperType) { associations = associations.concat(SuperType().getAssociations()); });
        return associations;
    };
    loadUserValues(user) {
        var defer = $.Deferred();
        var groupInputAttributes = _.filter(_.values(this.attributes), function(attribute) { return attribute.isGroupInput; });
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
    };
    loadInstance(entityType, id, onLoadItem, user) {
        this.id = id;
        var userId = user ? user.id : null;
        this.DatabaseManager.loadItem(entityType, this.getLocation(), function(item) {
            if (item) {
                item.loadStatus = 'full';
            }
            onLoadItem(item);
        }, userId);
    };
    syncInstance(entityType, id, onSyncItem, user, useDefer) {
        this.id = id;
        var userId = user ? user.id : null;
        this.DatabaseManager.syncItem(entityType, this.getLocation(), function(item) {

            if (item) {
                item.loadStatus = 'full';
            }
            onSyncItem(item);
        }, userId, useDefer);
    };
    getLocation() {
        if (this.get('entityLocation')) {
            return this.get('entityLocation');
        } else {
            var ownerPath = '';
            var ownerAssociation = _.find(this.associations, function (association) {
                return association.thatIsComposite && association.value && association.value.id;
            });
            if (ownerAssociation) {
                ownerPath = ownerAssociation.value.getLocation() + 'associations/' + ownerAssociation.thatName + '/';
            } else {
                ownerPath = this.type + '/';
            }
            return ownerPath + this.id + '/';
        }
    };
    setLocation() {
        var ownerPath = '';
        var ownerAssociation = _.find(this.associations, function (association) {
            return association.thatIsComposite && association.value && association.value.id;
        });
        if (ownerAssociation) {
            ownerPath = ownerAssociation.value.getLocation() + 'associations/' + ownerAssociation.thatName + '/';
        } else {
            ownerPath = this.type + '/';
        }
        this.set('entityLocation', ownerPath + this.id + '/');
    };
    createInstance(user, onSuccess) {
        var userId = user ? user.id : null;
        var defer = $.Deferred();
        if (this.attributes.timestampCreate) {
            this.set('timestampCreate', new Date());
        }
        var createItem = this.DatabaseManager.createItem(this, userId);
        $.when(createItem).done(function (item) {
            onSuccess = onSuccess || function(){};
            onSuccess(item);
            defer.resolve(item);
        });
        return defer.promise();
    };
    updateInstance(user, onSuccess) {
        var userId = user ? user.id : null;
        var defer = $.Deferred();
        if (this.attributes.timestampLastUpdate) {
            this.set('timestampLastUpdate', new Date());
        }
        var updateItem = this.DatabaseManager.updateItem(this, userId);
        $.when(updateItem).done(function(item) {
            onSuccess = onSuccess || function(){};
            onSuccess(item);
            defer.resolve(item);
        });
        return defer.promise();
    };
    deleteInstance(user, onSuccess) {
        var userId = user ? user.id : null;
        var defer = $.Deferred();
        var deleteItem = this.DatabaseManager.deleteItem(this, userId);
        $.when(deleteItem).done(function(item) {
            onSuccess = onSuccess || function(){};
            onSuccess(item);
            defer.resolve(item);
        });
        return defer.promise();
    };
    createInstances(entities, user) {
        var userId = user ? user.id : null;
        var defer = $.Deferred();
        var createItems = this.DatabaseManager.createItems(entities, userId);
        $.when(createItems).done(function (items) {
            defer.resolve(items);
        });
        return defer.promise();
    };
    updateInstances(entities, user) {
        var userId = user ? user.id : null;
        var defer = $.Deferred();
        var updateItems = this.DatabaseManager.updateItems(entities, userId);
        $.when(updateItems).done(function(items) {
            defer.resolve(items);
        });
        return defer.promise();
    };
    deleteInstances(entities, user) {
        var userId = user ? user.id : null;
        var defer = $.Deferred();
        var deleteItems = this.DatabaseManager.deleteItems(entities, userId);
        $.when(deleteItems).done(function(items) {
            defer.resolve(items);
        });
        return defer.promise();
    };
}

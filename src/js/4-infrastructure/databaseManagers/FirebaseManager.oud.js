var helpers = require('../../../../server/helpers');
var _ = require('underscore');
var Firebase = require('firebase');
var EntityFactory = require('../../3-domain/factories/EntityFactory');
    
module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = _.extend({
        firebaseRoot: 'https://ics-r.firebaseio.com/',
        getFirebaseCollectionRef: spec.getFirebaseCollectionRef || function(entity) {
            return (that.firebaseRoot + entity.type);
        },
        getFirebaseItemRef: spec.getFirebaseCollectionRef || function(entity, id) {
            if (!id && entity.id) { id = entity.id; }
            return (that.firebaseRoot + entity.type + '/' + id);
        }, 
        setAttributesFromFirebase: function(fo, entity) {
            if (typeof entity === 'function') { entity = entity(); }
            entity.id = fo.id;
            if (fo.public) {
                _.each(_.keys(fo.public), function(dataItemKey) {
                    if (_.keys(entity.attributes).indexOf(dataItemKey) > -1) {
                        entity.attributes[dataItemKey].value = fo.public[dataItemKey];
                    }
                });
            }
            if (fo.info) {
                _.each(_.keys(fo.info), function(dataItemKey) {
                    if (_.keys(entity.attributes).indexOf(dataItemKey) > -1) {
                        entity.attributes[dataItemKey].value = fo.info[dataItemKey];
                    }
                });
            }
            if (fo.protected) { 
                _.each(_.keys(fo.protected), function(dataItemKey) {
                    if (_.keys(entity.attributes).indexOf(dataItemKey) > -1) {
                        entity.attributes[dataItemKey].value = fo.protected[dataItemKey];
                    }
                });
            }
            return entity; 
        },
        getFirebaseObject: function(entity, location) {
            // returns an object for multi-location set/update with keys = firebaselocations and values = objectvalues
            var DomainModel = require('../../3-domain/model/DomainModel');
            var Entity = DomainModel.getEntityType(entity.type);
            if (!location) { location = ''; } 
            location += entity.type + '/' + entity.id + '/';
            var fo = {}
            var key = location;
            var value = { 
                id: entity.id, 
                public: {}, 
                private: {}, 
                relations: {}, 
                composites: {}  
            }; 
            fo[key] = value;
            _.each(entity.attributes, function(attribute) {
                // if (!attribute.isGroupInput) {
                if (!fo[key][attribute.visibility]) {
                    fo[key][attribute.visibility] = {};
                }                
                fo[key][attribute.visibility][attribute.name] = attribute.value;
                // } 
            });
            var relationTypes = entity.getAssociations();
            _.each(relationTypes, function(relationType) {
                if (relationType().thisIsComposite(Entity)) {
                    var compositeObject = {};
                    if (relationType().thatCardinality(Entity) === 'multiple') {
                        var composites = entity.composites[relationType().thisName(Entity)];
                        if (composites) {
                            _.each(composites, function(composite) {
                                var foSubObject = that.getFirebaseObject(composite, location + 'composites/' + relationType().thisName(Entity) + '/');
                                compositeObject[composite.id] = _.extend(_.values(foSubObject || {})[0], {type: composite.type});
                            }); 
                        }
                    }
                    if (relationType().thatCardinality(Entity) === 'single') {
                        var composite = entity.composites[relationType().thisName(Entity)];
                        if (composite) {
                            var foSubObject = that.getFirebaseObject(composite, location + 'composites/' + relationType().thisName(Entity) + '/');
                            compositeObject[composite.id] = _.extend(_.values(foSubObject || {})[0], {type: composite.type});
                        }
                    }
                    fo[key].composites[relationType().thisName(Entity)] = compositeObject;
                } else {
                    // if (relationType().thatIsNavigable(Entity)) {
                        var relationObject = {};  
                        if (relationType().thatCardinality(Entity) === 'multipe') {
                            var relations = entity.relations[relationType().thisName(Entity)];
                            if (relations) {
                                _.each(relations, function(relation) {
                                    relationObject[relation.id] = { 
                                        id: relation.id, 
                                        type: relation.type, 
                                        public: relation.getPublicValues()
                                    };
                                    var relationObjectKey = relation.type + '/' + relation.id + '/relations/' + relationType().thatName(Entity) + '/' + entity.type + '/' + entity.id;
                                    fo[relationObjectKey] = {
                                        id: entity.id,
                                        type: entity.type,
                                        public: entity.getPublicValues(),
                                        location: location
                                    };
                                });
                            }
                        }
                        if (relationType().thatCardinality(Entity) === 'single') {
                            var relation = entity.relations[relationType().thisName(Entity)];
                            if (relation) {
                                relationObject[relation.id] = { 
                                    id: relation.id, 
                                    type: relation.type, 
                                    public: relation.getPublicValues()
                                };
                                var relationObjectKey = relation.type + '/' + relation.id + '/relations/' + relationType().thatName(Entity) + '/' + entity.type + '/' + entity.id;
                                fo[relationObjectKey] = {
                                    id: entity.id,
                                    type: entity.type,
                                    public: entity.getPublicValues(),
                                    location: location
                                };
                            } 
                        // }
                    }
                }
                fo[key].relations[relationType().thisName(Entity)] = relationObject;
            });
            // _.each(_.keys(entity.relations), function(relationName) {
            //     var relation = entity.relations[relationName];
            //     var relationObject = {};
            //     if (Array.isArray(relation)) {
            //         // relation is array
            //         _.each(relation, function(item) {
            //             relationObject[item.id] = { 
            //                 id: item.id, 
            //                 type: item.type, 
            //                 public: item.getPublicValues(),
            //                 location: location
            //             };
            //             var relationKey = item.type + '/' + item.id + '/relations'
            //         });
            //     } else {
            //         // relation is object
            //         relationObject[relation.id] = { 
            //             id: relation.id, 
            //             type: relation.type, 
            //             public: relation.getPublicValues(),
            //             location: location
            //         }
            //     }
            //     fo[key].relations[relationName] = relationObject;
            // });
            // _.each(_.keys(entity.composites), function(compositeName) {
            //     var composite = entity.composites[compositeName];
            //     var compositeObject = {};
            //     if (Array.isArray(composite)) {
            //         // composite is array
            //         _.each(composite, function(item) {
            //             var foSubObject = that.getFirebaseObject(item, location + 'composites/' + compositeName + '/');
            //             compositeObject[item.id] = _.extend(foSubObject, {type: item.type});
            //         }); 
            //     } else {
            //         // composite is object
            //         var foSubObject = that.getFirebaseObject(composite,  location + 'composites/' + compositeName + '/');
            //         compositeObject[composite.id] = _.extend(foSubObject, {type: composite.type}); 
            //     }
            //     fo[key].composites[compositeName] = compositeObject;
            // });
            return fo;
        },
        getUserInputObjects: function(entity) {
            var userInputObjects = [];
            if (entity.composites && entity.composites.toolElements) {
                _.each(entity.composites.toolElements, function(toolElement) {
                    if (toolElement.attributes) {
                        _.each(_.filter(toolElement.attributes, function(attribute) { return attribute.isGroupInput; }), function(attribute) {
                            if (attribute.userInput && attribute.userInput.value) {
                                userInputObjects.push({
                                    projectType: entity.type,
                                    projectId: entity.id,
                                    toolElementId: toolElement.id,
                                    attributeName: attribute.name,
                                    userId: attribute.userInput.user.id,
                                    value: attribute.userInput.value,
                                    comment: attribute.userInput.comment,
                                    groupInputId: attribute.value.groupInputId
                                }); 
                            }
                        });
                    }
                });
            }
            return userInputObjects;
        },
        saveUserInputs: function(entity) {
            var userInputs = that.getUserInputObjects(entity);
            _.each(userInputs, function(userInput) {
                var ref = new Firebase(that.firebaseRoot + 'groupInput/' + userInput.groupInputId + '/' + userInput.userId);
                ref.update(userInput);
            }); 
        },
        removeUserInputs: function(entity) {
            var userInputs = that.getUserInputObjects(entity);
            _.each(userInputs, function(userInput) {
                var ref = new Firebase(that.firebaseRoot + 'groupInput/' + userInput.groupInputId + '/' + userInput.userId);
                ref.remove();
            });
        },
        getUserInput: function(groupInputId, userId) {
            var defer = $.Deferred();
            var ref = new Firebase(that.firebaseRoot + 'groupInput/' + groupInputId + '/' + userId);
            ref.once('value', function(userInputSnapshot) {
                var userInputObject = userInputSnapshot.val();
                if (userInputObject) {
                    defer.resolve(userInputObject);
                } else {
                    defer.resolve(null);
                }
            });
            return defer.promise();
        },
        getGroupInputs: function(groupInputId) {
            var defer = $.Deferred();
            var ref = new Firebase(that.firebaseRoot + 'groupInput/' + groupInputId);
            ref.once('value', function(groupInputsSnapshot) {
                var groupInputsObject = groupInputsSnapshot.val();
                if (groupInputsObject) {
                    defer.resolve(_.values(groupInputsObject));
                } else {
                    defer.resolve(null);
                }
            });
            return defer.promise();
        },
        loadItems: function(entityType, callback) {
            var self = this;
            var ref = new Firebase(self.getFirebaseCollectionRef(entityType()));
            ref.once('value', function(dataSnapshot) {
                var dataObject = dataSnapshot.val();
                if (dataObject) {
                    var items = _.mapObject(dataObject, function(firebaseObject, id) { return EntityFactory().createFromJSON(entityType, firebaseObject); });
                    callback(items);
                } else {
                    items = {};
                    callback(items);
                }
            }); 
        },
        syncItems: function(entityType, callback) {
            var self = this;
            var ref = new Firebase(self.getFirebaseCollectionRef(entityType()));
            ref.on('value', function(dataSnapshot) {
                var dataObject = dataSnapshot.val();
                if (dataObject) {
                    var items = _.mapObject(dataObject, function(firebaseObject, id) { return EntityFactory().createFromJSON(entityType, firebaseObject); });
                    callback(items);
                } else {
                    items = {};
                    callback(items);
                }
            }); 
        },
        loadItem: function(entityType, id, callback) {
            var self = this;
            var ref = new Firebase(self.getFirebaseItemRef(entityType(), id));
            ref.once('value', function(dataSnapshot) {
                var dataObject = dataSnapshot.val();
                if (dataObject) {
                    var item = EntityFactory().createFromJSON(entityType, dataObject);
                    callback(item);
                } else {
                    item = null;
                    callback(item);
                }
            });
        },
        syncItem: function(entityType, id, callback) {
            var self = this;
            var ref = new Firebase(self.getFirebaseItemRef(entityType(), id));
            ref.on('value', function(dataSnapshot) {
                var dataObject = dataSnapshot.val();
                if (dataObject) {
                    var item = EntityFactory().createFromJSON(entityType, dataObject);
                    callback(item);
                } else {
                    item = null;
                    callback(item);
                }
            });
        },
        createItem: function(entity) {
            var self = this;
            var defer = $.Deferred();
            var fbObject = self.getFirebaseObject(entity);
            var ref = new Firebase(self.firebaseRoot);
            ref.set(fbObject, function(error) {
                if (!error) {
                    that.saveUserInputs(entity);
                    defer.resolve(entity);
                }
            });
            return defer.promise();
        },
        updateItem: function(entity) {
            var self = this;
            var defer = $.Deferred();
            var ref = new Firebase(self.firebaseRoot);
            var fbObject = self.getFirebaseObject(entity);
            ref.update(fbObject, function(error) {
                if (!error) {
                    that.saveUserInputs(entity);
                    defer.resolve(entity);
                }
            });
            return defer.promise();
        },
        deleteItem: function(entity) {
            var self = this;
            var defer = $.Deferred();
            var ref = new Firebase(self.firebaseRoot);
            ref.update(function(error) {
                if (!error) {
                    that.removeUserInputs(entity);
                    defer.resolve(entity);
                }
            });
            return defer.promise();
        }
    }, spec); 
    return that;
};

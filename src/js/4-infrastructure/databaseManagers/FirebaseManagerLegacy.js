// Firebasemanager

var helpers = require('../../../../server/helpers');
var _ = require('underscore');
var Firebase = require('firebase');

var $ = require('jquery');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};

    that = _.extend({
        firebaseRoot: function(isServer) {
            if(!isServer && typeof window !== 'undefined'){
                var url = window.location.host;
                switch (url) {
                    case 'localhost:3000': // Ontwikkelomgeving
                        return 'https://vp-test-website.firebaseio.com/';
                    case 'icstrategy-test.herokuapp.com':
                    case 'online-twitch-bot.herokuapp.com': // Testomgeving
                        return 'https://vp-test-website.firebaseio.com/';
                    case 'www.icstrategy.com':
                    case 'icstrategy.com': // Productieomgeving
                        return 'https://ics-r.firebaseio.com/';
                }
            }
            else{
                return 'https://vp-test-website.firebaseio.com/';
            }
            return '';
        },
        getFirebaseCollectionRef: spec.getFirebaseCollectionRef || function(entity) {
            return (that.firebaseRoot() + entity.type);
        },
        getFirebaseItemRef: spec.getFirebaseCollectionRef || function(entity, id) {
            if (!id && entity.id) { id = entity.id; }
            return (that.firebaseRoot() + entity.type + '/' + id);
        },
        createInstanceFromJSON: function(Entity, jsonData, isProxy, userId, _useDefer) {
            var DomainEntitiesList = require('../../../generated/js/domain-entity/DomainEntitiesList');
            var useDefer = _useDefer == false ? false : true;
            if(useDefer)
                var defer = $.Deferred();
            function checkReady(instance, semaphore) {
                if (semaphore === 0) {
                    if(useDefer)
                        defer.resolve(instance);
                }
            }
            if (!jsonData.attributes || !jsonData.attributes.entityType) {
                if(useDefer)
                    defer.resolve(null);
                return;
            }
            var instance = new Entity();
            var semaphore = _.keys(instance.attributes).length + _.keys(instance.associations).length;
            instance.id = jsonData.attributes.id;
            instance.type = jsonData.attributes.entityType || new Entity().type;
            isProxy ? instance.loadStatus = 'proxy' : instance.loadStatus = 'full';
            _.each(_.values(instance.associations), function (association) {
                var associationName = association.thisName;
                var cardinality = association.thatCardinality;
                var isComposite = association.thisIsComposite;
                var isNavigable = association.thatIsNavigable;
                var thatEntity = association.thatEntity;
                var associationObject = jsonData.associations ? jsonData.associations[associationName] : null;

                if (associationObject) {
                    switch (cardinality) {
                        case 'single':
                            var associationData = _.values(associationObject)[0];
                            if (associationData && associationData.attributes && associationData.attributes.entityType) {
                                var associationInstanceRequest = that.createInstanceFromJSON(DomainEntitiesList(associationData.attributes.entityType), associationData, !isComposite, userId);
                                $.when(associationInstanceRequest).done(function (associationInstance) {
                                    if (associationInstance) {
                                        instance.set(associationName, associationInstance, {}, true);
                                    }
                                    semaphore -= 1;
                                    checkReady(instance, semaphore);
                                });
                            } else {
                                semaphore -= 1;
                                checkReady(instance, semaphore);
                            }
                            break;
                        case 'multiple':

                            var associationInstances = [];
                            var associationsCount = _.values(associationObject).length;
                            _.each(_.values(associationObject), function (associationData) {
                                if (associationData && associationData.attributes && associationData.attributes.entityType) {
                                    var associationInstanceRequest = that.createInstanceFromJSON(DomainEntitiesList(associationData.attributes.entityType), associationData, !isComposite, userId);
                                    $.when(associationInstanceRequest).done(function (associationInstance) {
                                        if (associationInstance) {
                                            associationInstances.push(associationInstance);
                                        }
                                        associationsCount -= 1;
                                        if (associationsCount === 0) {
                                            instance.set(associationName, associationInstances, {}, true);
                                            semaphore -= 1;
                                            checkReady(instance, semaphore);
                                        }
                                    });
                                } else {
                                    associationsCount -= 1;
                                    if (associationsCount === 0) {
                                        instance.set(associationName, associationInstances, {}, true);
                                        semaphore -= 1;
                                        checkReady(instance, semaphore);
                                    }
                                }
                            });
                            break;
                    }
                } else {
                    semaphore -= 1;
                    checkReady(instance, semaphore);
                }
            });

            var simpleAttributes = _.filter(instance.attributes, function(attribute) { return !attribute.isGroupInput; });
            var groupInputAttributes = _.filter(instance.attributes, function(attribute) { return attribute.isGroupInput; });
            if (isProxy) {
                semaphore -= (simpleAttributes.length + groupInputAttributes.length);
                simpleAttributes = _.filter(simpleAttributes, function(attribute) { return attribute.visibility === 'Public'; });
                groupInputAttributes = _.filter(groupInputAttributes, function(attribute) { return attribute.visibility === 'Public'; });
                semaphore += (simpleAttributes.length + groupInputAttributes.length);
            }
            _.each(simpleAttributes, function (attribute) {
                instance.set(attribute.name, jsonData.attributes ? jsonData.attributes[attribute.name] : null, {}, true);
                semaphore -= 1;
                checkReady(instance, semaphore);
            });
            if (groupInputAttributes.length > 0) {
                _.each(groupInputAttributes, function (attribute) {
                    var value = jsonData.attributes ? jsonData.attributes[attribute.name] : null;
                    if (value) {
                        if (userId) {
                            var userInputRef = new Firebase(that.firebaseRoot() + 'GroupInput/' + jsonData.attributes.id + '/' + attribute.name + '/' + userId);
                            userInputRef.once('value', function (userInputShapshot) {
                                var userInputObject = userInputShapshot.val();
                                if (userInputObject) {
                                    value.userInput = userInputObject;
                                } else {
                                    value.userInput = {};
                                }
                                instance.set(attribute.name, value, userId, true);
                                semaphore -= 1;
                                checkReady(instance, semaphore);
                            });
                        } else {
                            value.userInput = {};
                            instance.set(attribute.name, value, null, true);
                            //semaphore -= groupInputAttributes.length;
                            semaphore -= 1;
                            checkReady(instance, semaphore);
                        }
                    } else {
                        semaphore -= 1;
                        checkReady(instance, semaphore);
                    }
                });
            }
            if(useDefer)
                return defer.promise();
        },
        getFirebaseTransaction: function(entity, location, isProxy, mustDelete, userId) {
            function associationTransactions(values) {
                var tr = {};
                if (mustDelete) {
                    values = {};
                } else {
                    values['entityLocation'] = location ? location + entity.id + '/' : entity.getLocation();
                }
                _.each(_.filter(_.values(entity.associations), function(association) { return !association.thisIsComposite && !association.thatIsComposite ; }), function(association) {
                    if (association.thatCardinality === 'single') {
                        if (association.value && _.keys(association.value).length > 0 && association.value.attributes && association.value.attributes.entityLocation) {
                            tr[association.value.get('entityLocation') + 'associations/' + association.thatName + '/' + entity.id + '/attributes/'] = values;
                        }
                    } else {
                        _.each(association.value, function(associationItem) {
                            if (associationItem.attributes && associationItem.attributes.entityLocation) {
                                tr[associationItem.get('entityLocation') + 'associations/' + association.thatName + '/' + entity.id + '/attributes/'] = values;
                            }
                        });
                    }
                });
                return tr;
            }
            var transaction = {};
            var entityKey = location ? location + entity.id + '/' : entity.getLocation();
            if (!entity.get('entityLocation')) {
                if (!isProxy) {
                    entity.set('entityLocation', entityKey);
                } else {
                    entity.set('entityLocation', entity.getLocation());
                }
            }
            if (mustDelete) {
                transaction[entityKey] = {};
                transaction = _.extend(transaction, associationTransactions({}));
            } else {
                var publicValuesChanged = false;
                _.each(_.values(entity.attributes), function (attribute) {
                    transaction[entityKey + 'attributes/'] = transaction[entityKey + 'attributes/'] || {};
                    if (attribute.name === 'entityLocation') {
                        if (isProxy) {
                            transaction[entityKey + 'attributes/'][attribute.name] = entity.get('entityLocation');
                        } else {
                            transaction[entityKey + 'attributes/'][attribute.name] = entityKey;
                        }
                    } else {
                        if (attribute.isGroupInput) {
                            var groupValue = {};
                            var previousUserInput = attribute.persistentValue.userInput;
                            var userInput = attribute.value.userInput;
                            if (_.keys(userInput).length > 0) {
                                if (_.keys(previousUserInput).length > 0) {
                                    groupValue = {
                                        count: parseInt(attribute.persistentValue.count, 10),
                                        sum: parseFloat(attribute.persistentValue.sum) - parseFloat(previousUserInput.value) + parseFloat(userInput.value),
                                        squareSum: parseFloat(attribute.persistentValue.squareSum) - Math.pow(parseFloat(previousUserInput.value), 2) + Math.pow(parseFloat(userInput.value), 2)
                                    }
                                } else {
                                    groupValue = {
                                        count: parseInt(attribute.persistentValue.count, 10) + 1,
                                        sum: parseFloat(attribute.persistentValue.sum) + parseFloat(userInput.value),
                                        squareSum: parseFloat(attribute.persistentValue.squareSum) + Math.pow(parseFloat(userInput.value), 2)
                                    }
                                }
                                transaction['GroupInput/' + entity.id + '/' + attribute.name + '/' + (userInput.userId || userId) + '/'] = userInput;
                            }
                            transaction[entityKey + 'attributes/'][attribute.name] = groupValue;
                        } else {
                            transaction[entityKey + 'attributes/'][attribute.name] = entity.get(attribute.name);
                        }
                    }
                    if (attribute.hasChanged() && attribute.visibility === 'Public') {
                        publicValuesChanged = true;
                    }
                });
                if (publicValuesChanged) {
                    transaction = _.extend(transaction, associationTransactions(entity.getPublicValues()));
                }
                if (!isProxy) {
                    _.each(_.filter(_.values(entity.associations), function(association) { return !association.thatIsComposite; }), function (association) {
                        if (association.hasChanged()) {
                            _.each(association.removedValues(), function (removedAssociationValue) {
                                transaction[entityKey + 'associations/' + association.thisName + '/' + removedAssociationValue.id + '/'] = {};
                                if (!association.thisIsComposite) {
                                    transaction[removedAssociationValue.get('entityLocation') + 'associations/' + association.thatName + '/' + entity.id + '/'] = {};
                                }
                            });
                            var associationKey = entityKey + 'associations/' + association.thisName + '/';
                            _.each(association.newValues().concat(association.changedValues()), function (newAssociationValue) {
                                transaction = _.extend(transaction, that.getFirebaseTransaction(newAssociationValue, associationKey, !association.thisIsComposite));
                                var newAssociationLocation = newAssociationValue.getLocation();
                                transaction[newAssociationLocation + 'associations/' + association.thatName + '/' + entity.id + '/attributes/'] = entity.getPublicValues();
                            });
                        }
                    });
                }
            }
            return transaction;
        },
        getUserInputObjects: function(entity) {
            var userInputObjects = [];
            if (entity.get('toolElements')) {
                _.each(entity.get('toolElements'), function(toolElement) {
                    if (toolElement.attributes) {
                        _.each(_.filter(toolElement.attributes, function(attribute) { return attribute.isGroupInput; }), function(attribute) {
                            if (attribute.userInput && attribute.userInput.value) {
                                userInputObjects.push({
                                    entityType: entity.type,
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
                var ref = new Firebase(that.firebaseRoot() + 'groupInput/' + userInput.groupInputId + '/' + userInput.userId);
                ref.update(userInput);
            }); 
        },
        removeUserInputs: function(entity) {
            var userInputs = that.getUserInputObjects(entity);
            _.each(userInputs, function(userInput) {
                var ref = new Firebase(that.firebaseRoot() + 'groupInput/' + userInput.groupInputId + '/' + userInput.userId);
                ref.remove();
            });
        },
        getUserInput: function(groupInputId, userId) {
            var defer = $.Deferred();
            var ref = new Firebase(that.firebaseRoot() + 'groupInput/' + groupInputId + '/' + userId);
            ref.once('value', function(userInputSnapshot) {
                var userInputObject = userInputSnapshot.val();
                if (userInputObject) {
                    defer.resolve(userInputObject);
                } else {
                    console.log('No data returned from: ' + 'groupInput/' + groupInputId + '/' + userId);
                    defer.resolve(null);
                }
            });
            return defer.promise();
        },
        getGroupInputs: function(groupInputId) {
            var defer = $.Deferred();
            var ref = new Firebase(that.firebaseRoot() + 'groupInput/' + groupInputId);
            ref.once('value', function(groupInputsSnapshot) {
                var groupInputsObject = groupInputsSnapshot.val();
                if (groupInputsObject) {
                    defer.resolve(_.values(groupInputsObject));
                } else {
                    console.log('No data returned from: ' + 'groupInput/' + groupInputId);
                    defer.resolve(null);
                }
            });
            return defer.promise();
        },
        loadItem: function(entityType, entityLocation, callback, userId, useDefer) {
            var ref = new Firebase(that.firebaseRoot() + entityLocation);
            ref.once('value', function(dataSnapshot) {
                var dataObject = dataSnapshot.val();
                if (dataObject) {
                    var itemRequest = that.createInstanceFromJSON(entityType, dataObject, false, userId, useDefer);
                    $.when(itemRequest).done(function(item) {
                        if (item) {
                            callback(item);
                        } else {
                            callback(null);
                        }
                    });
                } else {
                    console.log('No data found at: ' + entityLocation);
                    callback(null);
                }
            }, function(error) {
                console.log(error);
                console.log('Location: ' + entityLocation);
            });
        },
        syncItem: function(entityType, entityLocation, callback, userId, useDefer) {
            var ref = new Firebase(that.firebaseRoot() + entityLocation);
            ref.off('value');
//            console.log('Sync: ' + entityLocation);
            ref.on('value', function(dataSnapshot) {
                var dataObject = dataSnapshot.val();
                //console.log('Synced: ' + entityLocation);
                //console.log(dataObject);

                if (dataObject) {

                    var itemRequest = that.createInstanceFromJSON(entityType, dataObject, false, userId, useDefer);
                    $.when(itemRequest).done(function(item) {

                        if (item) {
                            callback(item);
                        } else {
                            callback(null);
                        }
                    });
                } else {
                    console.log('No data found at: ' + entityLocation);
                    callback(null);
                }
            }, function(error) {
                console.log(error);
                console.log('Location: ' + entityLocation);
            });
        },
        createItem: function(entity, userId) {
            var defer = $.Deferred();
            var fbObject = that.getFirebaseTransaction(entity, null, null, null, userId);
            var ref = new Firebase(that.firebaseRoot());
            ref.update(fbObject, function(error) {
                if (!error) {
                    that.saveUserInputs(entity);
                    defer.resolve(entity);
                } else {
                    console.log(error);
                    console.log('Firebase object:');
                    console.log(fbObject);
                }
            });
            return defer.promise();
        },
        createItems: function(entities, userId) {
            var defer = $.Deferred();
            var fbObject = {};
            _.each(entities, function(entity) {
                fbObject = _.extend(fbObject, that.getFirebaseTransaction(entity, null, null, null, userId));
            });
            var ref = new Firebase(that.firebaseRoot());
            ref.update(fbObject, function(error) {
                if (!error) {
                    _.each(entities, function(entity) {
                        that.saveUserInputs(entity);
                    });
                    defer.resolve(entities);
                } else {
                    console.log(error);
                    console.log('Firebase object:');
                    console.log(fbObject);
                }
            });
            return defer.promise();
        },
        updateItem: function(entity, userId) {
            var defer = $.Deferred();
            var ref = new Firebase(that.firebaseRoot());
            var fbObject = that.getFirebaseTransaction(entity, null, null, null, userId);
            ref.update(fbObject, function(error) {
                if (!error) {
                    that.saveUserInputs(entity);
                    defer.resolve(entity);
                } else {
                    console.log(error);
                    console.log('Firebase object:');
                    console.log(fbObject);
                }
            });
            return defer.promise();
        },
        updateItems: function(entities, userId) {
            var defer = $.Deferred();
            var ref = new Firebase(that.firebaseRoot());
            var fbObject = {};
            _.each(entities, function(entity) {
                fbObject = _.extend(fbObject, that.getFirebaseTransaction(entity, null, null, null, userId));
            });
            ref.update(fbObject, function(error) {
                if (!error) {
                    _.each(entities, function(entity) {
                        that.saveUserInputs(entity);
                    });
                    defer.resolve(entities);
                } else {
                    console.log(error);
                    console.log('Firebase object:');
                    console.log(fbObject);
                }
            });
            return defer.promise();
        },
        deleteItem: function(entity, userId) {
            var defer = $.Deferred();
            var fbObject = that.getFirebaseTransaction(entity, '', false, true, userId);
            var ref = new Firebase(that.firebaseRoot());
            ref.update(fbObject, function(error) {
                if (!error) {
                    that.removeUserInputs(entity);
                    defer.resolve(entity);
                } else {
                    console.log(error);
                    console.log('Firebase object:');
                    console.log(fbObject);
                }
            });
            return defer.promise();
        },
        deleteItems: function(entities, userId) {
            var defer = $.Deferred();
            var fbObject = {};
            _.each(entities, function(entity) {
                fbObject = _.extend(fbObject, that.getFirebaseTransaction(entity, '', false, true, userId));
            });
            var ref = new Firebase(that.firebaseRoot());
            ref.update(fbObject, function(error) {
                if (!error) {
                    _.each(entities, function(entity) {
                        that.removeUserInputs(entity);
                    });
                    defer.resolve(entities);
                } else {
                    console.log(error);
                    console.log('Firebase object: ' + fbObject);
                    console.log(fbObject);
                }
            });
            return defer.promise();
        }
    }, spec);
    return that;
};

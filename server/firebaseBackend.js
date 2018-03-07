var _ = require('underscore');
var Firebase = require('firebase');
var helpers = require('./helpers');

var fbBase = 'https://ics-r.firebaseio.com/'; 
var fb = new Firebase(fbBase);

var redundantObjectTypes = ['users', 'projects', 'tools'];
var urlObjectTypes = ['projects', 'tools'];

function saveUrl(urlType, friendlyUrl, objectId, counter) {
    var suffix = '';
    if (counter) {
        suffix = '-' + counter.toString();
    } else {
        counter = 0;
    }
    var urlRef = new Firebase(fbBase + urlType + '/' + friendlyUrl + suffix);
    urlRef.once('value', function(urlSnapshot) { 
        var urlObject = urlSnapshot.val();
        if (urlObject) {
            saveUrl(urlType, friendlyUrl, objectId, counter + 1);                  
        } else {
            var infoUrlRef = new Firebase(fbBase + urlType + '/' + objectId + '/info/url');
            infoUrlRef.set(friendlyUrl + suffix); 
        }
    });
}

function checkRelation(objectType, objectId, relationType, relationId, relation, objectInfo) {
    if (redundantObjectTypes.indexOf(objectType) > -1) {
        if (!relation.info) {
            var relatedObjectInfoRef = new Firebase(fbBase + relationType + '/' + relationId + '/info');
            relatedObjectInfoRef.once('value', function(relatedInfoSnapshot) {
                var relatedInfoObject = relatedInfoSnapshot.val();
                var relationInfoRef = new Firebase(fbBase + objectType + '/' + objectId + '/relations/' + relationType + '/' + relationId + '/info');
                relationInfoRef.set(relatedInfoObject, function(error) {
                    var relatedObjectRelationRef = new Firebase(fbBase + relationType + '/' + relationId + '/relations/' + objectType + '/' + objectId + '/info');
                    relatedObjectRelationRef.set(objectInfo);
                });
            });
        }
    }
}
function checkRedundancies(objectType, itemObject) {
    function checkUrl(objectType, info) {
        if (!info.url) {
            saveUrl(objectType, helpers.getFriendlyUrl(info.name), info.id);
        }
    }
    if (urlObjectTypes.indexOf(objectType) > -1) {
        checkUrl(objectType, itemObject.info);
    }
}

module.exports = {
    manageRedundancies: function() {
        // relaties actueel houden
        _.each(redundantObjectTypes, function(objectType) {
            var itemsRef = new Firebase(fbBase + objectType);
            itemsRef.on('child_added', function(itemSnapshot){
                var itemObject = itemSnapshot.val();
                if (itemObject && objectType === 'projects' && itemObject.info && itemObject.info.projectType !== 'project') {
                    var projectTypeRef = new Firebase(fbBase + itemObject.info.projectType + 's/' + itemObject.info.id);
                    projectTypeRef.update({info: itemObject.info});
                }
                if (itemObject && itemObject.info) {
                    var infoRef = new Firebase(fbBase + objectType + '/' + itemObject.info.id + '/info');
                    var relationsRef = new Firebase(fbBase + objectType + '/' + itemObject.info.id + '/relations');
                    // Werk alle relaties bij als info veranderd
                    infoRef.on('child_changed', function(itemInfoSnapshot) {
                        var infoObject = {};
                        infoObject[itemInfoSnapshot.key()] = itemInfoSnapshot.val();
                        itemObject.info[itemInfoSnapshot.key()] = itemInfoSnapshot.val();
                        if (objectType === 'projects' && itemObject.info.projectType !== 'project') {
                            var projectTypeRef = new Firebase(fbBase + itemObject.info.projectType + 's/' + itemObject.info.id);
                            projectTypeRef.update({info: itemObject.info});
                        }
                        relationsRef.once('value', function(allRelationsSnapshot) {
                            var allRelationsObject = allRelationsSnapshot.val();
                            if (allRelationsObject) {
                                _.each(_.keys(allRelationsObject), function(relationType) {
                                    var relationTypeRef = new Firebase(fbBase + objectType + '/' + itemObject.info.id + '/relations/' + relationType);
                                    relationTypeRef.once('value', function(relationsSnapshot) {
                                        var relationsObject = relationsSnapshot.val();
                                        if (relationsObject) {
                                            _.each(_.keys(relationsObject), function(relationKey) {
                                                var relationInfoRef = new Firebase(fbBase + relationType + '/' + relationKey + '/relations/' + objectType + '/' + itemObject.info.id + '/info');
                                                relationInfoRef.update(infoObject);
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    });
                    // TBD: infoRef child_added en child_removed
                    relationsRef.on('child_added', function(relationsSnapshot) {
                        var relationType = relationsSnapshot.key();
                        var relation = relationsSnapshot.val();
                        var relationId = _.keys(relation)[0];
                        var relationObject = _.values(relation)[0];
                        checkRelation(objectType, itemObject.info.id, relationType, relationId, relationObject, itemObject.info);
                    });
                    // TBD: relationsRef child_changed en child_removed
                    checkRedundancies(objectType, itemObject);
                }
            });
            // Verwijderen redundancy na verwijderen item
            itemsRef.on('child_removed', function(itemSnapshot) {
                var itemObject = itemSnapshot.val();
                if (objectType === 'projects' && itemObject.info.projectType !== 'project') {
                    var projectTypeRef = new Firebase(fbBase + itemObject.info.projectType + 's/' + itemObject.info.id);
                    projectTypeRef.remove();
                }
                new Firebase(fbBase + 'urls/laatsteUrls/' + itemObject.info.id).remove();
                new Firebase(fbBase + 'urls/' + objectType + '/' + itemObject.info.url).remove();
                _.each(_.keys(itemObject.relations), function(relationType) {
                    _.each(_.keys(itemObject.relations[relationType]), function(relationId) {
                        new Firebase(fbBase + relationType + '/' + relationId + '/relations/' + objectType + '/' + itemObject.info.id).remove();
                    })    ;
                });
            });
        });
        // urls actueel houden
        _.each(urlObjectTypes, function(objectType) {
            var itemsRef = new Firebase(fbBase + objectType);
            itemsRef.on('child_added', function(itemSnapshot){
                var itemObject = itemSnapshot.val();
                if (itemObject && itemObject.info) {
                    var itemInfoRef = new Firebase(fbBase + objectType + '/' + itemObject.info.id + '/info');
                    itemInfoRef.on('child_changed', function(itemInfoSnapshot) {
                        // Werk url in info bij als naam in info verandert
                        if (itemInfoSnapshot.key() === 'name') {
                            itemObject.info.name = itemInfoSnapshot.val();
                            var baseUrl = helpers.getFriendlyUrl(itemObject.info.name);
                            saveUrl(objectType, baseUrl, itemObject.info.id);
                        }
                        // Werk url in urls bij als url in info verandert
                        if (itemInfoSnapshot.key() === 'url') {
                            // Verwijder laatst gebruikte url
                            var laatsteUrlRef = new Firebase(fbBase + 'urls/laatsteUrls/' + itemObject.info.id);
                            laatsteUrlRef.once('value', function(laatsteUrlSnapshot) {
                                var laatsteUrlObject = laatsteUrlSnapshot.val();
                                if (laatsteUrlObject) {
                                    var oudeUrlRef = new Firebase(fbBase + 'urls/' + objectType + '/' + laatsteUrlObject.url);
                                    oudeUrlRef.remove(function() {
                                        // Bewaar nieuwe url 
                                        var url = itemInfoSnapshot.val();
                                        if (url) {
                                            var urlRef = new Firebase(fbBase + 'urls/' + objectType + '/' + url);
                                            urlRef.update({ id: itemObject.info.id});
                                        }
                                    });
                                } else {
                                    // Bewaar nieuwe url 
                                    var url = itemInfoSnapshot.val();
                                    if (url) {
                                        var urlRef = new Firebase(fbBase + 'urls/' + objectType + '/' + url);
                                        urlRef.update({ id: itemObject.info.id});
                                    }
                                }
                            });
                        }
                    });
                    itemInfoRef.on('child_added', function(itemInfoSnapshot) {
                        if (itemInfoSnapshot.key() === 'url') {
                                // Bewaar nieuwe url 
                                var url = itemInfoSnapshot.val();
                                if (url) {
                                    var urlRef = new Firebase(fbBase + 'urls/' + objectType + '/' + url);
                                    urlRef.update({ id: itemObject.info.id});
                                }
                        }
                    })
                }
            });
            // Bewaar laatst gebruikte url voor een id
            var urlsRef = new Firebase(fbBase + 'urls/' + objectType);
            urlsRef.on('child_added', function(urlSnapshot) {
                var url = urlSnapshot.key();
                var urlObject = urlSnapshot.val();
                if (urlObject && urlObject.id) {
                    var laatsteUrlRef = new Firebase(fbBase + 'urls/laatsteUrls/' + urlObject.id);
                    laatsteUrlRef.update({url: url});
                }
            });
        });
        
        // Bereken gemiddelden o.b.v. groupInputs
        function bewaarGemiddelde(userInput) {
            var fieldInputsRef = new Firebase(fbBase + 'groupInputs/' + userInput.elementId + '/' + userInput.fieldName);
            fieldInputsRef.once('value', function(fieldInputsSnapshot) {
                var fieldInputsObject = fieldInputsSnapshot.val();
                var fieldInputs = _.values(fieldInputsObject);
                var average, standardDeviation;
                if (fieldInputs.length > 0) {
                    var som = _.reduce(fieldInputs, function(memo, fieldInputObject) { return memo + parseFloat(fieldInputObject.value); }, 0);
                    average = som/fieldInputs.length;
                    standardDeviation = Math.sqrt(_.reduce(fieldInputs, function(memo, fieldInput) { return memo + Math.pow(((parseFloat(fieldInput.value)||0) - average), 2); }, 0)/fieldInputs.length);
                } else {
                    average = 0;
                    standardDeviation = 0;
                }
                var elementFields = {};
                elementFields[userInput.fieldName] = average;
                elementFields[userInput.fieldName + 'StandardDeviation'] = standardDeviation;
                var elementRef = new Firebase(fbBase + 'details/' + userInput.projectId + '/' + userInput.elementType + 's/' + userInput.elementId + '/info');
                elementRef.update(elementFields);
            });
        }
        var groupInputsRef = new Firebase(fbBase + 'groupInputs/');
        groupInputsRef.on('child_changed', function(fieldInputsSnapshot) {
            var fieldInputsObject = fieldInputsSnapshot.val();
            _.each(_.values(fieldInputsObject), function(fieldInput) {
                _.each(_.values(fieldInput), function(userFieldInput) {
                    bewaarGemiddelde(userFieldInput);
                });
            });
        });
    }
};

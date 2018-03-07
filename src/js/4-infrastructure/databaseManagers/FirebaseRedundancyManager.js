var _ = require('underscore');
var Firebase = require('firebase');
var helpers = require('../../../../server/helpers'); 
var DomainModel = require('../../3-domain/model/DomainModel');

var fbRoot = 'https://ics-r.firebaseio.com/'; 

var arrayManager = {
    array: [],
    working: false,
    waiting: false,
    worker: function() {
        while (this.array.length > 0) {
            var item = this.array.shift();
            this.waiting = true;
            this.handleItem(item);
        }    
    },
    add: function(item) {
        this.array.push(item);
        if (!this.working) { this.worker() }
    }
};

arrayManager.handleItem = function(urlObject) {
    var urlType = urlObject.urlType;
    var friendlyUrl = urlObject.friendlyUrl;
    var objectId = urlObject.objectId;
    var counter = urlObject.counter;

    var suffix = '';
    if (counter) {
        suffix = '-' + counter.toString();
    } else {
        counter = 0;
    }
    var urlRef = new Firebase(fbRoot + 'urls/' + urlType + '/' + friendlyUrl + suffix);
    urlRef.once('value', function(urlSnapshot) { 
        var urlObject = urlSnapshot.val();
        if (urlObject) {
            if (urlObject.id === objectId) { 
                arrayManager.waiting = false;
                return; 
            }
            arrayManager.handleItem({urlType: urlType, friendlyUrl: friendlyUrl, objectId: objectId, counter: counter + 1 });
        } else {
            var publicUrlRef = new Firebase(fbRoot + urlType + '/' + objectId + '/public/url');
            publicUrlRef.set(friendlyUrl + suffix, function() { arrayManager.waiting = false; }); 
        }
    });
};

function manageRelations() {
    // loop alle entities langs
    _.each(DomainModel.Entities, function(entity) { 
        // laad de entity groep
        if (entity().isPersistent) {
            var entityRef = new Firebase(fbRoot + entity().type);
            // voor elke entity-instance
            entityRef.on('child_added', function(entityInstanceSnapshot) {
                var entityInstance = entityInstanceSnapshot.val();
                if (entityInstance) {
                    // als de entity-instance publieke attributen heeft
                    if (entityInstance.public) {
                        var publicRef = new Firebase(fbRoot + entity().type + '/' + entityInstance.id + '/public');
                        publicRef.on('value', function(publicSnapshot) {
                            var publicAttributes = publicSnapshot.val();
                            // werk alle relaties bij
                            // loop alle relaties langs
                            _.each(entity().getAssociations(), function(relation) {
                                // als de relation een association is
                                var relationName = relation().thisName(entity);
                                // als de andere kant van de relation navigeerbaar is
                                if (relation().thatIsNavigable(entity)) {
                                    var relationsRef = new Firebase(fbRoot + entity().type + '/' + entityInstance.id + '/relations/' + relationName);
                                    // als er een relatie wordt gevonden of bijkomt, werk deze dan bij
                                    relationsRef.off('child_added');
                                    relationsRef.on('child_added', function(relationSnapshot) {
                                        var relatedInstanceKey = relationSnapshot.key();
                                        var relatedInstance = relationSnapshot.val();
                                        var relatedInstanceRef = new Firebase(fbRoot + relatedInstance.type + '/' + relatedInstanceKey + '/relations/' + relation().thatName(entity) + '/' + entityInstance.id + '/');
                                        relatedInstanceRef.update({id: entityInstance.id, public: publicAttributes, type: entity().type});
                                    });
                                    // als er een relatie wordt verwijderd, verwijder dan de verwijsgegevens
                                    relationsRef.off('child_removed');
                                    relationsRef.on('child_removed', function(oldRelationsSnapshot) {
                                        var relatedInstanceKey = oldRelationsSnapshot.key();
                                        var relatedInstance = oldRelationsSnapshot.val();
                                        var relatedInstanceRef = new Firebase(fbRoot + relatedInstance.type + '/' + relatedInstanceKey + '/relations/' + relation().thatName(entity) + '/' + entityInstance.id + '/');
                                        relatedInstanceRef.remove();
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }
    });
}
function manageUrls() {
    // loop alle entities langs
    _.each(DomainModel.Entities, function(entity) { 
        // als de entity urls heeft
        if (entity().isPersistent && entity().hasUrl) {
            var itemsRef = new Firebase(fbRoot + entity().type);
            itemsRef.on('child_added', function(itemSnapshot){
                var itemObject = itemSnapshot.val();
                if (itemObject && itemObject.public) {
                    var itemPublicNameRef = new Firebase(fbRoot + entity().type + '/' + itemObject.id + '/public/name');
                    itemPublicNameRef.on('value', function(itemPublicNameSnapshot) {
                        // Werk url in public bij als naam in public verandert
                        itemObject.public.name = itemPublicNameSnapshot.val();
                        if (itemObject.public.name) {
                            var baseUrl = helpers.getFriendlyUrl(itemObject.public.name);
                            arrayManager.add({urlType: entity().type, friendlyUrl: baseUrl, objectId: itemObject.id });
                        } else {
                            // urls verwijderen
                            var itemPublicUrlRef = new Firebase(fbRoot + entity().type + '/' + itemObject.id + '/public/url');
                            itemPublicUrlRef.remove();
                            var laatsteUrlRef = new Firebase(fbRoot + 'urls/laatsteUrls/' + itemObject.id);
                            laatsteUrlRef.once('value', function(laatsteUrlSnapshot) {
                                var laatsteUrl = laatsteUrlSnapshot.val();
                                if (laatsteUrl) {
                                    laatsteUrlRef.remove();
                                    var urlRef = new Firebase(fbRoot + 'urls/' + entity().type + '/' + laatsteUrl.url);
                                    urlRef.remove();
                                }
                            });
                        }
                    });
                    // Werk url in urls bij als url in public verandert
                    var itemPublicUrlRef = new Firebase(fbRoot + entity().type + '/' + itemObject.id + '/public/url');
                    itemPublicUrlRef.on('value', function(itemPublicUrlSnapshot) {
                        var url = itemPublicUrlSnapshot.val();
                        // Verwijder laatst gebruikte url
                        var laatsteUrlRef = new Firebase(fbRoot + 'urls/laatsteUrls/' + itemObject.id);
                        laatsteUrlRef.once('value', function(laatsteUrlSnapshot) {
                            var laatsteUrlObject = laatsteUrlSnapshot.val();
                            if (laatsteUrlObject) {
                                var oudeUrlRef = new Firebase(fbRoot + 'urls/' + entity().type + '/' + laatsteUrlObject.url);
                                oudeUrlRef.remove(function() {
                                    // Bewaar nieuwe url 
                                    if (url) {
                                        var urlRef = new Firebase(fbRoot + 'urls/' + entity().type + '/' + url);
                                        urlRef.update({ id: itemObject.id});
                                    }
                                });
                            } else {
                                // Bewaar nieuwe url 
                                if (url) {
                                    var urlRef = new Firebase(fbRoot + 'urls/' + entity().type + '/' + url);
                                    urlRef.update({ id: itemObject.id});
                                }
                            }
                        });
                    });
                }
            });
            // Bewaar laatst gebruikte url voor een id
            var urlsRef = new Firebase(fbRoot + 'urls/' + entity().type);
            urlsRef.on('child_added', function(urlSnapshot) {
                var url = urlSnapshot.key();
                var urlObject = urlSnapshot.val();
                if (urlObject && urlObject.id) {
                    var laatsteUrlRef = new Firebase(fbRoot + 'urls/laatsteUrls/' + urlObject.id);
                    laatsteUrlRef.update({url: url});
                }
            });
        }
    });
}
function manageGroupInputs() {
    // Bereken gemiddelden o.b.v. groupInputs
    function saveAverage(userInput) {
        var fieldInputsRef = new Firebase(fbRoot + 'groupInput/' + userInput.groupInputId);
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
            var valueFields = {};
            valueFields.value = average;
            valueFields.standardDeviation = standardDeviation;
            var attributeRef = new Firebase(fbRoot + userInput.projectType + '/' + userInput.projectId + '/composites/toolElements/' + userInput.toolElementId + '/public/' + userInput.attributeName);
            attributeRef.update(valueFields, function(error) {
                if (!error) {
                    var inputUserIdsRef = new Firebase(fbRoot + userInput.projectType + '/' + userInput.projectId + '/composites/toolElements/' + userInput.toolElementId + '/public/inputUserIds');
                    inputUserIdsRef.once('value', function(inputUserIdsSnapshot) {
                        var inputUserIds = inputUserIdsSnapshot.val() || [];
                        if (inputUserIds.indexOf(userInput.userId) === -1) {
                            inputUserIds.push(userInput.userId);
                            inputUserIdsRef.set(inputUserIds);
                        }
                    });
                }
            });
        });
    }
    var groupInputsRef = new Firebase(fbRoot + 'groupInput/');
    groupInputsRef.on('child_changed', function(fieldInputsSnapshot) {
        var fieldInputsObject = fieldInputsSnapshot.val();
        var userInput = _.values(fieldInputsObject)[0];
        saveAverage(userInput);
    });
    groupInputsRef.on('child_added', function(fieldInputsSnapshot) {
        var fieldInputsObject = fieldInputsSnapshot.val();
        var userInput = _.values(fieldInputsObject)[0];
        var toolElementRef = new Firebase(fbRoot + userInput.projectType + '/' + userInput.projectId + '/composites/toolElements/' + userInput.toolElementId);
        toolElementRef.once('value', function(toolElementSnapshot) {
            var toolElementObject = toolElementSnapshot.val();
            if (toolElementObject) {
                saveAverage(userInput);
            } else {
                // delete userinputs from removed toolElement
                var userInputsRef = new Firebase(fbRoot + 'groupInput/' + userInput.groupInputId);
                userInputsRef.remove();
            }
        });
    });
}
function manageRedundancies() {
    // manageRelations();
    manageUrls();
    manageGroupInputs();
}

module.exports = manageRedundancies;
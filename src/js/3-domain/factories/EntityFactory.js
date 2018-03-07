// EntityFactory.js
var _ = require('underscore');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = _.extend({
        createNew: function(Entity, values) {
            var instance = Entity();
            instance.setValues(values);
            return instance;
        },
        createFromJSON: function(Entity, jsonData) {
            var self = this;
            var instance = Entity();
            instance.id = jsonData.attributes.id;
            instance.type = jsonData.attributes.entityType || Entity().type;
            _.each(_.values(instance.attributes), function(attribute) {
                if (jsonData[attribute.name]) {
                    instance.set(attribute.name, jsonData.attributes[attribute.name], {}, true);
                }
            });
            _.each(_.values(instance.associations), function(association) {
                var associationName = association.thisName;
                var cardinality = association.thatCardinality;
                var isComposite = association.thisIsComposite;
                var isNavigable = association.thatIsNavigable;
                var thatEntity = association.thatEntity;
                var associationObject = jsonData.associations[associationName];
                if (associationObject) {
                    switch (cardinality) {
                        case 'single':
                            var associationData = _.values(associationObject)[0];
                            var associationInstance = that.createFromJSON(thatEntity, associationData);
                            instance.set(associationName, associationInstance, {}, true);
                            break;
                        case 'multiple':
                            var associationInstances = [];
                            _.each(_.values(associationObject), function(associationData) {
                                associationInstances.push(that.createFromJSON(thatEntity, associationData));
                            });
                            instance.set(associationName, associationInstances, {}, true);
                            break;
                    }
                }
            });
            //instance.id = jsonData.id;
            //instance.setValues(jsonData.public);
            //instance.setValues(jsonData.protected);
            //var associations = {};
            //var composites = {};
            //_.each(Entity().associations, function(association) {
            //    var associationName = association.thisName;
            //    var cardinality = association.thatCardinality;
            //    var isComposite = association.thisIsComposite;
            //    var isNavigable = association.thatIsNavigable;
            //    var thatEntity = association.thatEntity;
            //    if (isComposite && jsonData.composites) {
            //        var compositeObject = jsonData.composites[associationName];
            //        if (compositeObject) {
            //            switch (cardinality) {
            //                case 'single':
            //                    var compositeData = _.values(compositeObject)[0];
            //                    var compositeInstance = self.createFromJSON(thatEntity, compositeData);
            //                    composites[associationName] = compositeInstance;
            //                    break;
            //                case 'multiple':
            //                    var compositeInstances = [];
            //                    _.each(_.values(compositeObject), function(compositeData) {
            //                        //var EntityType = thatEntity;
            //                        //var entityTypeString = thatEntity().type;
            //                        //if (entityTypeString === 'ToolElementEntity') {
            //                        //    EntityType = DomainModel.getEntityType(compositeData.type);
            //                        //}
            //                        var compositeInstance = self.createFromJSON(thatEntity, compositeData);
            //                        compositeInstances.push(compositeInstance);
            //                    });
            //                    composites[associationName] = compositeInstances;
            //                    break;
            //            }
            //        }
            //        instance.setComposites(composites);
            //    } else {
            //        if (isNavigable && jsonData.associations) {
            //            var associationObject = jsonData.associations[associationName];
            //            if (associationObject) {
            //                switch (cardinality) {
            //                    case 'single':
            //                        var associationData = _.values(associationObject)[0];
            //                        var associationInstance = self.createProxyFromJSON(thatEntity, associationData);
            //                        associations[associationName] = associationInstance;
            //                        break;
            //                    case 'multiple':
            //                        var associationInstances = [];
            //                        _.each(_.values(associationObject), function(associationData) {
            //                            var associationInstance = self.createProxyFromJSON(thatEntity, associationData);
            //                            associationInstances.push(associationInstance);
            //                        });
            //                        associations[associationName] = associationInstances;
            //                        break;
            //                }
            //            }
            //        }
            //    }
            //});
            //instance.setassociations(associations);
            return instance;
        },
        createProxyFromJSON: function(Entity, jsonData) {
            var instance = Entity();
            instance.id = jsonData.id;
            instance.setValues(jsonData.public);
            instance.type = jsonData.type
            return instance;
        }
    }, spec);
    return that;
};
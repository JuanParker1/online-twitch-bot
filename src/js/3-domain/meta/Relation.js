var Entity = require('./Entity');
var _ = require('underscore');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = _.extend({
        name: spec.name || '',
        type: spec.type || 'relation',
        fromEntity: spec.fromEntity || Entity,
        fromValue: spec.fromValue || '',
        toEntity: spec.toEntity || Entity,
        toValue: spec.toValue || '',
        thisEntity: spec.thisEntity || function(Entity) {
            if (Entity().matches(this.fromEntity)) {
                return this.fromEntity;
            }
            if (Entity().matches(this.toEntity)) {
                return this.toEntity;
            }
        },
        thatEntity: spec.thatEntity || function(Entity) {
            if (Entity().matches(this.fromEntity)) {
                return this.toEntity;
            }
            if (Entity().matches(this.toEntity)) {
                return this.fromEntity;
            }
        },
        thisValue: spec.thisValue || function(Entity) {
            if (Entity().matches(this.fromEntity)) {
                return this.fromValue;
            }
            if (Entity().matches(this.toEntity)) {
                return this.toValue;
            }
        },
        thatValue: spec.thatValue || function(Entity) {
            if (Entity().matches(this.fromEntity)) {
                return this.toValue;
            }
            if (Entity().matches(this.toEntity)) {
                return this.fromValue;
            }
        }
    }, spec);
    return that;
};
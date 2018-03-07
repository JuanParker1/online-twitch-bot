var Relation = require('./Relation');
var _ = require('underscore');
    
module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = Relation(_.extend({
        type: spec.type || 'generalization'
    }, spec));
    return that;
};
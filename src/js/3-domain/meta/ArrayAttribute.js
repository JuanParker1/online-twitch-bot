var SelectionAttribute = require('./SelectionAttribute');
var _ = require('underscore');

module.exports = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};
    
    that = SelectionAttribute(_.extend({
        // set: function(value) {
        //     if (Array.isArray(value)) {
        //         this.value = value.join('|');
        //     } else {
        //         this.value = value;
        //     }
        // },
        // get: function() {
        //     return this.value ? this.value.split('|') : (this.defaultValue ? this.defaultValue.split('|') : []);
        // }
    }, spec));
    
    return that;
};

var React = require('react');
var _ = require('underscore');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = _.extend({
        sequence: 0,
        name: '',
        help: '',
        label: '',
        layoutClass: '',
        onClick: function() {},
        getLayoutClass: function() {
            return ('button ' + this.layoutClass);
        },
        getComponent: function() {
            return React.createElement(button, {key: this.name, className: this.getLayoutClass(), onClick: this.onClick}, this.label);
        },
    }, spec); 
    return that;
};